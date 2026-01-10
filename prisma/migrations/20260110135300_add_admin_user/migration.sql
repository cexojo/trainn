-- Migration to add an initial admin user to the User table.
-- Before applying, make sure to bcrypt-hash the password value and update all fields below!

-- turso db shell trainn-db-dev < prisma/migrations/20260110135300_add_admin_user/migration.sql

INSERT INTO User (id, firstName, lastName, username, email, password, isocode, role, registrationDate)
VALUES (
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  CURRENT_TIMESTAMP
);
