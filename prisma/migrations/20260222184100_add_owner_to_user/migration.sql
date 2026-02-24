-- turso db shell trainn-db-dev < prisma/migrations/20260222184100_add_owner_to_user/migration.sql
-- Add nullable ownerId column to User table (for admin responsible for athlete)
ALTER TABLE User ADD COLUMN ownerId TEXT;

-- Add foreign key constraint so ownerId references User(id)
-- (Supported in SQLite >= 3.35.0. Prisma may do a table recreation under the hood for older versions)
--ALTER TABLE User ADD CONSTRAINT "User_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id");