/*
  Warnings:

  - Added the required column `dayNumber` to the `ExerciseDefinition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayNumber` to the `TrainingDay` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExerciseDefinition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "trainingDayId" TEXT,
    "exerciseId" TEXT NOT NULL,
    "seriesNumber" INTEGER NOT NULL,
    "minReps" INTEGER NOT NULL,
    "maxReps" INTEGER NOT NULL,
    "minRir" INTEGER NOT NULL,
    "maxRir" INTEGER NOT NULL,
    "effectiveReps" INTEGER,
    "effectiveWeight" REAL,
    "effectiveRir" INTEGER,
    "trainingWeekId" TEXT NOT NULL,
    CONSTRAINT "ExerciseDefinition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ExerciseDefinition_trainingDayId_fkey" FOREIGN KEY ("trainingDayId") REFERENCES "TrainingDay" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ExerciseDefinition_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ExerciseDefinition_trainingWeekId_fkey" FOREIGN KEY ("trainingWeekId") REFERENCES "TrainingWeek" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ExerciseDefinition" ("day", "effectiveReps", "effectiveRir", "effectiveWeight", "exerciseId", "id", "maxReps", "maxRir", "minReps", "minRir", "seriesNumber", "trainingDayId", "trainingWeekId", "userId") SELECT "day", "effectiveReps", "effectiveRir", "effectiveWeight", "exerciseId", "id", "maxReps", "maxRir", "minReps", "minRir", "seriesNumber", "trainingDayId", "trainingWeekId", "userId" FROM "ExerciseDefinition";
DROP TABLE "ExerciseDefinition";
ALTER TABLE "new_ExerciseDefinition" RENAME TO "ExerciseDefinition";
CREATE TABLE "new_TrainingDay" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "dayLabel" TEXT NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "weekId" TEXT NOT NULL,
    CONSTRAINT "TrainingDay_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "TrainingWeek" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TrainingDay" ("date", "dayLabel", "id", "weekId") SELECT "date", "dayLabel", "id", "weekId" FROM "TrainingDay";
DROP TABLE "TrainingDay";
ALTER TABLE "new_TrainingDay" RENAME TO "TrainingDay";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
