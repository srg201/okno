"use client";

import { useActionState } from "react";
import { joinWaitlist, type WaitlistState } from "@/app/actions/waitlist";

const initialState: WaitlistState = { status: "idle", message: "" };

const specialties = [
  { value: "barber", label: "Барбер" },
  { value: "nails", label: "Маникюр" },
  { value: "tutor", label: "Репетитор" },
  { value: "other", label: "Другое" },
];

export function WaitlistForm() {
  const [state, formAction, pending] = useActionState(
    joinWaitlist,
    initialState,
  );

  if (state.status === "success") {
    return (
      <p
        aria-live="polite"
        className="border-t-4 border-white pt-4 text-2xl font-bold"
      >
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className="grid gap-6">
      <fieldset className="grid gap-3">
        <legend className="mb-3 text-sm">Чем вы занимаетесь</legend>
        <div className="grid grid-cols-2 gap-px bg-white/40 sm:grid-cols-4">
          {specialties.map((s, i) => (
            <label
              key={s.value}
              className="flex h-12 cursor-pointer items-center bg-black px-4 text-sm has-[:checked]:bg-white has-[:checked]:text-swiss"
            >
              <input
                type="radio"
                name="specialty"
                value={s.value}
                defaultChecked={i === 0}
                className="sr-only"
              />
              {s.label}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <label className="grid gap-2">
          <span className="text-sm">Электронная почта</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            defaultValue={state.email}
            placeholder="you@example.com"
            className="h-12 border-b-2 border-white bg-transparent text-lg outline-none placeholder:text-white/40 focus:border-swiss"
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="h-12 self-end bg-swiss px-6 font-bold text-white hover:bg-white hover:text-black disabled:opacity-60"
        >
          {pending ? "Отправляем…" : "Встать в лист ожидания"}
        </button>
      </div>
      {state.status === "error" && (
        <p aria-live="polite" className="text-sm font-bold text-swiss">
          {state.message}
        </p>
      )}
      <p className="text-xs text-white/60">
        Только письмо о запуске. Без рассылок, отписаться можно в один клик.
      </p>
    </form>
  );
}
