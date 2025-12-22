-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TrainingBlock" (
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "id" TEXT NOT NULL PRIMARY KEY,
    "blockNumber" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "TrainingBlock_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TrainingBlock" ("blockNumber", "description", "id", "userId") SELECT "blockNumber", "description", "id", "userId" FROM "TrainingBlock";
DROP TABLE "TrainingBlock";
ALTER TABLE "new_TrainingBlock" RENAME TO "TrainingBlock";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
