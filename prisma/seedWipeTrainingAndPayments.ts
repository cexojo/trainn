import "dotenv/config";
import prisma from "@/prisma/client";

/**
 * List of usernames whose training and payments should be deleted (but the user themselves will remain).
 * Populate this array with the usernames you wish to wipe.
 */
const removeTrainingUsernames: string[] = [
  "carlos",
];

async function main() {
  // Find users to wipe
  const targetUsers = await prisma.user.findMany({
    where: { username: { in: removeTrainingUsernames } },
    select: { id: true }
  });
  const targetUserIds = targetUsers.map((u: { id: string }) => u.id);

  if (targetUserIds.length === 0) {
    console.log("No users found for provided removeTrainingUsernames.");
    await prisma.$disconnect();
    return;
  }

  // 1. Find all trainingBlocks owned by users to wipe
  const blocks = await prisma.trainingBlock.findMany({
    where: { userId: { in: targetUserIds } },
    select: { id: true }
  });
  const blockIds = blocks.map((b: { id: string }) => b.id);

  // 2. Find all trainingWeeks in those blocks
  const weeks = await prisma.trainingWeek.findMany({
    where: { blockId: { in: blockIds } },
    select: { id: true }
  });
  const weekIds = weeks.map((w: { id: string }) => w.id);

  // 3. Find all trainingDays in those weeks
  const days = await prisma.trainingDay.findMany({
    where: { weekId: { in: weekIds } },
    select: { id: true }
  });
  const dayIds = days.map((d: { id: string }) => d.id);

  // 4. Find all dayExercises in those days
  const dayExercises = await prisma.dayExercise.findMany({
    where: { trainingDayId: { in: dayIds } },
    select: { id: true }
  });
  const dayExerciseIds = dayExercises.map((de: { id: string }) => de.id);

  // 5. Delete all dayExerciseSeries belonging to those dayExercises
  await prisma.dayExerciseSeries.deleteMany({
    where: { dayExerciseId: { in: dayExerciseIds } }
  });

  // 6. Delete all dayExerciseSeries belonging directly to weekIds (through trainingWeekId)
  await prisma.dayExerciseSeries.deleteMany({
    where: { trainingWeekId: { in: weekIds } }
  });

  // 7. Delete all dayExercises
  await prisma.dayExercise.deleteMany({
    where: { id: { in: dayExerciseIds } }
  });

  // 8. Delete all trainingDays
  await prisma.trainingDay.deleteMany({
    where: { id: { in: dayIds } }
  });

  // 9. Delete all trainingWeeks
  await prisma.trainingWeek.deleteMany({
    where: { id: { in: weekIds } }
  });

  // 10. Delete all trainingBlocks
  await prisma.trainingBlock.deleteMany({
    where: { id: { in: blockIds } }
  });

  // 11. Delete all payments owned by those users
  const deletedPayments = await prisma.payment.deleteMany({
    where: { userId: { in: targetUserIds } }
  });

  console.log(`Wiped all training and ${deletedPayments.count} payments for usernames:`, removeTrainingUsernames);

  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
