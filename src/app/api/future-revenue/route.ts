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
  const months: { iso: string; label: string; start: Date; end: Date }[] = [];
  for (let i = 0; i < 12; i++) {
    const firstOfMonth = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const lastOfMonth = new Date(now.getFullYear(), now.getMonth() + i + 1, 0, 23, 59, 59, 999);
    months.push({
      iso: formatYearMonth(firstOfMonth),
      label: getMonthYearLabel(firstOfMonth, lang),
      start: firstOfMonth,
      end: lastOfMonth
    });
  }

  const startOfFirstMonth = months[0].start;
  const endOfLastMonth = months[months.length - 1].end;

  const payments = await prisma.payment.findMany({
    where: {
      isPayed: false,
      dueDate: {
        gte: startOfFirstMonth,
        lte: endOfLastMonth
      }
    },
    select: { amount: true, dueDate: true }
  });

  // Aggregate by month (iso YYYY-MM)
  const monthRevenue: Record<string, number> = {};
  for (const payment of payments) {
    const iso = formatYearMonth(new Date(payment.dueDate));
    monthRevenue[iso] = (monthRevenue[iso] || 0) + (payment.amount || 0);
  }

  const results = months.map(month => ({
    month: month.iso,
    monthLabel: month.label,
    futureRevenue: monthRevenue[month.iso] || 0
  }));

  return NextResponse.json(results);
}
