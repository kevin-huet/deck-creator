/*
  Warnings:

  - You are about to drop the column `lastLogin` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "lastLogin",
ADD COLUMN     "lastLoginAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
