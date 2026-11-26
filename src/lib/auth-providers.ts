import "server-only";
import { importPKCS8, SignJWT } from "jose";

/** Какие способы входа включены — по заполненным переменным окружения. */
export const enabled = {
  telegram: Boolean(
    process.env.TELEGRAM_CLIENT_ID && process.env.TELEGRAM_CLIENT_SECRET,
  ),
  google: Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
  ),
  apple: Boolean(
    process.env.APPLE_CLIENT_ID &&
    process.env.APPLE_TEAM_ID &&
    process.env.APPLE_KEY_ID &&
    process.env.APPLE_PRIVATE_KEY,
  ),
};

export type ProviderId = keyof typeof enabled;

/**
 * Apple вместо client secret принимает JWT, подписанный ключом .p8.
 * Срок жизни — до 6 месяцев, поэтому подписываем при старте сервера.
 */
export async function appleClientSecret() {
  const key = await importPKCS8(
    process.env.APPLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    "ES256",
  );
  return new SignJWT({})
    .setProtectedHeader({ alg: "ES256", kid: process.env.APPLE_KEY_ID! })
    .setIssuer(process.env.APPLE_TEAM_ID!)
    .setSubject(process.env.APPLE_CLIENT_ID!)
    .setAudience("https://appleid.apple.com")
    .setIssuedAt()
    .setExpirationTime("180d")
    .sign(key);
}

/** Полезная нагрузка id_token. Подпись, iss, aud и nonce уже проверил Better Auth. */
export function readIdToken(idToken: string): Record<string, unknown> {
  const payload = idToken.split(".")[1];
  return JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
}
