import Link from "next/link";
import { Suspense } from "react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

const nav = [
  { href: "#how", label: "Как это работает" },
  { href: "#features", label: "Возможности" },
  { href: "#pricing", label: "Цены" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-black">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-4 md:px-8">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Okno
        </Link>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-swiss">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {/* <Show> читает запрос — при cacheComponents нужен <Suspense> */}
          <Suspense>
            <Show when="signed-out">
              <SignInButton>
                <button className="h-11 px-3 text-sm hover:text-swiss">
                  Войти
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="hidden h-11 bg-black px-4 text-sm text-white hover:bg-swiss sm:block">
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
