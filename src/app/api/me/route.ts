import { NextRequest, NextResponse } from "next/server";
import { decodeJWTPayload } from "@/app/utils/jwt";

// Only allow GET. Other methods return 405.
export async function GET(req: NextRequest) {
  // Get cookies from the request (SSR-safe)
  const token = req.cookies.get("elena_auth_token")?.value;
  if (!token) {
    return NextResponse.json({ username: null }, { status: 401 });
  }
  // Server-side decode: atob is not global in Node, use Buffer as fallback
  let payload: any = null;
  try {
    const [, payloadB64] = token.split(".");
    const payloadJson =
      typeof atob !== "undefined"
        ? atob(payloadB64)
        : Buffer.from(payloadB64, "base64").toString("utf8");
    payload = JSON.parse(payloadJson);
  } catch (e) {
    return NextResponse.json({ username: null }, { status: 400 });
  }
  const username =
    payload?.username ||
    payload?.user ||
    payload?.email ||
    payload?.sub ||
    null;
  return NextResponse.json({ username });
}
