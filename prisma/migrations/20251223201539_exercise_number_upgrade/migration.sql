/*
  Warnings:

  - You are about to drop the column `dayNumber` on the `DayExercise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DayExercise" DROP COLUMN "dayNumber",
ADD COLUMN     "exerciseNumber" INTEGER;
