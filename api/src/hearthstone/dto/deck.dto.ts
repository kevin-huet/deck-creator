import { CardDto } from './card.dto';

export interface DeckDto {
  name: string;
  classId: number;
  cards: CardDto;
}
