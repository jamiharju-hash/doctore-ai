import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prismaLogLevels =
  process.env.PRISMA_LOG_LEVELS?.split(',')
    .map((level) => level.trim())
    .filter(Boolean) ??
  (process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error']);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: prismaLogLevels as ('query' | 'info' | 'warn' | 'error')[],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
