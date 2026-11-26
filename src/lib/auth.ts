import "server-only";
import { betterAuth, type BetterAuthOptions } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { genericOAuth } from "better-auth/plugins";
import { pool } from "@/lib/db";
import { appleClientSecret, enabled, readIdToken } from "@/lib/auth-providers";

const socialProviders: BetterAuthOptions["socialProviders"] = {};

if (enabled.google) {
  socialProviders.google = {
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    prompt: "select_account",
  };
}

if (enabled.apple) {
  socialProviders.apple = {
    clientId: process.env.APPLE_CLIENT_ID!,
    clientSecret: await appleClientSecret(),
  };
}

// Telegram — официальный OpenID Connect (core.telegram.org/bots/telegram-login).
// accountId = числовой id пользователя в Telegram: по нему бот пишет уведомления.
const telegram = enabled.telegram
  ? genericOAuth({
      config: [
        {
          providerId: "telegram",
          name: "Telegram",
          discoveryUrl:
            "https://oauth.telegram.org/.well-known/openid-configuration",
          clientId: process.env.TELEGRAM_CLIENT_ID!,
          clientSecret: process.env.TELEGRAM_CLIENT_SECRET!,
          authentication: "basic",
          scopes: ["openid", "profile", "telegram:bot_access"],
          pkce: true,
          // У Telegram нет UserInfo и email — профиль берём из id_token
          getUserInfo: async (tokens) => {
            if (!tokens.idToken) return null;
            const c = readIdToken(tokens.idToken);
            const id = String(c.id ?? c.sub);
            return {
              sub: c.sub as string,
              id,
              name:
                (c.name as string) ||
                (c.preferred_username as string) ||
                "Telegram",
              image: c.picture as string | undefined,
              email: `tg${id}@telegram.okno.invalid`,
              emailVerified: false,
              username: c.preferred_username,
            };
          },
          accountSubject: ({ profile }) => String(profile.id ?? profile.sub),
        },
      ],
    })
  : null;

export const auth = betterAuth({
  database: pool,
  telemetry: { enabled: false },
  trustedOrigins: enabled.apple ? ["https://appleid.apple.com"] : [],
  session: {
    expiresIn: 60 * 60 * 24 * 60, // 60 дней
    updateAge: 60 * 60 * 24,
  },
  account: {
    accountLinking: {
      enabled: true,
      // Google и Apple сами подтверждают почту — склеиваем аккаунты с одним email
      trustedProviders: ["google", "apple"],
      // к Google-аккаунту можно привязать Telegram, у которого почты нет
      allowDifferentEmails: true,
    },
  },
  rateLimit: { enabled: true, storage: "database" },
  socialProviders,
  plugins: [...(telegram ? [telegram] : []), nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
