import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  Deck,
  Card,
  Prisma,
  Keyword,
  Rarity,
  CardType,
  MinionType,
} from '@prisma/client';
import { BlizzardApi } from 'blizzard-api-sample';
import { encode, decode, FormatType, DeckDefinition } from 'deckstrings';
import { CardDto, HeroClassDto, SearchCardDto } from './dto/card.dto';
import { UserDTO } from '../auth/auth.dto';
import * as yaml from 'js-yaml';

type PropertiesType = {
  keyword: Keyword[];
  minionType: MinionType[];
  rarity: Rarity[];
  cardType: CardType[];
};

@Injectable()
export class HearthstoneService {
  private blizzardApi: BlizzardApi;

  constructor(private prisma: PrismaService) {
    this.blizzardApi = new BlizzardApi();
    //this.blizzardApi.init(process.env.BLIZZARD_API_KEY, process.env.BLIZZARD_API_SECRET);
  }

  async getAllCards(): Promise<Card[]> {
    return this.prisma.card.findMany();
  }

  private static optionalSearch(search: any) {
    return {
      ...(search.manaCost >= 0 && { manaCost: Number(search.manaCost) }),
      ...(search.minionType && {
        minionType: {
          slug: search.minionType,
        },
      }),
      ...(search.cardType && {
        cardType: {
          slug: search.cardType,
        },
      }),
      ...(search.rarity && {
        rarity: {
          slug: search.rarity,
        },
      }),
    };
  }
  async getCards(search: SearchCardDto): Promise<object> {
    const optionalSearch = HearthstoneService.optionalSearch(search);
    const hsClass = search.cardClass
      ? await this.prisma.hsClass.findUnique({
          where: { slug: search.cardClass },
        })
      : undefined;
    const filters = HearthstoneService.getFilters(search, hsClass);
    const [cards, count] = await this.prisma.$transaction([
      this.prisma.card.findMany(
        HearthstoneService.searchCardCondition(search, optionalSearch, filters),
      ),
      this.prisma.card.count({
        where: {
          ...(search.name && {
            name: {
              contains: search.name,
              mode: 'insensitive',
            },
          }),
          ...optionalSearch,
          ...filters,
        },
      }),
    ]);
    return { cards, count, hsClass };
  }

  async removeCardFromDeck() {
    return;
  }

  async addCardToDeck(deckId, cards: Card[]) {
    await this.prisma.$transaction([
      this.prisma.deck.update({
        where: { id: deckId },
        data: {
          cards: {
            deleteMany: {
              deckId: deckId,
            },
          },
        },
      }),
      this.prisma.deck.update({
        where: { id: deckId },
        data: {
          cards: {
            create: cards.map((card) => ({
              card: {
                connect: {
                  blizzard_id: card.blizzard_id,
                },
              },
            })),
          },
        },
      }),
    ]);
  }

  async deleteDeck(deckId: number, user): Promise<Deck | void> {
    if (
      await this.prisma.deck.findFirst({
        where: { id: deckId, authorId: user.id },
      })
    ) {
      return this.prisma.deck.delete({ where: { id: deckId } });
    }
  }

  async createDeck(
    data: {
      cards: any;
      hsClass: string;
      modeSlug: string;
      deck: { name: string; description: string };
    },
    user: UserDTO,
  ): Promise<Deck> {
    if (data.modeSlug !== 'standard' && data.modeSlug !== 'wild') {
      throw new HttpException('Invalid Game Mode', HttpStatus.BAD_REQUEST);
    }
    const hsClass = await this.prisma.hsClass.findUnique({
      where: { slug: data.hsClass },
    });
    console.log(hsClass);
    const transactionResult = await this.prisma.$transaction(
      data.cards.map((card: CardDto) => {
        if (card.nb > 2) {
          throw new HttpException(
            'there cannot be more than 2 the same card in a deck',
            HttpStatus.BAD_REQUEST,
          );
        }
        return this.prisma.card.findFirst({
          where: {
            blizzard_id: card.blizzard_id,
            slug: card.slug,
            cardSet: {
              setGroupCards: {
                some: {
                  setGroupSlug: card.setGroup ? card.setGroup : 'standard',
                },
              },
            },
            AND: [
              {
                OR: [{ hsClassId: hsClass?.blizzard_id }, { hsClassId: 12 }],
              },
            ],
          },
        });
      }),
    );
    let nbCards = 0;
    const createCards = transactionResult.map((card, index) => {
      if (card.hsClassId !== 12 && card.hsClassId !== hsClass.blizzard_id) {
        console.log(card.classId + ' ' + hsClass.heroCardId);
        throw new HttpException('Invalid card Class', HttpStatus.BAD_REQUEST);
      }
      nbCards += data.cards[index].nb ? data.cards[index].nb : 1;
      console.log(nbCards);
      return {
        nb: data.cards[index].nb,
        card: {
          connect: {
            blizzard_id: Number(card.blizzard_id),
          },
        },
      };
    });
    return this.prisma.deck.create({
      data: {
        name: data.deck.name,
        class: {
          connect: { blizzard_id: hsClass.blizzard_id },
        },
        nbCards,
        cards: {
          create: createCards,
        },
        authorId: user.id,
      },
    });
  }

