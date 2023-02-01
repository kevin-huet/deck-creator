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
import { Card as CardModel, Deck as DeckModel } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { hearthstoneConfig } from '../app.config';

@Controller('hearthstone')
export class HearthstoneController {
  constructor(private hsService: HearthstoneService) {}

  @Get('cards')
  async getCards(@Query() query): Promise<object> {
    return this.hsService.getCards({ ...query, nbPerPage: 36 });
  }

  @Get('decks')
  async getDecksPage(@Query() query) {
    return await this.hsService.getDeckPagination(
      query.page ? Number(query.page) : 1,
      query.nbPerPage
        ? Number(query.nbPerPage)
        : hearthstoneConfig().search_decks_default_nb,
    );
  }

  @Post('encode')
  async generateDeckCode(@Body('classSlug') classSlug, @Body('cards') cards) {
    if (!classSlug) {
      throw new HttpException(
        'classId must be defined',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.hsService.encodeDeck(classSlug, cards);
  }

  @Get('deck/:id')
  async getDeck(@Param('id') id): Promise<object> {
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
    return await this.hsService.addCardToDeck(Number(body.deckId), body.cards);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('deck/cards/:id')
  async removeCardIntoDeck(): Promise<CardModel> {
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('deck/:id')
  async deleteDeck(@Req() req, @Query('id') id): Promise<void> {
    await this.hsService.deleteDeck(id, req.user);
  }

  @Get('metadata')
  async saveMetadata(): Promise<any> {
    return { metadata: await this.hsService.getProperties() };
  }

  @Get('classes')
  async getAllHsClasses() {
    return { classes: await this.hsService.getClasses() };
  }

  @Get('config')
  async getConfig() {
    return hearthstoneConfig();
  }
}
