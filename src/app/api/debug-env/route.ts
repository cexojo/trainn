import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // NEVER expose secrets in production. Use this endpoint only for debugging!
  return NextResponse.json({
    TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL,
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
    VERCEL_URL: process.env.VERCEL_URL,
  });
}
