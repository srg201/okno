import Link from "next/link";
import { Suspense } from "react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold">
          Okno
        </Link>
        <nav className="flex items-center gap-2">
          {/* <Show> читает запрос — при cacheComponents нужен <Suspense> */}
          <Suspense>
            <Show when="signed-out">
              <SignInButton>
                <Button variant="ghost" className="h-11">
                  Войти
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button className="h-11">Регистрация</Button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </Suspense>
        </nav>
      </div>
    </header>
  );
}
