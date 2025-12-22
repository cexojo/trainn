-- CreateTable
CREATE TABLE "TrainingBlock" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "blockNumber" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "TrainingBlock_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TrainingWeek" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "blockId" TEXT NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "weekStart" DATETIME NOT NULL,
    "weekEnd" DATETIME NOT NULL,
    CONSTRAINT "TrainingWeek_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "TrainingBlock" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "group" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ExerciseDefinition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "day" TEXT NOT NULL,
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
    CONSTRAINT "ExerciseDefinition_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ExerciseDefinition_trainingWeekId_fkey" FOREIGN KEY ("trainingWeekId") REFERENCES "TrainingWeek" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_name_key" ON "Exercise"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
