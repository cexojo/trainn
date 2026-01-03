/**
 * Decodes the payload of a JWT token string (no verification).
 * Returns the payload object or null.
 */
export function decodeJWTPayload(token: string): any {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    return JSON.parse(atob(parts[1]));
  } catch {
    return null;
  }
}
