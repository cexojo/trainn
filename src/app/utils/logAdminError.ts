import { decodeJWTPayload } from "./jwt";

/**
 * Reads the "elena_auth_token" cookie from the browser.
 */
function getAuthTokenFromCookie() {
  const cookieName = "elena_auth_token";
  const cookies = document.cookie.split(";").map(c => c.trim());
  for (const cookie of cookies) {
    if (cookie.startsWith(cookieName + "=")) {
      return cookie.substring(cookieName.length + 1);
    }
  }
  return null;
}

/**
 * Logs errors to the console only if the current user is an admin.
 * Usage: logAdminError(error, "context message")
 */
export function logAdminError(error: any, context?: string) {
  const token = getAuthTokenFromCookie();
  const payload = token ? decodeJWTPayload(token) : null;
  if (!payload || payload.role !== "admin") return;
  if (context) {
    console.log(context, error);
  } else {
    console.log(error);
  }
}
