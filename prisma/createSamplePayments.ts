import "dotenv/config";
import prisma from "@/prisma/client";

const userId = "c4daa70f-a7ef-4255-be8e-be2b9804c959";

async function main() {
  const payments = [];

  // 10 paid payments: due dates 10 to 1 months ago
  for (let i = 10; i >= 1; i--) {
    const dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() - i);
    payments.push({
      userId,
      dueDate,
      amount: 100,
      isPayed: true,
    });
  }

  // 1 unpaid, overdue payment: yesterday
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() - 1);
  payments.push({
    userId,
    dueDate,
    amount: 100,
    isPayed: false,
  });

  // Insert all payments
  await prisma.payment.createMany({
    data: payments,
  });

  console.log("Sample payments seeded for user", userId);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
