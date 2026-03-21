-- turso db shell trainn-db-dev < prisma/migrations/20260109151355_init/migration.sql

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
    "factorQuadriceps" REAL,
    "factorHamstring" REAL,
    "factorGlute" REAL,
    "factorAdductor" REAL,
    "factorCalf" REAL,
    "factorForearm" REAL,
    "factorBiceps" REAL,
    "factorTriceps" REAL,
    "factorLateralDelt" REAL,
    "factorPosteriorDelt" REAL,
    "factorAnteriorDelt" REAL,
    "factorPectoral" REAL,
    "factorClavicularPec" REAL,
    "factorUpperBack" REAL,
    "factorLat" REAL,
    "factorLowerBack" REAL,
    "factorAbdomen" REAL,
    CONSTRAINT "Exercise_exerciseGroupId_fkey" FOREIGN KEY ("exerciseGroupId") REFERENCES "ExerciseGroup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

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
    "sex" TEXT,
    "ownerId" TEXT,
    CONSTRAINT "User_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
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
    CONSTRAINT "DayExercise_trainingDayId_fkey" FOREIGN KEY ("trainingDayId") REFERENCES "TrainingDay" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DayExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
    "modifiedAt" DATETIME,
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

-- CreateTable
CREATE TABLE "Measurement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "weight" REAL,
    "neck" REAL,
    "arm" REAL,
    "waist" REAL,
    "abdomen" REAL,
    "hip" REAL,
    "thigh" REAL,
    "calfMuscle" REAL,
    CONSTRAINT "Measurement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FoodGroup" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Food" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "foodGroupId" TEXT NOT NULL,
    "calories" REAL,
    "protein" REAL,
    "fat" REAL,
    "carbohydrates" REAL,
    "water" REAL,
    "nitrogen" REAL,
    "vitaminA_ui" REAL,
    "vitaminB1_mcg" REAL,
    "vitaminB2_mcg" REAL,
    "vitaminC_mcg" REAL,
    "niacin_mcg" REAL,
    "sodium_mg" REAL,
    "potassium_mg" REAL,
    "calcium_mg" REAL,
    "magnesium_mg" REAL,
    "iron_mg" REAL,
    "copper_mg" REAL,
    "phosphorus_mg" REAL,
    "sulfur_mg" REAL,
    "chloride_mg" REAL,
    "phenylalanine_mg" REAL,
    "isoleucine_mg" REAL,
    "leucine_mg" REAL,
    "lysine_mg" REAL,
    "methionine_mg" REAL,
    "threonine_mg" REAL,
    "tryptophan_mg" REAL,
    "valine_mg" REAL,
    "acid" REAL,
    "alcal" REAL,
    CONSTRAINT "Food_foodGroupId_fkey" FOREIGN KEY ("foodGroupId") REFERENCES "FoodGroup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NutritionPlan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "NutritionPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NutritionPlanDay" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nutritionPlanId" TEXT NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    CONSTRAINT "NutritionPlanDay_nutritionPlanId_fkey" FOREIGN KEY ("nutritionPlanId") REFERENCES "NutritionPlan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NutritionPlanMeal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nutritionPlanDayId" TEXT NOT NULL,
    "mealIndex" INTEGER NOT NULL,
    "name" TEXT,
    CONSTRAINT "NutritionPlanMeal_nutritionPlanDayId_fkey" FOREIGN KEY ("nutritionPlanDayId") REFERENCES "NutritionPlanDay" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NutritionPlanMealOption" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nutritionPlanMealId" TEXT NOT NULL,
    "optionIndex" INTEGER NOT NULL,
    "description" TEXT,
    CONSTRAINT "NutritionPlanMealOption_nutritionPlanMealId_fkey" FOREIGN KEY ("nutritionPlanMealId") REFERENCES "NutritionPlanMeal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NutritionPlanMealOptionFood" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nutritionPlanMealOptionId" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,
    "quantity" REAL,
    CONSTRAINT "NutritionPlanMealOptionFood_nutritionPlanMealOptionId_fkey" FOREIGN KEY ("nutritionPlanMealOptionId") REFERENCES "NutritionPlanMealOption" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "NutritionPlanMealOptionFood_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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

-- CreateIndex
CREATE UNIQUE INDEX "FoodGroup_name_key" ON "FoodGroup"("name");

