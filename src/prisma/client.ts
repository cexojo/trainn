import { PrismaClient } from 'generated-prisma-client';
import { PrismaLibSql } from "@prisma/adapter-libsql";

const prismaClientSingleton = () => {
  const adapter = new PrismaLibSql({
    url: `${process.env.TURSO_DATABASE_URL}`,
    authToken: `${process.env.TURSO_AUTH_TOKEN}`,
  });
  const prisma = new PrismaClient({
    adapter/*,
    log: [
      { emit: 'event', level: 'query' },
      { emit: 'event', level: 'info' },
      { emit: 'event', level: 'warn' },
      { emit: 'event', level: 'error' },
    ],*/
  });
/*
  prisma.$on('query', (e) => {
    console.log('PRISMA QUERY:', e.query);
    console.log('PARAMS:', e.params);
    console.log('DURATION (ms):', e.duration);
  });
  prisma.$on('info', (e) => {
    console.log('PRISMA INFO:', e.message);
  });
  prisma.$on('warn', (e) => {
    console.warn('PRISMA WARN:', e.message);
  });
  prisma.$on('error', (e) => {
    console.error('PRISMA ERROR:', e);
  });*/

  return prisma;
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}
