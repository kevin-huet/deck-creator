/*
  Warnings:

  - You are about to drop the `SpellSchools` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Deck" DROP CONSTRAINT "Deck_classId_fkey";

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "spellSchoolId" INTEGER;

-- DropTable
DROP TABLE "SpellSchools";

-- CreateTable
CREATE TABLE "SpellSchool" (
    "id" SERIAL NOT NULL,
    "blizzard_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "SpellSchool_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SpellSchool_blizzard_id_key" ON "SpellSchool"("blizzard_id");

-- AddForeignKey
ALTER TABLE "Deck" ADD CONSTRAINT "Deck_classId_fkey" FOREIGN KEY ("classId") REFERENCES "HsClass"("blizzard_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_spellSchoolId_fkey" FOREIGN KEY ("spellSchoolId") REFERENCES "SpellSchool"("blizzard_id") ON DELETE SET NULL ON UPDATE CASCADE;
