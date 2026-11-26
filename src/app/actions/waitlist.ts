"use server";

import { createClient } from "@/utils/supabase/server";

export type WaitlistState = {
  status: "idle" | "success" | "error";
  message: string;
  email?: string;
};

const SPECIALTIES = ["barber", "nails", "tutor", "other"] as const;

// Ожидаемые ошибки возвращаем значением, а не бросаем (Next.js: Error Handling).
export async function joinWaitlist(
  _prev: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const specialty = String(formData.get("specialty") ?? "");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Проверьте адрес почты.", email };
  }
  if (!SPECIALTIES.includes(specialty as (typeof SPECIALTIES)[number])) {
    return {
      status: "error",
      message: "Выберите, чем вы занимаетесь.",
      email,
    };
  }

  const supabase = createClient();
  const { error } = await supabase
    .from("waitlist")
    .insert({ email, specialty });

  // 23505 — такой email уже в списке: для человека это тоже успех
  if (error && error.code !== "23505") {
    console.error("waitlist insert failed", error);
    return {
      status: "error",
      message: "Не получилось сохранить. Попробуйте ещё раз через минуту.",
      email,
    };
  }

  return {
    status: "success",
    message: "Готово. Напишем, когда откроем доступ.",
  };
}
