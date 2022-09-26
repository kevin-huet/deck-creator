export type hsClassType = {
    id: number,
    blizzard_id: number,
    slug: string,
    name: string
}

export type HearthstoneCard = {
    id: number,
    blizzard_id: number,
    slug: string,
    name: string,
    attack?: number,
    manaCost?: number,
    artistName?: string,
    cardTypeId?: number,
    rarityId?: number,
    spellSchoolId?: number,
    text?: string,
    health?: number,
    image?: string,
    cropImage?: string,
    multiHsClass?: Array<any>,
    imageGold?: string,
    hsClassId?: number,
    flavorText?: string,
    nb?: number
}

export type Rarity = {
    id: number,
    blizzard_id: number,
    slug: string,
    name: string,
    dustValue: Array<number>,
    craftingCost: Array<number>
}

export type CardType = {
    id: number,
    blizzard_id: number,
    slug: string,
    name: string,
}

export type Deck = {
    id: number,
    name: string,
    author: User,
    cards: HearthstoneCard[]
}

export type User = {
    id: number,
    name: string,
}