import { Command, Positional, Option } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { BlizzardApi } from 'blizzard-api-sample';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CreateCardCommand {
  private blizzardApi: BlizzardApi;
  private prisma: PrismaService;

  constructor() {
    this.blizzardApi = new BlizzardApi();
    this.prisma = new PrismaService();
  }

  @Command({
    command: 'blizzard:hearthstone:cards',
    describe: 'get cards data by page',
  })
  async create(
    @Positional({
      name: 'page',
      type: 'number',
    })
    page: number,
    @Positional({
      name: 'nb',
      type: 'number',
    })
    nb,
  ) {
    await this.blizzardApi.init(
      process.env.BLIZZARD_API_KEY,
      process.env.BLIZZARD_API_SECRET,
    );
    if (!nb) nb = 1;
    console.log(`Get ${nb} pages from the ${page} page`);
    while (nb--) await this.initCardsCollection(page++);
  }

  async initCardsCollection(pageNb) {
    const page = await this.blizzardApi.hearthstone.searchCards({
      page: pageNb,
    });
    const cards = page.cards;
    await cards.map(async (card) => {
      if (card.cardSetId >= 12) {
        const keywordIds = [];
        const cardSet = await this.prisma.cardSet.findUnique({
          where: { blizzard_id: card.cardSetId },
        });
        card?.keywordIds?.map(async (keywordId) => {
          const keyword = await this.prisma.keyword.findUnique({
            where: { blizzard_id: keywordId },
          });
          if (keyword) {
            keywordIds.push(keyword.blizzard_id);
          }
        });
        try {
          await this.prisma.card.upsert({
            where: { blizzard_id: card.id },
            create: {
              blizzard_id: card.id,
              slug: card.slug,
              name: card.name,
              ...(card.multiClassIds && {
                multiHsClass: {
                  create: card.multiClassIds.map((classId) => ({
                    hsClass: {
                      connect: { blizzard_id: classId },
                    },
                  })),
                },
              }),
              ...(card.classId && {
                hsClass: {
                  connect: { blizzard_id: card.classId },
                },
              }),
              ...(card.minionTypeId && {
                minionType: {
                  connect: { blizzard_id: card.minionTypeId },
                },
              }),
              ...(card.spellSchool && {
                spellSchool: {
                  connect: { blizzard_id: card.spellSchoolId },
                },
              }),
              ...(card.cardTypeId && {
                cardType: {
                  connect: { blizzard_id: card.cardTypeId },
                },
              }),
              ...(card.cardSetId &&
                cardSet && {
                  cardSet: {
                    connect: { blizzard_id: card.cardSetId },
                  },
                }),
              ...(card.rarityId && {
                rarity: {
                  connect: { blizzard_id: card.rarityId },
                },
              }),
              health: card.health,
              attack: card.attack,
              manaCost: card.manaCost,
              artistName: card.artistName,
              text: card.text,
              image: card.image,
              imageGold: card.imageGold,
              cropImage: card.cropImage,
              flavorText: card.flavorText,
              ...(keywordIds && {
                keywordCards: {
                  create: keywordIds.map((keywordId) => ({
                    keyword: {
                      connect: { blizzard_id: keywordId },
                    },
                  })),
                },
              }),
            },
            update: {
              blizzard_id: card.id,
              slug: card.slug,
              name: card.name,
              ...(card.multiClassIds && {
                multiHsClass: {
                  create: card.multiClassIds.map((classId) => ({
                    hsClass: {
                      connect: { blizzard_id: classId },
                    },
                  })),
                },
              }),
              ...(card.classId && {
                hsClass: {
                  connect: { blizzard_id: card.classId },
                },
              }),
              ...(card.minionTypeId && {
                minionType: {
                  connect: { blizzard_id: card.minionTypeId },
                },
              }),
              ...(keywordIds && {
                keywordCards: {
                  create: keywordIds.map((keywordId) => ({
                    keyword: {
                      connect: { blizzard_id: keywordId },
                    },
                  })),
                },
              }),
              ...(card.spellSchool && {
                spellSchool: {
                  connect: { blizzard_id: card.spellSchoolId },
                },
              }),
              ...(card.cardTypeId && {
                cardType: {
                  connect: { blizzard_id: card.cardTypeId },
                },
              }),
              ...(card.cardSetId &&
                cardSet && {
                  cardSet: {
                    connect: { blizzard_id: card.cardSetId },
                  },
                }),
              ...(card.rarityId && {
                rarity: {
                  connect: { blizzard_id: card.rarityId },
                },
              }),
              ...(card.spellSchoolId && {
                spellSchool: {
                  connect: { blizzard_id: card.spellSchoolId },
                },
              }),
              health: card.health,
              attack: card.attack,
              manaCost: card.manaCost,
              artistName: card.artistName,
              text: card.text,
              image: card.image,
              imageGold: card.imageGold,
              cropImage: card.cropImage,
              flavorText: card.flavorText,
            },
          });
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
}
