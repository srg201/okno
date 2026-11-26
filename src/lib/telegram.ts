import "server-only";
import { pool } from "@/lib/db";

/**
 * Сообщение от бота пользователю. Писать можно тем, кто вошёл или привязал Telegram
 * с разрешением telegram:bot_access, — иначе Telegram вернёт 403.
 */
export async function sendTelegramMessage(chatId: string, text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) throw new Error("TELEGRAM_BOT_TOKEN не задан");

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    signal: AbortSignal.timeout(10_000),
  });
  const data = (await res.json()) as { ok: boolean; description?: string };
  if (!data.ok) throw new Error(`Telegram: ${data.description ?? res.status}`);
}

/** Telegram id пользователя okno, если он подключил Telegram. */
export async function telegramChatId(userId: string): Promise<string | null> {
  const { rows } = await pool.query<{ accountId: string }>(
    `select "accountId" from "account" where "userId" = $1 and "providerId" = 'telegram' limit 1`,
    [userId],
  );
  return rows[0]?.accountId ?? null;
}

/** Уведомить пользователя (новая заявка, отмена и т. д.). false — Telegram не подключён. */
export async function notifyUser(userId: string, text: string) {
  const chatId = await telegramChatId(userId);
  if (!chatId) return false;
  await sendTelegramMessage(chatId, text);
  return true;
}

/** Экранирование для parse_mode HTML. */
export const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
