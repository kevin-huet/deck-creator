import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { HearthstoneService } from './hearthstone.service';
import { Deck as DeckModel, Card as CardModel } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('hearthstone')
export class HearthstoneController {
  constructor(private hsService: HearthstoneService) {}

  @Get('cards')
  async showCards(@Query() query): Promise<object> {
    console.log(query);
    const { page, name, cardClass, cardType } = query;
    return this.hsService.getCards(
      page,
      36,
      name,
      cardClass,
      cardType ? Number(cardType) : null,
    );
  }

  @Get('decks')
  async showDecksPage(@Query('page') page) {
    const result = await this.hsService.getDeckPagination(
      page ? Number(page) : 1,
      16,
    );
    console.log(result);
    return result;
  }

  @Post('encode')
  async generateDeckCode(@Body('classSlug') classSlug, @Body('cards') cards) {
    console.log(classSlug);
    if (!classSlug) {
      throw new HttpException(
        'classId must be defined',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.hsService.encodeDeck(classSlug, cards);
  }

  @Get('deck/:id')
  async showDeck(@Param('id') id): Promise<object> {
    return await this.hsService.getDeck(parseInt(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post('deck')
  async createDeck(@Req() req): Promise<DeckModel> {
    return this.hsService.createDeck(req.body, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put('deck/cards')
  async addCardIntoDeck(@Req() req, @Body() body): Promise<void> {
    console.log(req.user);
    return await this.hsService.addCardToDeck(Number(body.deckId), body.cards);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('deck/cards/:id')
  async removeCardIntoDeck(): Promise<CardModel> {
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('deck/:id')
  async deleteDeck(): Promise<DeckModel> {
    return;
  }

  @Get('metadata')
  async saveMetadata(): Promise<void> {}

  @Get('classes')
  async getAllHsClasses() {
    return { classes: await this.hsService.getClasses() };
  }
}
