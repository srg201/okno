import Link from "next/link";
import { Suspense } from "react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

const nav = [
  { href: "#how", label: "Как работает" },
  { href: "#features", label: "Возможности" },
  { href: "#pricing", label: "Цены" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 text-white mix-blend-difference">
      <div className="flex h-16 items-center justify-between gap-6 px-4 md:px-8">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          okno
        </Link>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="hover:opacity-60">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          {/* <Show> читает запрос — при cacheComponents нужен <Suspense> */}
          <Suspense>
            <Show when="signed-out">
              <SignInButton>
                <button className="h-11 px-3 text-sm hover:opacity-60">
                  Войти
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="hidden h-11 rounded-full border border-white px-5 text-sm hover:bg-white hover:text-black sm:block">
                  Регистрация
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </Suspense>
        </div>
      </div>
    </header>
  );
}
