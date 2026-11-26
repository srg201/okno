import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

/**
 * Supabase для Server Components, Server Actions и Route Handlers с публичным ключом:
 * доступ ограничен RLS-политиками (например, вставка в waitlist).
 * Вход и сессии — Better Auth (src/lib/auth.ts), не Supabase Auth.
 */
export function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });
}
