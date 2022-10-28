-- CreateEnum
CREATE TYPE "Social" AS ENUM ('GOOGLE', 'APPLE', 'TWITTER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "socialLogin" "Social",
ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;
