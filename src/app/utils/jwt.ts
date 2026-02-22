/**
 * Decodes the payload of a JWT token string (no verification).
 * Returns the payload object or null.
 */
export function decodeJWTPayload(token: string): any {
  console.log("[decodeJWTPayload] input token:", token);
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) {
    console.log("[decodeJWTPayload] invalid JWT format (parts):", parts);
    return null;
  }
  try {
    const payloadStr = atob(parts[1]);
    const payload = JSON.parse(payloadStr);
    console.log("[decodeJWTPayload] decoded payload:", payload);
    return payload;
  } catch (e) {
    console.log("[decodeJWTPayload] failed to decode. atob or JSON error:", e);
    return null;
  }
}

export function getUsernameFromCookie(): string {
  const now = new Date().toISOString();
  if (typeof window === "undefined") {
    console.log(`[getUsernameFromCookie] (${now}) typeof window is undefined -- SSR context`);
  }
  if (typeof document === "undefined") {
    console.log(`[getUsernameFromCookie] (${now}) typeof document is undefined -- SSR context`);
    return "";
  }
  if (!document.cookie) {
    console.log(`[getUsernameFromCookie] (${now}) document.cookie is empty; location:`, typeof window !== "undefined" ? window.location.href : "n/a");
    return "";
  }
  function getCookie(name: string) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }
  const token = getCookie("elena_auth_token");
  if (!token) {
    console.log("[getUsernameFromCookie] No elena_auth_token in cookie string:", document.cookie);
    return "";
  }
  try {
    console.log("[getUsernameFromCookie] Found elena_auth_token, calling decodeJWTPayload");
    const payload = decodeJWTPayload(token);

    // If username is missing, log payload for diagnostics (for dev/debug context).
    if (!(payload && payload.username)) {
      console.info("Decoded JWT missing username", payload);
    }

    // Fallback to .name for legacy tokens, otherwise strict
    return (
      payload?.username ||
      payload?.name || // added fallback for legacy tokens
      payload?.user ||
      payload?.email ||
      payload?.sub ||
      ""
    );
  } catch (err) {
    if (typeof console !== "undefined") {
      console.warn("Failed to decode JWT for username", err);
    }
    return "";
  }
}
