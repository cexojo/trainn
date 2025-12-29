-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hidingDate" TIMESTAMP(3),
ADD COLUMN     "registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "subscriptionAmount" DOUBLE PRECISION,
ADD COLUMN     "subscriptionFrequency" TEXT;
