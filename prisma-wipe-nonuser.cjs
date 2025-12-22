const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Delete in FK-safe order:
  await prisma.dayExerciseSeries.deleteMany({});
  await prisma.dayExercise.deleteMany({});
  await prisma.trainingDay.deleteMany({});
  await prisma.trainingWeek.deleteMany({});
  await prisma.trainingBlock.deleteMany({});
  console.log('Wiped all block-related info. User and master exercises preserved.');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
