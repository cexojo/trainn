/*
  Warnings:

  - You are about to drop the column `notes` on the `DayExercise` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DayExercise" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "trainingDayId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "athleteNotes" TEXT,
    "trainerNotes" TEXT,
    "day" TEXT NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    CONSTRAINT "DayExercise_trainingDayId_fkey" FOREIGN KEY ("trainingDayId") REFERENCES "TrainingDay" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DayExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DayExercise" ("day", "dayNumber", "exerciseId", "id", "trainingDayId") SELECT "day", "dayNumber", "exerciseId", "id", "trainingDayId" FROM "DayExercise";
DROP TABLE "DayExercise";
ALTER TABLE "new_DayExercise" RENAME TO "DayExercise";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
