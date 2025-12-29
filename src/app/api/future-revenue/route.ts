import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-for-local";

function getTokenPayload(req: NextRequest) {
  const token = req.cookies.get("elena_auth_token")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch {
    return null;
  }
}

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
