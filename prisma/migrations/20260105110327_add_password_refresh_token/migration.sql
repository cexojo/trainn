/*
  Warnings:

  - A unique constraint covering the columns `[passwordRefreshToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passwordRefreshToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_passwordRefreshToken_key" ON "User"("passwordRefreshToken");
