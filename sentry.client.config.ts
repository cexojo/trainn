import * as Sentry from "@sentry/nextjs";

// Reads SENTRY_DSN from env
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0, // Adjust for prod
  environment: process.env.NODE_ENV,
});
