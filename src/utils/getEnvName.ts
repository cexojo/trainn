/**
 * Returns a string identifier for the current environment,
 * usable for cache key namespacing (e.g. for Redis/CDN keys).
 * - On Vercel: 'production', 'preview', 'development' (from VERCEL_ENV)
 * - Else: NODE_ENV if present, otherwise 'local'
 */
export function getEnvName(): string {
  if (typeof process !== "undefined" && process.env) {
    return (
      process.env.VERCEL_ENV ||
      process.env.NODE_ENV ||
      "local"
    );
  }
  return "local";
}
