import type { Metadata } from "next";
import Link from "next/link";
import { PhoneSignIn } from "@/components/auth/phone-sign-in";

export const metadata: Metadata = { title: "Вход — okno" };

export default function SignInPage() {
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
            По номеру телефона. Пришлём код в SMS — пароль не нужен.
          </p>
          <PhoneSignIn />
        </div>
      </main>
    </div>
  );
}
