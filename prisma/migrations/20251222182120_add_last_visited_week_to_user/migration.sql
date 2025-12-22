/*
  Warnings:

  - You are about to drop the column `userId` on the `DayExerciseSeries` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_name_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN "isocode" TEXT;
ALTER TABLE "User" ADD COLUMN "lastVisitedWeek" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DayExerciseSeries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayExerciseId" TEXT NOT NULL,
    "seriesNumber" INTEGER NOT NULL,
    "minReps" INTEGER NOT NULL,
    "maxReps" INTEGER NOT NULL,
    "minRir" INTEGER NOT NULL,
    "maxRir" INTEGER NOT NULL,
    "effectiveReps" INTEGER,
    "effectiveWeight" REAL,
    "effectiveRir" INTEGER,
    "trainingWeekId" TEXT NOT NULL,
    "isDropset" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "DayExerciseSeries_dayExerciseId_fkey" FOREIGN KEY ("dayExerciseId") REFERENCES "DayExercise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DayExerciseSeries_trainingWeekId_fkey" FOREIGN KEY ("trainingWeekId") REFERENCES "TrainingWeek" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DayExerciseSeries" ("dayExerciseId", "effectiveReps", "effectiveRir", "effectiveWeight", "id", "isDropset", "maxReps", "maxRir", "minReps", "minRir", "seriesNumber", "trainingWeekId") SELECT "dayExerciseId", "effectiveReps", "effectiveRir", "effectiveWeight", "id", "isDropset", "maxReps", "maxRir", "minReps", "minRir", "seriesNumber", "trainingWeekId" FROM "DayExerciseSeries";
DROP TABLE "DayExerciseSeries";
ALTER TABLE "new_DayExerciseSeries" RENAME TO "DayExerciseSeries";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
