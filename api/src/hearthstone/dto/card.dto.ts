export interface CardDto {
  blizzard_id: number;
  name: string;
  slug: string;
  text: string;
  nb?: number;
  classId?: number;
}

export interface SearchCardDto {
  page: number;
  nbPerPage: number;
  setGroup?: string;
  name?: string;
  cardClass?: string;
  cardType?: string;
  manaCost?: number;
  minionType?: string;
  rarity?: string;
}
