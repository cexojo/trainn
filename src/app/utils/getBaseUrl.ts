/**
 * Returns the application base URL.
 * Priority:
 *  1. NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL env var (add https:// if missing)
 *  2. Fallback: http://localhost:3000
 */
export function getBaseUrl(): string {
  let baseUrl = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
  if (baseUrl) {
    if (!/^https?:\/\//.test(baseUrl)) {
      baseUrl = "https://" + baseUrl;
    }
    // Remove trailing slash(es)
    baseUrl = baseUrl.replace(/\/+$/, "");
    return baseUrl;
  }
  return "http://localhost:3000";
}
