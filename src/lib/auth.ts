import "server-only";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { phoneNumber } from "better-auth/plugins";
import { Pool } from "pg";
import { BY_PHONE } from "@/lib/phone";
import { sendSms } from "@/lib/sms";

// Пользователи и сессии лежат в той же базе Supabase (Postgres), таблицы — в миграции 0002.
export const auth = betterAuth({
  database: new Pool({ connectionString: process.env.DATABASE_URL }),
  telemetry: { enabled: false },
  session: {
    expiresIn: 60 * 60 * 24 * 60, // 60 дней
    updateAge: 60 * 60 * 24,
  },
  rateLimit: {
    enabled: true,
    storage: "database",
    customRules: {
      // каждая SMS стоит денег: не больше 3 кодов в 10 минут с одного IP
      "/phone-number/send-otp": { window: 600, max: 3 },
      "/phone-number/verify": { window: 60, max: 10 },
    },
  },
  plugins: [
    phoneNumber({
      otpLength: 6,
      expiresIn: 300,
      allowedAttempts: 3,
      phoneNumberValidator: (phone) => BY_PHONE.test(phone),
      sendOTP: async ({ phoneNumber, code }) => {
        await sendSms(phoneNumber, `Код для входа в okno: ${code}`);
      },
      // первый вход по номеру сразу создаёт аккаунт
      signUpOnVerification: {
        getTempEmail: (phone) =>
          `${phone.replace(/\D/g, "")}@phone.okno.invalid`,
        getTempName: (phone) => phone,
      },
    }),
    nextCookies(), // последним: ставит cookie из Server Actions
  ],
});

export type Session = typeof auth.$Infer.Session;
