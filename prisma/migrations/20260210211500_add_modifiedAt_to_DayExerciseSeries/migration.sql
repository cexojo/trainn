-- turso db shell trainn-db-dev < prisma/migrations/20260210211500_add_modifiedAt_to_DayExerciseSeries/migration.sql
-- Add modifiedAt field to DayExerciseSeries table as optional (nullable)
ALTER TABLE DayExerciseSeries ADD COLUMN modifiedAt DATETIME;
