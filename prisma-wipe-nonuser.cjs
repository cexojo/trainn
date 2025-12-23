import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

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
