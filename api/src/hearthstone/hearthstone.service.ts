import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Deck, Card, Prisma } from '@prisma/client';
import { BlizzardApi } from 'blizzard-api-sample';
import { encode, decode, FormatType, DeckDefinition } from 'deckstrings';

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

  async getCards(
    page: number,
    nbPerPage: number,
    setGroupSlug?: string,
    name?: string,
    cardClassSlug?: string,
    cardType?: number,
    manaCost?: number,
  ): Promise<object> {
    console.log(setGroupSlug);
    const optionalSearch = {
      ...(cardType && { cardTypeId: cardType }),
      ...(manaCost && { manaCost: manaCost }),
    };
    const hsClass = await this.prisma.hsClass.findUnique({
      where: { slug: cardClassSlug },
    });
    const filters = {
      cardSet: {
        setGroupCards: {
          some: {
            setGroupSlug: setGroupSlug ? setGroupSlug : 'standard',
          },
        },
      },
      AND: [
        {
          OR: [{ hsClassId: 12 }, { hsClassId: hsClass?.blizzard_id }],
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
    const [cards, count] = await this.prisma.$transaction([
      this.prisma.card.findMany({
        where: {
          ...(name && {
            name: {
              contains: name,
              mode: 'insensitive',
            },
          }),
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
        skip: nbPerPage * (page - 1),
        take: nbPerPage,
        orderBy: [{ manaCost: 'asc' }, { rarityId: 'asc' }, { name: 'asc' }],
      }),
      this.prisma.card.count({
        where: {
          ...(name && {
            name: {
              contains: name,
              mode: 'insensitive',
            },
          }),
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

  async deleteDeck(params: { id: number }) {
    return this.prisma.deck.delete({ where: params });
  }

  async createDeck(
    data: any,
    user: { email: string; id: number },
  ): Promise<Deck> {
    const hsClass = await this.prisma.hsClass.findUnique({
      where: { slug: data.classSlug },
    });
    let nbCards = 0;
    const createCards = data.cards.map((card) => {
      if (card.nb > 2)
        throw new HttpException(
          'there cannot be more than 2 the same card in a deck',
          HttpStatus.BAD_REQUEST,
        );
      //if (card.classId !== 12 && card.classId !== hsClass.blizzard_id) {

      nbCards += card.nb;
      return {
        nb: card.nb,
        card: {
          connect: {
            blizzard_id: Number(card.blizzard_id),
          },
        },
      };
    });
    return this.prisma.deck.create({
      data: {
        name: data.deckName,
        class: {
          connect: { blizzard_id: hsClass.blizzard_id },
        },
        nbCards,
        cards: {
          create: createCards,
        },
        author: { connect: { id: user.id } },
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

  async saveDecks(params: Prisma.DeckCreateManyInput) {
    await this.prisma.deck.create({
      data: {
        name: 'testAAA',
        cards: {
          create: {
            card: { connect: { id: 1 } },
          },
        },
      },
    });
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
          author: {
            select: {
              username: true,
            },
          },
          class: true,
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
}
