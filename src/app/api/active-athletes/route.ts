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
  // Get language preference from query (?lang=es) or default to "es"
  const urlLang = req.nextUrl.searchParams.get("lang");
  const lang = urlLang || "es"; // default to Spanish, override as needed

  // Authenticate
  const tokenPayload = getTokenPayload(req);
  if (!tokenPayload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (tokenPayload.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Only include athletes
  const users = await prisma.user.findMany({
    where: { role: 'athlete' },
    select: {
      registrationDate: true,
      hidingDate: true,
      hidden: true,
    },
  });

  if (users.length === 0) {
    return NextResponse.json([]);
  }

  // Find earliest registration and latest hidingDate/now
  let minDate = users[0].registrationDate;
  let maxDate = new Date();
  for (const u of users) {
    if (u.registrationDate < minDate) minDate = u.registrationDate;
    if (u.hidingDate && u.hidingDate > maxDate) maxDate = u.hidingDate;
  }

  // Build list of months (YYYY-MM) and their localized labels from minDate to maxDate
  const months: { iso: string; label: string; dateObj: Date }[] = [];
  let cursor = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
  const end = new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
  while (cursor <= end) {
    months.push({
      iso: formatYearMonth(cursor),
      label: getMonthYearLabel(cursor, lang),
      dateObj: new Date(cursor),
    });
    cursor = addMonths(cursor, 1);
  }

  // For each month, compute active and use the localized label
  const data = months.map(monthObj => {
    const { iso: monthStr, label: monthLabel, dateObj } = monthObj;
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; // getMonth is 0-based
    const monthEnd = new Date(year, month, 0, 23, 59, 59, 999); // last day of month, end of day

    let registered = 0, hiddens = 0;
    for (const user of users) {
      if (user.registrationDate <= monthEnd) registered++;
      if (user.hidden && user.hidingDate && user.hidingDate <= monthEnd) hiddens++;
    }

    return {
      month: monthStr,       // "YYYY-MM" for programmatic use
      monthLabel,            // localized display label, e.g. "Ene 2025"
      activeAthletes: registered - hiddens,
    };
  });

  return NextResponse.json(data);
}
