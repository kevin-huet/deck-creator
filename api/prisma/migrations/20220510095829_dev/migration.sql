-- AlterTable
ALTER TABLE "User" ADD COLUMN     "terms" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "vericationCode" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;
