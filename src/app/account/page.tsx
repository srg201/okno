import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import {
  LinkTelegram,
  SignOut,
  TestNotification,
} from "@/components/auth/account-actions";
import { auth } from "@/lib/auth";
import { enabled } from "@/lib/auth-providers";

export const metadata: Metadata = { title: "Кабинет — okno" };

const providerNames: Record<string, string> = {
  telegram: "Telegram",
  google: "Google",
  apple: "Apple",
};

async function Account() {
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });
  if (!session) redirect("/sign-in");

  const accounts = await auth.api.listUserAccounts({ headers: h });
  const linked = accounts.map((a) => a.providerId);
  const hasTelegram = linked.includes("telegram");

  return (
    <>
      <h1 className="text-5xl font-semibold tracking-tight text-white">
        {session.user.name}
      </h1>
      <p className="mt-3">
        Вход через: {linked.map((p) => providerNames[p] ?? p).join(", ")}
      </p>

      <section className="mt-12 border-t border-white/15 pt-6">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Уведомления
        </h2>
        {hasTelegram ? (
          <>
            <p className="mt-2 mb-6">
              Новые записи и отмены будут приходить в Telegram.
            </p>
            <TestNotification />
          </>
        ) : enabled.telegram ? (
          <>
            <p className="mt-2 mb-6">
              Подключите Telegram — туда будут приходить новые записи и отмены.
            </p>
            <LinkTelegram />
          </>
        ) : (
          <p className="mt-2">Вход через Telegram ещё не настроен.</p>
        )}
      </section>

      <div className="mt-12 border-t border-white/15 pt-6">
        <SignOut />
      </div>
    </>
  );
}

export default function AccountPage() {
  return (
    <div className="flex min-h-svh flex-col bg-black px-4 text-ash md:px-8">
      <header className="flex h-16 items-center">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-white"
        >
          okno
        </Link>
      </header>
      <main className="mx-auto w-full max-w-xl flex-1 py-16">
        <Suspense fallback={<p>Загружаем…</p>}>
          <Account />
        </Suspense>
      </main>
    </div>
  );
}
