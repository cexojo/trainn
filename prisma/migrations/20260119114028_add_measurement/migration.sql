-- turso db shell trainn-db-dev < prisma/migrations/20260119114028_add_measurement/migration.sql

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
    CONSTRAINT "Measurement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
