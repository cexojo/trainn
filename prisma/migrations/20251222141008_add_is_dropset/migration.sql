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
    "isDropset" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "ExerciseDefinition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ExerciseDefinition_trainingDayId_fkey" FOREIGN KEY ("trainingDayId") REFERENCES "TrainingDay" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ExerciseDefinition_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ExerciseDefinition_trainingWeekId_fkey" FOREIGN KEY ("trainingWeekId") REFERENCES "TrainingWeek" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ExerciseDefinition" ("day", "dayNumber", "effectiveReps", "effectiveRir", "effectiveWeight", "exerciseId", "id", "maxReps", "maxRir", "minReps", "minRir", "seriesNumber", "trainingDayId", "trainingWeekId", "userId") SELECT "day", "dayNumber", "effectiveReps", "effectiveRir", "effectiveWeight", "exerciseId", "id", "maxReps", "maxRir", "minReps", "minRir", "seriesNumber", "trainingDayId", "trainingWeekId", "userId" FROM "ExerciseDefinition";
DROP TABLE "ExerciseDefinition";
ALTER TABLE "new_ExerciseDefinition" RENAME TO "ExerciseDefinition";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
