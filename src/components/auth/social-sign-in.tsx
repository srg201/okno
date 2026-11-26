"use client";

import { useState } from "react";
import { BrandIcon } from "@/components/auth/brand-icons";
import { authClient } from "@/lib/auth-client";

type Provider = "telegram" | "google" | "apple";

const labels: Record<Provider, string> = {
  telegram: "Войти через Telegram",
  google: "Войти через Google",
  apple: "Войти через Apple",
};

export function SocialSignIn({
  providers,
  callbackURL = "/account",
}: {
  providers: Provider[];
  callbackURL?: string;
}) {
  const [pending, setPending] = useState<Provider | null>(null);
  const [error, setError] = useState("");

  async function go(provider: Provider) {
    setError("");
    setPending(provider);
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL,
      errorCallbackURL: "/sign-in",
    });
    if (error) {
      setPending(null);
      setError("Не получилось открыть вход. Попробуйте ещё раз.");
    }
  }

  if (providers.length === 0) {
    return (
      <p className="mt-10 rounded-3xl border border-white/15 p-6 text-sm">
        Способы входа ещё не настроены: заполните ключи Telegram, Google или
        Apple в <code className="text-white">.env.local</code>.
      </p>
    );
  }

  return (
    <div className="mt-10 grid gap-3">
      {providers.map((p, i) => (
        <button
          key={p}
          type="button"
          disabled={pending !== null}
          onClick={() => go(p)}
          className={
            "flex h-14 w-full items-center justify-center gap-3 rounded-full font-medium disabled:opacity-50 " +
            (i === 0
              ? "bg-ember text-white hover:bg-white hover:text-black"
              : "border border-white/25 text-white hover:border-white")
          }
        >
          <BrandIcon name={p} className="size-5" />
          {pending === p ? "Открываем…" : labels[p]}
        </button>
      ))}
      {error && (
        <p role="alert" className="text-sm text-ember">
          {error}
        </p>
      )}
    </div>
  );
}
