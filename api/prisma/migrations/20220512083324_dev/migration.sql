/*
  Warnings:

  - You are about to drop the column `vericationCode` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "vericationCode",
ADD COLUMN     "verificationCode" TEXT NOT NULL DEFAULT E'';
