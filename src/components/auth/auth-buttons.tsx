"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function AuthButtons() {
  const router = useRouter();
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
    <div className="flex items-center gap-4 text-sm">
      <span className="hidden tabular-nums sm:inline">
        {session.user.phoneNumber}
      </span>
      <button
        className="flex h-11 items-center rounded-full border border-white px-5 hover:bg-white hover:text-black"
        onClick={async () => {
          await authClient.signOut();
          router.refresh();
        }}
      >
        Выйти
      </button>
    </div>
  );
}
