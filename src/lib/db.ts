import "server-only";
import { Pool } from "pg";

// Прямое подключение к Postgres Supabase (Session pooler). Используют Better Auth и серверный код.
const globalForPg = globalThis as unknown as { pgPool?: Pool };

export const pool =
  globalForPg.pgPool ??
  new Pool({ connectionString: process.env.DATABASE_URL, max: 5 });

if (process.env.NODE_ENV !== "production") globalForPg.pgPool = pool;
