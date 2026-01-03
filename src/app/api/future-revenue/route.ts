import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getTokenPayload } from "@/app/api/utils/auth";

function formatYearMonth(date: Date) {
  return date.toISOString().slice(0, 7); // "YYYY-MM"
}

function getMonthYearLabel(date: Date, lang: string) {
  return date.toLocaleDateString(lang, {
    month: "short",
    year: "numeric"
  });
}

export async function GET(req: NextRequest) {
  const tokenPayload = getTokenPayload(req);
  if (!tokenPayload || tokenPayload.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get language preference from query (?lang=es) or default to "es"
  const urlLang = req.nextUrl.searchParams.get("lang");
  const lang = urlLang || "es";

  const now = new Date();
  const results = [];

  for (let i = 0; i < 12; i++) {
    const firstOfMonth = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const lastOfMonth = new Date(now.getFullYear(), now.getMonth() + i + 1, 0, 23, 59, 59, 999);

    const agg = await prisma.payment.aggregate({
      _sum: { amount: true },
      where: {
        isPayed: false,
        dueDate: {
          gte: firstOfMonth,
          lte: lastOfMonth
        }
      }
    });

    results.push({
      month: formatYearMonth(firstOfMonth),
      monthLabel: getMonthYearLabel(firstOfMonth, lang),
      futureRevenue: agg._sum.amount || 0
    });
  }

  return NextResponse.json(results);
}
