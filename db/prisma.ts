import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;
// Using interpolation to force type string
const connString = `${process.env.DATABASE_URL}`;

// Pretty much out-of-the-box neon & Prisma docs
const pool = new Pool({ connectionString: connString });
const adapter = new PrismaNeon(pool);

// We use this prisma from now on, instead of new PrismaClient blah blah blah
export const prisma = new PrismaClient({ adapter });