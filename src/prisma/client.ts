import { PrismaClient } from 'generated-prisma-client';
import { withAccelerate } from '@prisma/extension-accelerate';
import { env } from 'prisma/config';

// Singleton Prisma client with Accelerate and custom env config.
// Note: In Next.js *API* environments, the globalThis trick avoids re-creating client during hot reloads.
// In scripts, you'll just import directly.
const globalForPrisma = globalThis as unknown as { prisma?: any };

// The extended Prisma client with Accelerate extension has extra properties.
// Assign to global using `any` type, but preserve type of exported variable.
const _prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    accelerateUrl: env('PRISMA_DATABASE_URL'),
  }).$extends(withAccelerate());

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = _prisma;

const prisma: ReturnType<typeof _prisma> = _prisma;

export default prisma;
