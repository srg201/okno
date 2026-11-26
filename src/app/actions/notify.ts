"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { notifyUser } from "@/lib/telegram";

export type NotifyState = { status: "idle" | "ok" | "error"; message: string };

export async function sendTestNotification(): Promise<NotifyState> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { status: "error", message: "Сначала войдите." };

  try {
    const sent = await notifyUser(
      session.user.id,
      "Это тестовое уведомление okno. Сюда будут приходить новые записи и отмены.",
    );
    return sent
      ? { status: "ok", message: "Отправили — проверьте Telegram." }
      : { status: "error", message: "Telegram не подключён." };
  } catch (e) {
    console.error(e);
    return {
      status: "error",
      message:
        "Telegram не принял сообщение. Проверьте, что бот не заблокирован и разрешено писать вам.",
    };
  }
}
