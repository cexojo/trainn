// Run with: npx tsx prisma/createAdminSeed.ts

import "dotenv/config";
import prisma from "@/prisma/client";
import bcrypt from "bcryptjs";

// ===== Admin user constants =====
const ADMIN_NAME = "Elena";
const ADMIN_USERNAME = "elena";
const ADMIN_EMAIL = "elenaalonsobeneyto8@gmail.com";
const ADMIN_PLAIN_PASSWORD = "Elena@2026";
const ADMIN_ROLE = "admin";
const ADMIN_ISOCODE = "es";
// ===============================

// This script creates a default admin user for local/dev usage only.
// Password is left as an empty string. Set a real password after creation.

async function main() {
  const data = {
    name: ADMIN_NAME,
    username: ADMIN_USERNAME,
    email: ADMIN_EMAIL,
    password: await bcrypt.hash(ADMIN_PLAIN_PASSWORD, 10),
    role: ADMIN_ROLE,
    isocode: ADMIN_ISOCODE
  };

  // Upsert to avoid duplicate admins if run multiple times
  const admin = await prisma.user.upsert({
    where: { username: data.username },
    update: data,
    create: data,
  });

  console.log("Admin user created/updated with username:", admin.username);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
