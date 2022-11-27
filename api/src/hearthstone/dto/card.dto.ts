export interface CardDto {
  blizzard_id: number;
  name: string;
  slug: string;
  text: string;
  nb?: number;
  classId?: number;
  setGroup?: string;
}

export interface HeroClassDto {
  id: number;
  slug: string;
  name: string;
  blizzard_id: number;
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
