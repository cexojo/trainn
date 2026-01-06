/*
  Custom migration: Split "name" into "firstName" + "lastName".
  Add columns as nullable, migrate data, make NOT NULL, drop "name".
*/

-- 1. (Migration unrelated to DayExerciseSeries: intentionally left blank)

-- 2. Add firstName/lastName as nullable
ALTER TABLE "User" ADD COLUMN "firstName" TEXT;
ALTER TABLE "User" ADD COLUMN "lastName" TEXT;

-- 3. Backfill by splitting "name"
-- First space is split; lastName empty if no space.
UPDATE "User"
SET
  "firstName" = split_part("name", ' ', 1),
  "lastName" = 
    CASE
      WHEN "name" IS NULL THEN ''
      WHEN position(' ' IN "name") = 0 THEN ''
      ELSE ltrim(substring("name" from position(' ' IN "name") + 1))
    END;

-- 4. Set new columns to NOT NULL
ALTER TABLE "User" ALTER COLUMN "firstName" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "lastName" SET NOT NULL;

-- 5. Drop old "name" column
ALTER TABLE "User" DROP COLUMN "name";
