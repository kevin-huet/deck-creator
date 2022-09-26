import { Command, Positional, Option } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { BlizzardApi } from 'blizzard-api-sample';
import { PrismaService } from '../prisma.service';

@Injectable()
export class HearthstoneDataCommand {
  private blizzardApi: BlizzardApi;
  private prisma: PrismaService;
  constructor() {
    this.blizzardApi = new BlizzardApi();
    this.prisma = new PrismaService();
  }

  @Command({
    command: 'blizzard:hearthstone:metadata',
    describe: 'get and add/update all hearthstone data',
  })
  async create() {
    await this.blizzardApi.init(
      process.env.BLIZZARD_API_KEY,
      process.env.BLIZZARD_API_SECRET,
    );
    await this.getAndSaveAllMetadata();
    console.log('test');
  }

  async getAndSaveAllMetadata() {
    const metadata = await this.blizzardApi.hearthstone?.getMetadata();
    Object.getOwnPropertyNames(metadata).map((str) => {
      console.log(str);
      console.table(metadata[str]);
    });
    await metadata['gameModes'].map(async (item) => {
      await this.prisma.gameMode.upsert({
        where: { blizzard_id: item.id },
        create: {
          blizzard_id: item.id,
          name: item.name,
          slug: item.slug,
        },
        update: {},
      });
    });

    await metadata['spellSchools'].map(async (item) => {
      await this.prisma.spellSchool.upsert({
        where: { blizzard_id: item.id },
        create: {
          blizzard_id: item.id,
          name: item.name,
          slug: item.slug,
        },
        update: {},
      });
    });

    await metadata['sets'].map(async (item) => {
      await this.prisma.cardSet.upsert({
        where: { blizzard_id: item.id },
        create: {
          blizzard_id: item.id,
          slug: item.slug,
          name: item.name,
          type: item.type,
          collectibleCount: item.collectibleCount,
          collectibleRevealedCount: item.collectibleRevealedCount,
          nonCollectibleCount: item.nonCollectibleCount,
          nonCollectibleRevealedCount: item.nonCollectibleRevealedCount,
        },
        update: {
          slug: item.slug,
          name: item.name,
        },
      });
    });

    await metadata['setGroups'].map(async (item) => {
      const cardSets = item.cardSets?.map((setSlug) => ({
        cardSet: {
          connect: {
            slug: setSlug,
          },
        },
      }));
      await this.prisma.setGroup.upsert({
        where: { slug: item.slug },
        create: {
          slug: item.slug,
          year: item.year,
          svg: item.svg,
          name: item.name,
          standard: item.standard,
          icon: item.icon,
          setGroupCards: {
            create: cardSets,
          },
        },
        update: {
          slug: item.slug,
          year: item.year,
          svg: item.svg,
          name: item.name,
          standard: item.standard,
          icon: item.icon,
          setGroupCards: {
            create: cardSets,
          },
        },
      });
    });

    await metadata['keywords'].map(async (item) => {
      await this.prisma.keyword.upsert({
        where: { blizzard_id: item.id },
        create: {
          blizzard_id: item.id,
          name: item.name,
          slug: item.slug,
          text: item.text,
          refText: item.refText,
        },
        update: {
          name: item.name,
          slug: item.slug,
          text: item.text,
          refText: item.refText,
        },
      });
    });

    await metadata['classes'].map(async (item) => {
      return this.prisma.hsClass.upsert({
        where: { blizzard_id: item.id },
        create: {
          blizzard_id: item.id,
          name: item.name,
          slug: item.slug,
          heroCardId: item.cardId,
          powerCardId: item.heroPowerCardId,
        },
        update: {
          name: item.name,
          slug: item.slug,
          heroCardId: item.cardId,
          powerCardId: item.heroPowerCardId,
        },
      });
    });

    await metadata['rarities'].map(async (item) => {
      const dustValue = [
        item.dustValue[0] ? item.dustValue[0] : 0,
        item.dustValue[1] ? item.dustValue[1] : 0,
      ];
      const craftingCost = [
        item.craftingCost[0] ? item.craftingCost[0] : 0,
        item.craftingCost[1] ? item.craftingCost[1] : 0,
      ];
      await this.prisma.rarity.upsert({
        where: { blizzard_id: item.id },
        create: {
          blizzard_id: item.id,
          slug: item.slug,
          name: item.name,
          craftingCost: craftingCost,
          dustValue: dustValue,
        },
        update: {
          slug: item.slug,
          name: item.name,
          craftingCost: craftingCost,
          dustValue: dustValue,
        },
      });
    });

    await metadata['types'].map(async (item) => {
      const test = item.gameModes?.map((gameModeId) => ({
        gamemode: {
          connect: {
            blizzard_id: gameModeId,
          },
        },
      }));
      await this.prisma.cardType.upsert({
        where: { blizzard_id: item.id },
        create: {
          blizzard_id: item.id,
          name: item.name,
          slug: item.slug,
          gameModes: {
            create: test,
          },
        },
        update: {
          name: item.name,
          slug: item.slug,
        },
      });
    });

    await metadata['minionTypes'].map(async (item) => {
      const createGameModeRelation = item.gameModes?.map((gameModeId) => ({
        gamemode: {
          connect: {
            blizzard_id: gameModeId,
          },
        },
      }));
      await this.prisma.minionType.upsert({
        where: { blizzard_id: item.id },
        create: {
          blizzard_id: item.id,
          name: item.name,
          slug: item.slug,
          gameModes: {
            create: createGameModeRelation,
          },
        },
        update: {
          name: item.name,
          slug: item.slug,
        },
      });
    });
    //await this.initCardsCollection();
  }

  async initCardsCollection() {
    const firstPage = await this.blizzardApi.hearthstone.searchCards({
      page: 1,
    });
    let cards = firstPage.cards;
    for (let i = 2; i != firstPage.pageCount + 1; i++) {
      const cardsTmp = await this.blizzardApi.hearthstone.searchCards({
        page: i,
      });
      cards = cards.concat(cardsTmp.cards);
      console.log(cardsTmp.page + ' / ' + firstPage.pageCount);
    }
    await cards.map(async (card) => {
      if (card.cardSetId >= 12) {
        const cardSet = await this.prisma.cardSet.findUnique({
          where: { blizzard_id: card.cardSetId },
        });
        card?.keywordIds?.map((keywordId) => {
          console.log(keywordId);
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
              ...(card.keywordIds && {
                keywordCards: {
                  create: card.keywordIds.map((keywordId) => ({
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
              health: card.health,
              attack: card.attack,
              manaCost: card.manaCost,
              artistName: card.artistName,
              text: card.text,
              image: card.image,
              imageGold: card.imageGold,
              cropImage: card.cropImage,
              flavorText: card.flavorText,
              keywordCards: {},
            },
            update: {
              blizzard_id: card.id,
              slug: card.slug,
              name: card.name,
              ...(card.multiClassIds && {
                multiHsClass: {
                  connectOrCreate: card.multiClassIds.map((classId) => ({
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
              ...(card.keywordIds && {
                keywordCards: {
                  create: card.keywordIds.map((keywordId) => ({
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
              health: card.health,
              attack: card.attack,
              manaCost: card.manaCost,
              artistName: card.artistName,
              text: card.text,
              image: card.image,
              imageGold: card.imageGold,
              cropImage: card.cropImage,
              flavorText: card.flavorText,
              keywordCards: {},
            },
          });
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
}
