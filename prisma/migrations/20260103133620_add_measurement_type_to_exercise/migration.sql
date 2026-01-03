-- CreateEnum
CREATE TYPE "MeasurementType" AS ENUM ('REPS', 'TIME');

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "measurementType" "MeasurementType" NOT NULL DEFAULT 'REPS';
