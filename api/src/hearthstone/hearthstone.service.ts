import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Deck, Card, Prisma } from "@prisma/client";
import { BlizzardApi } from "blizzard-api-sample";
import * as fs from 'fs';

@Injectable()
export class HearthstoneService {
  private blizzardApi: BlizzardApi;

  constructor(private prisma: PrismaService) {
    this.blizzardApi = new BlizzardApi();
    this.blizzardApi.init(process.env.BLIZZARD_API_KEY, process.env.BLIZZARD_API_SECRET);
  }

  async getAllCards(): Promise<Card[]> {
    return this.prisma.card.findMany();
  }

  async removeCardFromDeck() {

  }

  async addCardToDeck(params: { deckId, cardId }) {
    return this.prisma.deck.update({
      where: { id: params.deckId },
      data: {
        cards: {
          create: {
            card: { connect: { blizzard_id: params.cardId } }
          }
        }
      }
    });
  }

  async deleteDeck(params: { id: number }) {
    return this.prisma.deck.delete({ where: params });
  }

  async createDeck(data: any, user: { email: string, id: number}): Promise<Deck> {
    console.log(typeof data.blizzard_id)
    return this.prisma.deck.create({
      data: {
        name: '',
        class: {
          connect: { blizzard_id: data.blizzard_id }
        },
        author: { connect: { id: user.id } }
      }
    });
  }

  async getAllDecks(): Promise<Deck[]> {
    const metadata = await this.blizzardApi.hearthstone.getMetadata();
    console.log(metadata);
    return this.prisma.deck.findMany({ include: { cards: { include: { card: true } } } });
  }

  async saveCards(params: Prisma.CardCreateManyInput) {
    await this.prisma.card.createMany({ data: params });
  }

  async saveDecks(params: Prisma.DeckCreateManyInput) {

    await this.prisma.deck.create({
      data: {
        name: "testAAA",
        cards: {
          create: {
            card: { connect: { id: 1 } }
          }
        }
      }
    });
  }

  async getDeck(id: number) {
    return this.prisma.deck.findUnique({ where: { id: id }, include: { cards: { include: { card: true } } } });
  }

  async getClasses() {
    return this.prisma.hsClass.findMany();
  }

  async getDeckPagination(page: number, nbItem: number) {
    return this.prisma.deck.findMany({
      skip: (page === 1) ? 0 : page * nbItem,
      take: nbItem
    })
  }
}
