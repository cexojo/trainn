import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getTokenPayload } from "@/app/api/utils/auth";

export async function GET(req: NextRequest) {
  // Authenticate
  const tokenPayload = getTokenPayload(req);
  if (!tokenPayload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (tokenPayload.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const now = new Date();

  const unpaid = await prisma.payment.aggregate({
    _sum: { amount: true },
    where: {
      isPayed: false,
      dueDate: { lt: now }
    }
  });

  return NextResponse.json({
    unpaid: unpaid._sum.amount || 0
  });
}
