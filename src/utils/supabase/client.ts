"use client";

import { useMemo } from "react";
import { useSession } from "@clerk/nextjs";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

/** Supabase в Client Components с токеном текущей сессии Clerk. */
export function useSupabase() {
  const { session } = useSession();

  return useMemo(
    () =>
      createSupabaseClient(supabaseUrl, supabaseKey, {
        async accessToken() {
          return (await session?.getToken()) ?? null;
        },
      }),
    [session],
  );
}
