/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `authorId` on table `Deck` required. This step will fail if there are existing NULL values in that column.
  - Made the column `classId` on table `Deck` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Deck" DROP CONSTRAINT "Deck_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Deck" DROP CONSTRAINT "Deck_classId_fkey";

-- AlterTable
ALTER TABLE "Deck" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "authorId" SET NOT NULL,
ALTER COLUMN "classId" SET NOT NULL;

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "Roles";

-- DropEnum
DROP TYPE "Social";

-- AddForeignKey
ALTER TABLE "Deck" ADD CONSTRAINT "Deck_classId_fkey" FOREIGN KEY ("classId") REFERENCES "HsClass"("blizzard_id") ON DELETE RESTRICT ON UPDATE CASCADE;
