import {Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards} from "@nestjs/common";
import { HearthstoneService } from "./hearthstone.service";
import { Deck as DeckModel, Card as CardModel } from "@prisma/client";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("hearthstone")
export class HearthstoneController {
  constructor(private hsService: HearthstoneService) {}

  @Get('cards')
  async showCards(): Promise<CardModel[]> {
    return this.hsService.getAllCards();
  }


  @Get('decks')
  async showDecksPage(@Query('page') page, @Query('nbItem') nbItem): Promise<DeckModel[]> {
    return this.hsService.getDeckPagination(parseInt(page), 16);
  }

  @Get('deck/:id')
  showDeck(@Param('id') id): Promise<DeckModel> {
    return this.hsService.getDeck(parseInt(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post('deck/create')
  createDeck(@Req() req): Promise<DeckModel> {
    return this.hsService.createDeck(req.body, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put('deck/cards')
  addCardIntoDeck(@Body() params: { deckId: number, cardId: number }): Promise<DeckModel> {
    return this.hsService.addCardToDeck(params);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('deck/cards/:id')
  removeCardIntoDeck(): Promise<CardModel> {
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('deck/:id')
  deleteDeck(): Promise<DeckModel> {
    return;
  }

  @Get('metadata')
  async  saveMetadata(): Promise<void> {
    return;
  }

  @Get('classes')
  async getAllHsClasses() {
    return { classes: await this.hsService.getClasses() }
  }
}
