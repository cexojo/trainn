import "dotenv/config";
import prisma from "@/prisma/client";
import { faker } from "@faker-js/faker";

async function main() {
  let count = 0;
  const usersToCreate = [];

  // Generate 100 fake athletes
  for (let i = 0; i < 100; i++) {
    // Make username and email unique
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const username = faker.internet.username({ firstName, lastName }).toLowerCase() + faker.string.alphanumeric(4).toLowerCase();
    const email = username + "@example.com";
    usersToCreate.push({
      name: `${firstName} ${lastName}`,
      username: username,
      email: email,
      role: "athlete",
    });
  }

  // Upsert or create to avoid duplicates if run multiple times
  for (const user of usersToCreate) {
    await prisma.user.upsert({
      where: { username: user.username },
      update: {},
      create: user,
    });
    count++;
  }

  console.log(`Seeded ${count} fake athletes.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
