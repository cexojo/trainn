/*
  Warnings:

  - You are about to drop the `ExerciseDefinition` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ExerciseDefinition";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "DayExercise" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "trainingDayId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "notes" TEXT,
    "day" TEXT NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    CONSTRAINT "DayExercise_trainingDayId_fkey" FOREIGN KEY ("trainingDayId") REFERENCES "TrainingDay" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DayExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DayExerciseSeries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
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
    CONSTRAINT "DayExerciseSeries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DayExerciseSeries_dayExerciseId_fkey" FOREIGN KEY ("dayExerciseId") REFERENCES "DayExercise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DayExerciseSeries_trainingWeekId_fkey" FOREIGN KEY ("trainingWeekId") REFERENCES "TrainingWeek" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
