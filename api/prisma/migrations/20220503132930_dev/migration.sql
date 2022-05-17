-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deck" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "authorId" INTEGER,
    "classId" INTEGER,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardOnDeck" (
    "id" SERIAL NOT NULL,
    "deckId" INTEGER NOT NULL,
    "cardId" INTEGER NOT NULL,

    CONSTRAINT "CardOnDeck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "blizzard_id" INTEGER,
    "artist_name" TEXT,
    "health" INTEGER,
    "attack" INTEGER,
    "mana_cost" INTEGER,
    "name" TEXT,
    "text" TEXT,
    "image" TEXT,
    "slug" TEXT,
    "imageGold" TEXT,
    "flavorText" TEXT,
    "cropImage" TEXT,
    "cardSetId" INTEGER,
    "rarityId" INTEGER,
    "hsClassId" INTEGER,
    "cardTypeId" INTEGER,
    "minionTypeId" INTEGER,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KeywordCard" (
    "id" SERIAL NOT NULL,
    "keywordId" INTEGER NOT NULL,
    "cardId" INTEGER NOT NULL,

    CONSTRAINT "KeywordCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keyword" (
    "id" SERIAL NOT NULL,
    "blizzard_id" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "refText" TEXT NOT NULL,

    CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardType" (
    "id" SERIAL NOT NULL,
    "blizzard_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "CardType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameMode" (
    "id" SERIAL NOT NULL,
    "blizzard_id" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GameMode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rarity" (
    "id" SERIAL NOT NULL,
    "blizzard_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "craftingCost" INTEGER[],
    "dustValue" INTEGER[],

    CONSTRAINT "Rarity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardSet" (
    "id" SERIAL NOT NULL,
    "blizzard_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "collectibleCount" INTEGER NOT NULL,
    "collectibleRevealedCount" INTEGER NOT NULL,
    "nonCollectibleCount" INTEGER NOT NULL,
    "nonCollectibleRevealedCount" INTEGER NOT NULL,

    CONSTRAINT "CardSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MinionType" (
    "id" SERIAL NOT NULL,
    "blizzard_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "MinionType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameModeCardType" (
    "id" SERIAL NOT NULL,
    "gameModeId" INTEGER NOT NULL,
    "cardTypeId" INTEGER NOT NULL,

    CONSTRAINT "GameModeCardType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameModeMinionType" (
    "id" SERIAL NOT NULL,
    "gameModeId" INTEGER NOT NULL,
    "minionTypeId" INTEGER NOT NULL,

    CONSTRAINT "GameModeMinionType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpellSchools" (
    "id" SERIAL NOT NULL,
    "blizzard_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "SpellSchools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HsClass" (
    "id" SERIAL NOT NULL,
    "blizzard_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "powerCardId" INTEGER,
    "heroCardId" INTEGER,
    "alternateHeroCardIds" INTEGER[],

    CONSTRAINT "HsClass_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Card_blizzard_id_key" ON "Card"("blizzard_id");

-- CreateIndex
CREATE UNIQUE INDEX "Keyword_blizzard_id_key" ON "Keyword"("blizzard_id");

-- CreateIndex
CREATE UNIQUE INDEX "CardType_blizzard_id_key" ON "CardType"("blizzard_id");

-- CreateIndex
CREATE UNIQUE INDEX "GameMode_blizzard_id_key" ON "GameMode"("blizzard_id");

-- CreateIndex
CREATE UNIQUE INDEX "Rarity_blizzard_id_key" ON "Rarity"("blizzard_id");

-- CreateIndex
CREATE UNIQUE INDEX "CardSet_blizzard_id_key" ON "CardSet"("blizzard_id");

-- CreateIndex
CREATE UNIQUE INDEX "MinionType_blizzard_id_key" ON "MinionType"("blizzard_id");

-- CreateIndex
CREATE UNIQUE INDEX "SpellSchools_blizzard_id_key" ON "SpellSchools"("blizzard_id");

-- CreateIndex
CREATE UNIQUE INDEX "HsClass_blizzard_id_key" ON "HsClass"("blizzard_id");

-- AddForeignKey
ALTER TABLE "Deck" ADD CONSTRAINT "Deck_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deck" ADD CONSTRAINT "Deck_classId_fkey" FOREIGN KEY ("classId") REFERENCES "HsClass"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardOnDeck" ADD CONSTRAINT "CardOnDeck_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardOnDeck" ADD CONSTRAINT "CardOnDeck_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("blizzard_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_cardTypeId_fkey" FOREIGN KEY ("cardTypeId") REFERENCES "CardType"("blizzard_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_rarityId_fkey" FOREIGN KEY ("rarityId") REFERENCES "Rarity"("blizzard_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_cardSetId_fkey" FOREIGN KEY ("cardSetId") REFERENCES "CardSet"("blizzard_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_minionTypeId_fkey" FOREIGN KEY ("minionTypeId") REFERENCES "MinionType"("blizzard_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_hsClassId_fkey" FOREIGN KEY ("hsClassId") REFERENCES "HsClass"("blizzard_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeywordCard" ADD CONSTRAINT "KeywordCard_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("blizzard_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeywordCard" ADD CONSTRAINT "KeywordCard_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "Keyword"("blizzard_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameModeCardType" ADD CONSTRAINT "GameModeCardType_cardTypeId_fkey" FOREIGN KEY ("cardTypeId") REFERENCES "CardType"("blizzard_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameModeCardType" ADD CONSTRAINT "GameModeCardType_gameModeId_fkey" FOREIGN KEY ("gameModeId") REFERENCES "GameMode"("blizzard_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameModeMinionType" ADD CONSTRAINT "GameModeMinionType_gameModeId_fkey" FOREIGN KEY ("gameModeId") REFERENCES "GameMode"("blizzard_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameModeMinionType" ADD CONSTRAINT "GameModeMinionType_minionTypeId_fkey" FOREIGN KEY ("minionTypeId") REFERENCES "MinionType"("blizzard_id") ON DELETE RESTRICT ON UPDATE CASCADE;
