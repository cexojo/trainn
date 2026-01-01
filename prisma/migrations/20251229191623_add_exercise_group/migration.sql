/*
  Warnings:

  - You are about to drop the column `group` on the `Exercise` table. All the data in the column will be lost.
  - Added the required column `exerciseGroupId` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- Step 1: Create ExerciseGroup table
CREATE TABLE "ExerciseGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "ExerciseGroup_pkey" PRIMARY KEY ("id")
);

-- Step 2: Create unique index on name
CREATE UNIQUE INDEX "ExerciseGroup_name_key" ON "ExerciseGroup"("name");

-- Step 3: Add exerciseGroupId as NULLABLE so we can fill it for existing rows
ALTER TABLE "Exercise" ADD COLUMN "exerciseGroupId" TEXT;

-- Step 4: Remove old group column (use quotes to protect reserved word)
ALTER TABLE "Exercise" DROP COLUMN "group";

-- Step 5: Insert default group
INSERT INTO "ExerciseGroup" ("id", "name") VALUES ('00000000-0000-0000-0000-000000000000', 'General');

-- Step 6: Point all exercises to default group
UPDATE "Exercise" SET "exerciseGroupId" = '00000000-0000-0000-0000-000000000000' WHERE "exerciseGroupId" IS NULL;

-- Step 7: Make exerciseGroupId NOT NULL
ALTER TABLE "Exercise" ALTER COLUMN "exerciseGroupId" SET NOT NULL;

-- Step 8: Add foreign key constraint
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_exerciseGroupId_fkey" FOREIGN KEY ("exerciseGroupId") REFERENCES "ExerciseGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
