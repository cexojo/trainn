import "dotenv/config";
import prisma from "@/prisma/client";

function randomDateWithinLastYear(): Date {
  const now = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(now.getFullYear() - 1);

  const start = oneYearAgo.getTime();
  const end = now.getTime();
  const randomTimestamp = Math.floor(Math.random() * (end - start)) + start;
  return new Date(randomTimestamp);
}

async function main() {
  const users = await prisma.user.findMany();
  for (const user of users) {
    const randomizedDate = randomDateWithinLastYear();
    await prisma.user.update({
      where: { id: user.id },
      data: { registrationDate: randomizedDate },
    });
    console.log(
      `Set registrationDate for ${user.username || user.email}: ${randomizedDate.toISOString()}`
    );
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
