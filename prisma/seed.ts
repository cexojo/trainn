import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create sample user
  const user = await prisma.user.create({ data: { name: "John Doe" } });

  // Create exercises
  const squat = await prisma.exercise.create({ data: { name: "Squat", group: "Legs" } });
  const bench = await prisma.exercise.create({ data: { name: "Bench Press", group: "Chest" } });
  const deadlift = await prisma.exercise.create({ data: { name: "Deadlift", group: "Back" } });

  // Create 3 training blocks, each with 6 weeks
  let weekStartDate = new Date();
  weekStartDate.setHours(0, 0, 0, 0);
  for (let b = 1; b <= 3; ++b) {
    const block = await prisma.trainingBlock.create({
      data: {
        blockNumber: b,
        description: `Training block ${b}`,
        userId: user.id,
      },
    });

    for (let w = 1; w <= 6; ++w) {
      const weekStart = new Date(weekStartDate.getTime() + ((b - 1) * 6 + w - 1) * 7 * 24 * 60 * 60 * 1000);
      const weekEnd = new Date(weekStart); weekEnd.setDate(weekEnd.getDate() + 6);

      const week = await prisma.trainingWeek.create({
        data: {
          blockId: block.id,
          weekNumber: w,
          weekStart,
          weekEnd,
        },
      });

      // Add exercise definitions for this week: 2 for squat, 1 bench, 1 deadlift
      await prisma.exerciseDefinition.create({
        data: {
          userId: user.id,
          day: "Monday",
          exerciseId: squat.id,
          seriesNumber: 1,
          minReps: 5,
          maxReps: 8,
          minRir: 1,
          maxRir: 3,
          effectiveReps: null,
          effectiveWeight: null,
          effectiveRir: null,
          trainingWeekId: week.id,
        },
      });
      await prisma.exerciseDefinition.create({
        data: {
          userId: user.id,
          day: "Monday",
          exerciseId: squat.id,
          seriesNumber: 2,
          minReps: 5,
          maxReps: 8,
          minRir: 1,
          maxRir: 3,
          effectiveReps: null,
          effectiveWeight: null,
          effectiveRir: null,
          trainingWeekId: week.id,
        },
      });
      await prisma.exerciseDefinition.create({
        data: {
          userId: user.id,
          day: "Monday",
          exerciseId: bench.id,
          seriesNumber: 1,
          minReps: 6,
          maxReps: 10,
          minRir: 1,
          maxRir: 2,
          effectiveReps: null,
          effectiveWeight: null,
          effectiveRir: null,
          trainingWeekId: week.id,
        },
      });
      await prisma.exerciseDefinition.create({
        data: {
          userId: user.id,
          day: "Tuesday",
          exerciseId: deadlift.id,
          seriesNumber: 1,
          minReps: 4,
          maxReps: 6,
          minRir: 2,
          maxRir: 3,
          effectiveReps: null,
          effectiveWeight: null,
          effectiveRir: null,
          trainingWeekId: week.id,
        },
      });
    }
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
