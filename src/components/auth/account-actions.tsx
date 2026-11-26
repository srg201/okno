"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { BrandIcon } from "@/components/auth/brand-icons";
import { authClient } from "@/lib/auth-client";
import { sendTestNotification, type NotifyState } from "@/app/actions/notify";

const pill =
  "flex h-12 items-center justify-center gap-3 rounded-full px-6 text-sm font-medium disabled:opacity-50";

export function LinkTelegram() {
  const [pending, setPending] = useState(false);
  return (
    <button
      type="button"
      disabled={pending}
      className={pill + " bg-ember text-white hover:bg-white hover:text-black"}
      onClick={async () => {
        setPending(true);
        const { error } = await authClient.linkSocial({
          provider: "telegram",
          callbackURL: "/account",
        });
        if (error) setPending(false);
      }}
    >
      <BrandIcon name="telegram" className="size-5" />
      {pending ? "Открываем…" : "Подключить Telegram"}
    </button>
  );
}

export function TestNotification() {
  const [state, action, pending] = useActionState<NotifyState>(
    sendTestNotification,
    { status: "idle", message: "" },
  );
  return (
    <form action={action} className="grid gap-3">
      <button
        disabled={pending}
        className={
          pill + " border border-white/25 text-white hover:border-white"
        }
      >
        {pending ? "Отправляем…" : "Прислать тестовое уведомление"}
      </button>
      {state.message && (
        <p
          role="status"
          className={
            "text-sm " +
            (state.status === "error" ? "text-ember" : "text-white")
          }
        >
          {state.message}
        </p>
      )}
    </form>
  );
}

export function SignOut() {
  const router = useRouter();
  return (
    <button
      type="button"
      className="text-sm hover:text-white"
      onClick={async () => {
        await authClient.signOut();
        router.push("/");
        router.refresh();
      }}
    >
      Выйти
    </button>
  );
}
