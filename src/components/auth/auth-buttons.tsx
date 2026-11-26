"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export function AuthButtons() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <span className="h-11" />;

  if (!session) {
    return (
      <Link
        href="/sign-in"
        className="flex h-11 items-center rounded-full border border-white px-5 text-sm hover:bg-white hover:text-black"
      >
        Войти
      </Link>
    );
  }

  return (
    <Link
      href="/account"
      className="flex h-11 items-center rounded-full border border-white px-5 text-sm hover:bg-white hover:text-black"
    >
      Кабинет
    </Link>
  );
}