  async getAllDecks(): Promise<Deck[]> {
    const metadata = await this.blizzardApi.hearthstone.getMetadata();
    console.log(metadata);
    return this.prisma.deck.findMany({
      include: { cards: { include: { card: true } } },
    });
  }

  async saveCards(params: Prisma.CardCreateManyInput) {
    await this.prisma.card.createMany({ data: params });
  }

  async getDeck(id: number) {
    const deck = await this.prisma.deck.findUnique({
      where: { id: id },
      include: {
        cards: {
          include: { card: { include: { rarity: true, cardType: true } } },
        },
        class: true,
      },
    });
    return {
      deck: {
        name: deck.name,
        authorId: deck.authorId,
        classId: deck.classId,
        hsClass: deck.class,
        cards: deck.cards.map((card) => card.card),
      },
    };
  }

  async encodeDeck(classSlug: string, cards: any) {
    const hsClass = await this.prisma.hsClass.findUnique({
      where: { slug: classSlug },
    });
    const deck: DeckDefinition = {
      cards: cards.map((item) => [item.blizzard_id, item.nb ? item.nb : 1]),
      heroes: [hsClass.heroCardId],
      format: 1,
    };
    return { code: encode(deck) };
  }

  async getClasses() {
    return this.prisma.hsClass.findMany({
      orderBy: {
        blizzard_id: 'asc',
      },
    });
  }

  async getDeckPagination(page: number, nbItem: number) {
    const [decks, count] = await this.prisma.$transaction([
      this.prisma.deck.findMany({
        skip: page === 1 ? 0 : page * nbItem,
        take: nbItem,
        select: {
          id: true,
          name: true,
          class: true,
          description: true,
          cards: {
            select: {
              card: {
                select: {
                  rarity: { select: { craftingCost: true } },
                  manaCost: true,
                  attack: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.deck.count(),
    ]);
    const deckWithCost = decks.map((deck) => {
      const cost = deck.cards.map((card) => {
        return card.card.rarity.craftingCost[0];
      });
      return { deck, cost: cost?.[0] | 0 };
    });
    return { decks: deckWithCost, count };
  }

  public async getProperties(): Promise<PropertiesType> {
    const [keyword, rarity, cardType, minionType] =
      await this.prisma.$transaction([
        this.prisma.keyword.findMany(),
        this.prisma.rarity.findMany(),
        this.prisma.cardType.findMany(),
        this.prisma.minionType.findMany(),
      ]);
    return {
      keyword,
      rarity,
      cardType,
      minionType,
    };
  }

  private static searchCardCondition(
    search: SearchCardDto,
    optionalSearch,
    filters,
  ): any {
    return {
      distinct: ['name'],
      where: {
        ...(search.name?.length > 0 && {
          name: {
            contains: search.name,
            mode: 'insensitive',
          },
        }),
        ...optionalSearch,
        ...filters,
      },
      include: {
        multiHsClass: {
          select: {
            hsClass: {
              select: {
                blizzard_id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
        rarity: true,
        cardType: true,
        hsClass: true,
        cardSet: true,
      },
      skip: search.nbPerPage * (search.page - 1),
      take: search.nbPerPage,
      orderBy: [{ manaCost: 'asc' }, { rarityId: 'asc' }, { name: 'asc' }],
    };
  }

  private static getFilters(search: SearchCardDto, hsClass: any) {
    return {
      cardSet: {
        setGroupCards: {
          some: {
            setGroupSlug: search.setGroup ? search.setGroup : 'standard',
          },
        },
      },
      AND: [
        {
          OR: [{ hsClassId: hsClass?.blizzard_id }, { hsClassId: 12 }],
        },
        {
          OR: [
            {
              multiHsClass: {
                none: {},
              },
            },
            {
              multiHsClass: {
                some: {
                  hsClassId: hsClass?.blizzard_id,
                },
              },
            },
          ],
        },
      ],
      NOT: [
        {
          cardSet: null,
        },
      ],
    };
  }
}
