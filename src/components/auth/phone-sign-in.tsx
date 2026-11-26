"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { BY_PHONE, normalizeByPhone } from "@/lib/phone";

const RESEND_AFTER = 60;

function errorText(error: {
  code?: string;
  status?: number;
  message?: string;
}) {
  if (error.status === 429)
    return "Слишком много попыток. Подождите несколько минут.";
  switch (error.code) {
    case "INVALID_PHONE_NUMBER":
      return "Нужен белорусский мобильный номер: A1, МТС или life:).";
    case "INVALID_OTP":
      return "Неверный код.";
    case "OTP_EXPIRED":
    case "OTP_NOT_FOUND":
      return "Код устарел. Запросите новый.";
    case "TOO_MANY_ATTEMPTS":
      return "Попытки закончились. Запросите новый код.";
    default:
      return "Не получилось. Попробуйте ещё раз.";
  }
}

export function PhoneSignIn() {
  const router = useRouter();
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    if (left <= 0) return;
    const t = setTimeout(() => setLeft(left - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);

  const full = normalizeByPhone(phone);

  async function sendCode() {
    setError("");
    if (!BY_PHONE.test(full)) {
      setError("Нужен белорусский мобильный номер: A1, МТС или life:).");
      return;
    }
    setPending(true);
    const { error } = await authClient.phoneNumber.sendOtp({
      phoneNumber: full,
    });
    setPending(false);
    if (error) return setError(errorText(error));
    setCode("");
    setStep("code");
    setLeft(RESEND_AFTER);
  }

  async function verify(value: string) {
    setError("");
    setPending(true);
    const { error } = await authClient.phoneNumber.verify({
      phoneNumber: full,
      code: value,
    });
    if (error) {
      setPending(false);
      setCode("");
      return setError(errorText(error));
    }
    router.push("/");
    router.refresh();
  }

  const input =
    "h-14 w-full rounded-full border border-white/25 bg-transparent px-6 text-lg text-white outline-none placeholder:text-smoke focus:border-white";
  const button =
    "h-14 w-full rounded-full bg-ember font-medium text-white hover:bg-white hover:text-black disabled:opacity-50";

  if (step === "phone") {
    return (
      <form
        className="mt-10 grid gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          sendCode();
        }}
      >
        <label htmlFor="phone" className="text-sm">
          Номер телефона
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute top-1/2 left-6 -translate-y-1/2 text-lg text-white">
            +375
          </span>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="29 123 45 67"
            required
            autoFocus
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={input + " pl-20"}
          />
        </div>
        {error && (
          <p role="alert" className="text-sm text-ember">
            {error}
          </p>
        )}
        <button type="submit" disabled={pending} className={button + " mt-3"}>
          {pending ? "Отправляем…" : "Получить код"}
        </button>
      </form>
    );
  }

  return (
    <form
      className="mt-10 grid gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        verify(code);
      }}
    >
      <label htmlFor="code" className="text-sm">
        Код из SMS на {full}
      </label>
      <input
        id="code"
        inputMode="numeric"
        autoComplete="one-time-code"
        pattern="\d{6}"
        maxLength={6}
        placeholder="000000"
        required
        autoFocus
        value={code}
        onChange={(e) => {
          const v = e.target.value.replace(/\D/g, "").slice(0, 6);
          setCode(v);
          if (v.length === 6) verify(v);
        }}
        className={input + " text-center tracking-[0.5em] tabular-nums"}
      />
      {error && (
        <p role="alert" className="text-sm text-ember">
          {error}
        </p>
      )}
      <button type="submit" disabled={pending} className={button + " mt-3"}>
        {pending ? "Проверяем…" : "Войти"}
      </button>
      <div className="mt-2 flex justify-between text-sm">
        <button
          type="button"
          className="hover:text-white"
          onClick={() => {
            setStep("phone");
            setError("");
          }}
        >
          Другой номер
        </button>
        <button
          type="button"
          disabled={left > 0 || pending}
          onClick={sendCode}
          className="hover:text-white disabled:text-smoke"
        >
          {left > 0 ? `Новый код через ${left} с` : "Отправить код ещё раз"}
        </button>
      </div>
    </form>
  );
}
