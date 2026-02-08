import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import { Readable } from "stream";

export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "Missing userId parameter" },
      { status: 400 }
    );
  }

  // Fetch data from the internal athlete-report API (reuse logic)
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl =
    process.env.VERCEL_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    `localhost:3000`;
  const url =
    baseUrl.includes("localhost") || baseUrl.startsWith("127.")
      ? `http://localhost:3000/api/athlete-report?userId=${encodeURIComponent(
          userId
        )}`
      : `${protocol}://${baseUrl}/api/athlete-report?userId=${encodeURIComponent(
          userId
        )}`;

  const reportRes = await fetch(url, {
    headers: { Cookie: req.headers.get("cookie") || "" },
    credentials: "include" as any,
  });

  if (!reportRes.ok) {
    return NextResponse.json(
      { error: "Failed to fetch athlete report data" },
      { status: 500 }
    );
  }
  const data = await reportRes.json();

  // Generate PDF using pdfkit and set Roboto as the default font to avoid Helvetica ENOENT error
  const doc = new PDFDocument({
    margin: 40,
    size: "A4",
    font: process.cwd() + "/public/fonts/Roboto-Regular.ttf"
  });

  // Personal Info Header
  doc.fontSize(16).text(`${data.user?.firstName || ""} ${data.user?.lastName || ""} - Athlete Report`, { align: "center" });
  doc.moveDown(1);

  // Personal Information Section
  doc.fontSize(13).text("Personal Information", { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(11);
  const user = data.user || {};
  const infoRows = [
    ["First name", user.firstName],
    ["Last name", user.lastName],
    ["Username", user.username],
    ["Email", user.email],
    ["Sex", user.sex],
    ["Created at", user.createdAt ? (new Date(user.createdAt)).toLocaleDateString() : ""],
    ["Subscription", user.subscriptionAmount ? `${user.subscriptionAmount} (${user.subscriptionFrequency})` : "-"]
  ];
  infoRows.forEach(([k, v]) => {
    doc.text(`${k}: ${v || "-"}`);
  });
  doc.moveDown(1);

  // Blocks Summary Section
  doc.fontSize(13).text("Blocks Summary", { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(11);
  if (Array.isArray(data.blocks) && data.blocks.length > 0) {
    data.blocks.forEach((b: any, idx: number) => {
      doc.text(
        `Block ${idx + 1} (${b.createdAt ? (new Date(b.createdAt)).toLocaleDateString() : "-"}`, { continued: true }
      );
      doc.text(`, Weeks: ${b.weeksCount ?? "-"})`, { continued: false });
      doc.text(`   Muscle Groups: ${Array.isArray(b.muscleGroups) ? b.muscleGroups.join(", ") : "-"}`);
      doc.moveDown(0.5);
    });
  } else {
    doc.text("No blocks registered.");
  }
  doc.moveDown(1);

  // Payments Section
  doc.fontSize(13).text("Payments", { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(11);

  if (Array.isArray(data.payments) && data.payments.length > 0) {
    const columns = ["Amount", "Due", "Paid", "Status", "Description"];
    const pad = (val: string, width: number) => val.toString().padEnd(width, " ");
    // Print headers
    doc.text(
      columns.map((col) => pad(col, 12)).join(" "),
    );
    // Print each row
    data.payments.forEach((p: any) => {
      const row = [
        p.amount ?? "-",
        p.dueDate ? (new Date(p.dueDate)).toLocaleDateString() : "-",
        p.paidDate ? (new Date(p.paidDate)).toLocaleDateString() : "-",
        p.isPaid ? "Paid" : "Pending",
        p.description || "-",
      ];
      doc.text(row.map((col, i) => pad(col, 12)).join(" "));
    });
  } else {
    doc.text("No payments found.");
  }
  doc.moveDown(1);

  // Measurements Section
  doc.fontSize(13).text("Measurements", { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(11);

  if (Array.isArray(data.measurements) && data.measurements.length > 0) {
    const latest = data.measurements.slice(0, 5);
    const measColumns = Object.keys(latest[0]).filter((col) => !["id", "userId"].includes(col));
    // Prepare data for pdfkit-table
    const table = {
      headers: measColumns.map((col) => ({ label: col.charAt(0).toUpperCase() + col.slice(1), property: col, align: "center" })),
      datas: latest.map((m: any) => {
        const row: Record<string, any> = {};
        measColumns.forEach((col) => {
          if (col.toLowerCase().includes("date") && m[col]) {
            row[col] = (new Date(m[col])).toLocaleDateString();
          } else {
            row[col] = m[col] ?? "-";
          }
        });
        return row;
      }),
      options: {
        width: doc.page.width - doc.page.margins.left - doc.page.margins.right,
        divider: { horizontal: { color: "#aaa", width: 0.5 }, vertical: { color: "#ccc", width: 0.5 } },
        prepareHeader: () => doc.fontSize(10).fillColor("#222"),
        prepareRow: (row: any, i: number) => doc.fontSize(9).fillColor(i % 2 ? "#444" : "#000"),
      }
    };
    // Dynamically import pdfkit-table only where it's used to avoid any build errors
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const PDFTable = require("pdfkit-table");
    // @ts-ignore
    doc.table(table);
  } else {
    doc.text("No measurements found.");
  }
  doc.moveDown(1);

  doc.end();

  // Buffer PDF creation and return response
  const buffers: Buffer[] = [];
  await new Promise<void>((resolve) => {
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", resolve);
  });

  const pdfBuffer = Buffer.concat(buffers);

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="athlete_report_${userId}.pdf"`,
    },
  });
}
