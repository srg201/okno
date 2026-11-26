import "server-only";
import { auth } from "@clerk/nextjs/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

/**
 * Supabase для Server Components, Server Actions и Route Handlers.
 * Вход — через Clerk: токен сессии Clerk передаётся в Supabase,
 * RLS-политики читают пользователя из auth.jwt()->>'sub'.
 */
export function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseKey, {
    async accessToken() {
      return (await auth()).getToken();
    },
  });
}
