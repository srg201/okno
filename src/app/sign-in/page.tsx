import type { Metadata } from "next";
import Link from "next/link";
import { SocialSignIn } from "@/components/auth/social-sign-in";
import { enabled, type ProviderId } from "@/lib/auth-providers";

export const metadata: Metadata = { title: "Вход — okno" };

const order: ProviderId[] = ["telegram", "google", "apple"];

export default function SignInPage() {
  const providers = order.filter((p) => enabled[p]);

  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-black px-4 text-ash md:px-8">
      <div
        aria-hidden
        className="glow absolute -top-1/3 left-1/3 size-[60vmax] rounded-full bg-[radial-gradient(circle,#ff4f00_0%,#7a1d00_35%,transparent_70%)] opacity-50 blur-3xl"
      />
      <header className="relative flex h-16 items-center">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-white"
        >
          okno
        </Link>
      </header>
      <main className="relative flex flex-1 items-center justify-center py-16">
        <div className="w-full max-w-sm">
          <h1 className="text-5xl font-semibold tracking-tight text-white">
            Вход
          </h1>
          <p className="mt-3">
            Первый вход сразу создаёт аккаунт. Через Telegram удобнее всего:
            туда будут приходить новые записи и отмены.
          </p>
          <SocialSignIn providers={providers} />
        </div>
      </main>
    </div>
  );
}
