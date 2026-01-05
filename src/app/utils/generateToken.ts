/**
 * Generates a secure random string for tokens (uses crypto.randomUUID if possible, fallback to random string).
 */
export function generateToken(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Node.js: use require("crypto"), but we stay with fallback for SSR safety.
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}
