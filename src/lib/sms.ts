import "server-only";

/**
 * Отправка SMS через RocketSMS (rocketsms.by): HTTP API, логин — УНП из кабинета.
 * Пока ключей нет, в разработке код печатается в консоль сервера.
 */
export async function sendSms(phone: string, text: string) {
  const username = process.env.ROCKETSMS_USERNAME;
  const password = process.env.ROCKETSMS_PASSWORD;

  if (!username || !password) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "SMS не настроены: задайте ROCKETSMS_USERNAME и ROCKETSMS_PASSWORD",
      );
    }
    console.info(`[sms → ${phone}] ${text}`);
    return;
  }

  const body = new URLSearchParams({
    username,
    password,
    phone: phone.replace(/^\+/, ""),
    text,
  });
  const sender = process.env.ROCKETSMS_SENDER;
  if (sender) body.set("sender", sender);

  const res = await fetch("https://api.rocketsms.by/json/send", {
    method: "POST",
    body,
    signal: AbortSignal.timeout(10_000),
  });
  const data = (await res.json().catch(() => ({}))) as {
    id?: number;
    error?: number | string;
  };
  if (!res.ok || data.error !== undefined || !data.id) {
    throw new Error(`RocketSMS: ${res.status} ${data.error ?? "нет id"}`);
  }
}
