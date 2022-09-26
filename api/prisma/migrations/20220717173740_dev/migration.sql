-- AlterTable
ALTER TABLE "User" ADD COLUMN     "IPsLogged" TEXT[],
ALTER COLUMN "lastLoginAt" DROP DEFAULT;
