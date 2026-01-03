import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getTokenPayload } from "@/app/api/utils/auth";

function formatYearMonth(date: Date) {
  return date.toISOString().slice(0, 7); // "YYYY-MM"
}

function getMonthYearLabel(date: Date, lang: string) {
  // Short month + year "Ene 2025", "Jan 2025"
  return date.toLocaleDateString(lang, {
    month: 'short',
    year: 'numeric'
  });
}

function addMonths(date: Date, n: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + n);
  return d;
}

export async function GET(req: NextRequest) {
  // Authenticate
  const tokenPayload = getTokenPayload(req);
  if (!tokenPayload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (tokenPayload.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Get language preference from query (?lang=es) or default to "es"
  const urlLang = req.nextUrl.searchParams.get("lang");
  const lang = urlLang || "es";

  // Compute a list of the last 12 months, newest last
  const now = new Date();
  const months: { iso: string; label: string; start: Date; end: Date }[] = [];
  for (let i = 11; i >= 0; i--) {
    const firstOfMonth = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const lastOfMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59, 999);
    months.push({
      iso: formatYearMonth(firstOfMonth),
      label: getMonthYearLabel(firstOfMonth, lang),
      start: firstOfMonth,
      end: lastOfMonth
    });
  }

  // For each month, sum the payments (isPayed) with dueDate inside this month
  const data = [];
  for (const month of months) {
    const revenue = await prisma.payment.aggregate({
      _sum: { amount: true },
      where: {
        isPayed: true,
        dueDate: {
          gte: month.start,
          lte: month.end
        }
      }
    });
    data.push({
      month: month.iso,
      monthLabel: month.label,
      revenue: revenue._sum.amount || 0
    });
  }

  return NextResponse.json(data);
}
