-- turso db shell trainn-db-dev < prisma/migrations/20260319133000_add_nutrition_plan_models/migration.sql
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
    "description" TEXT,    
    CONSTRAINT "NutritionPlanMeal_nutritionPlanDayId_fkey" FOREIGN KEY ("nutritionPlanDayId") REFERENCES "NutritionPlanDay" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NutritionPlanMealOption" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nutritionPlanMealId" TEXT NOT NULL,
    "optionIndex" INTEGER NOT NULL,
    "name" TEXT,
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
