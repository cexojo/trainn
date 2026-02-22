import { NextRequest, NextResponse } from "next/server";

/**
 * Expires the auth cookie for logout.
 */
function expiredAuthCookie(resp: NextResponse) {
  resp.cookies.set({
    name: "elena_auth_token",
    value: "",
    maxAge: 0,
    path: "/",
    httpOnly: true,
    sameSite: "lax"
  });
  return resp;
}

export async function POST(req: NextRequest) {
  // This route logs out the user by expiring the auth cookie
  return expiredAuthCookie(NextResponse.json({ ok: true }));
}
