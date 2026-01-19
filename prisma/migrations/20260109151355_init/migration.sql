-- turso db shell trainn-db-dev < prisma/migrations/20260109151355_init/migration.sql

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "passwordRefreshToken" TEXT,
    "isocode" TEXT,
    "lastVisitedWeek" TEXT,
    "registrationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hidingDate" DATETIME,
    "subscriptionAmount" REAL,
    "subscriptionFrequency" TEXT,
    "role" TEXT NOT NULL DEFAULT 'athlete',
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "lastOKLogin" DATETIME,
    "lastKOLogin" DATETIME,
    "sex" TEXT
);

-- CreateTable
CREATE TABLE "TrainingBlock" (
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "id" TEXT NOT NULL PRIMARY KEY,
    "blockNumber" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
CREATE TABLE "TrainingDay" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "dayLabel" TEXT NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "weekId" TEXT NOT NULL,
    CONSTRAINT "TrainingDay_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "TrainingWeek" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExerciseGroup" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "exerciseGroupId" TEXT NOT NULL,
    "recommendedMinReps" INTEGER,
    "recommendedMaxReps" INTEGER,
    "measurementType" TEXT NOT NULL DEFAULT 'REPS',
    CONSTRAINT "Exercise_exerciseGroupId_fkey" FOREIGN KEY ("exerciseGroupId") REFERENCES "ExerciseGroup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DayExercise" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "trainingDayId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "athleteNotes" TEXT,
    "trainerNotes" TEXT,
    "day" TEXT NOT NULL,
    "exerciseNumber" INTEGER,
    CONSTRAINT "DayExercise_trainingDayId_fkey" FOREIGN KEY ("trainingDayId") REFERENCES "TrainingDay" ("id") ON DELETE RESTRICT,
    CONSTRAINT "DayExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE RESTRICT
);

-- CreateTable
CREATE TABLE "DayExerciseSeries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayExerciseId" TEXT NOT NULL,
    "seriesNumber" INTEGER NOT NULL,
    "minReps" INTEGER,
    "maxReps" INTEGER,
    "minRir" INTEGER,
    "maxRir" INTEGER,
    "effectiveReps" INTEGER,
    "effectiveWeight" REAL,
    "effectiveRir" INTEGER,
    "trainingWeekId" TEXT NOT NULL,
    "isDropset" BOOLEAN NOT NULL DEFAULT false,
    "athleteNotes" TEXT,
    "trainerNotes" TEXT,
    "athleteUserRead" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "DayExerciseSeries_dayExerciseId_fkey" FOREIGN KEY ("dayExerciseId") REFERENCES "DayExercise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DayExerciseSeries_trainingWeekId_fkey" FOREIGN KEY ("trainingWeekId") REFERENCES "TrainingWeek" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "amount" REAL NOT NULL,
    "isPayed" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseGroup_name_key" ON "ExerciseGroup"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_name_key" ON "Exercise"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_passwordRefreshToken_key" ON "User"("passwordRefreshToken");

-- CreateTable
CREATE TABLE "Measurement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "weight" REAL NOT NULL,
    "neck" REAL NOT NULL,
    "arm" REAL NOT NULL,
    "waist" REAL NOT NULL,
    "abdomen" REAL NOT NULL,
    "hip" REAL NOT NULL,
    "thigh" REAL NOT NULL,
    "calfMuscle" REAL NOT NULL,
    CONSTRAINT "Measurement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT
);
