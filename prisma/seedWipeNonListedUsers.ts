import "dotenv/config";
import prisma from "@/prisma/client";

/**
 * List of usernames that should NOT be deleted.
 * Change these to match users you want to keep.
 */
const keepUsernames: string[] = [
  "elena", "exojo"
];

async function main() {
  // Keep (do not delete) these users
  const keepUsers = await prisma.user.findMany({
    where: { username: { in: keepUsernames } },
    select: { id: true }
  });
  const keepUserIds = keepUsers.map((u: { id: string }) => u.id);

  // Find all user IDs to be deleted
  const deleteUsers = await prisma.user.findMany({
    where: { id: { notIn: keepUserIds } },
    select: { id: true }
  });
  const deleteUserIds = deleteUsers.map((u: { id: string }) => u.id);

  // 1. Find all blocks owned by users to delete
  const blocks = await prisma.trainingBlock.findMany({
    where: { userId: { in: deleteUserIds } },
    select: { id: true }
  });
  const blockIds = blocks.map((b: { id: string }) => b.id);

  // 2. All weeks in those blocks
  const weeks = await prisma.trainingWeek.findMany({
    where: { blockId: { in: blockIds } },
    select: { id: true }
  });
  const weekIds = weeks.map((w: { id: string }) => w.id);

  // 3. All days in those weeks
  const days = await prisma.trainingDay.findMany({
    where: { weekId: { in: weekIds } },
    select: { id: true }
  });
  const dayIds = days.map((d: { id: string }) => d.id);

  // 4. All dayExercises in those days
  const dayExercises = await prisma.dayExercise.findMany({
    where: { trainingDayId: { in: dayIds } },
    select: { id: true }
  });
  const dayExerciseIds = dayExercises.map((de: { id: string }) => de.id);

  // 5. All dayExerciseSeries belonging to those dayExercises
  await prisma.dayExerciseSeries.deleteMany({
    where: { dayExerciseId: { in: dayExerciseIds } }
  });

  // 6. All dayExerciseSeries belonging directly to weekIds (through trainingWeekId)
  await prisma.dayExerciseSeries.deleteMany({
    where: { trainingWeekId: { in: weekIds } }
  });

  // 7. Delete all dayExercises (now safe)
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
  await prisma.payment.deleteMany({
    where: { userId: { in: deleteUserIds } }
  });

  // 12. Delete the users themselves
  const deletedUser = await prisma.user.deleteMany({
    where: { id: { in: deleteUserIds } }
  });

  console.log(`Deleted ${deletedUser.count} users not in keepUsernames:`, keepUsernames);

  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
