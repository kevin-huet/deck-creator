/*
  Warnings:

  - You are about to drop the column `artist_name` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `mana_cost` on the `Card` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "artist_name",
DROP COLUMN "mana_cost",
ADD COLUMN     "artistName" TEXT,
ADD COLUMN     "manaCost" INTEGER;
