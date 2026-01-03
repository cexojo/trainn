import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-for-local";

/**
 * Returns the decoded token payload if the request has a valid admin JWT cookie.
 * Returns null if token missing or invalid.
 */
export function getTokenPayload(req: NextRequest): any {
  const token = req.cookies.get("elena_auth_token")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch {
    return null;
  }
}
