"use client";

import { useEffect, useRef } from "react";

// Фрагменты интерфейса Okno вместо фотографий. Двигаются за курсором.
export function HeroCards() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const onMove = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      root.querySelectorAll<HTMLElement>("[data-depth]").forEach((el) => {
        const d = Number(el.dataset.depth);
        el.style.translate = `${x * d}px ${y * d}px`;
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0">
      {/* Свободное окно */}
      <div
        data-depth="30"
        className="absolute top-[16%] left-[6%] hidden transition-[translate] duration-500 ease-out md:block"
      >
        <div className="float w-52 -rotate-6 rounded-2xl bg-white p-4 text-black shadow-2xl">
          <p className="text-xs text-neutral-500">Свободно сегодня</p>
          <p className="mt-1 text-4xl font-semibold tracking-tight">14:00</p>
          <div className="mt-3 rounded-lg bg-ember px-3 py-2 text-sm font-medium text-white">
            Записаться
          </div>
        </div>
      </div>

      {/* Напоминание */}
      <div
        data-depth="-40"
        className="absolute top-[14%] right-4 transition-[translate] duration-500 ease-out md:top-[12%] md:right-[5%]"
      >
        <div
          className="float w-52 rotate-[5deg] rounded-2xl border border-white/10 bg-neutral-900/90 p-4 text-ash shadow-2xl backdrop-blur md:w-60"
          style={{ animationDelay: "-2s" }}
        >
          <p className="text-xs text-smoke">Напоминание · Telegram</p>
          <p className="mt-2 text-sm leading-snug text-white">
            Завтра в 11:30 — стрижка. Придёте?
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <span className="rounded-md bg-white py-1.5 text-center font-medium text-black">
              Приду
            </span>
            <span className="rounded-md border border-white/20 py-1.5 text-center">
              Отменить
            </span>
          </div>
        </div>
      </div>

      {/* Неделя */}
      <div
        data-depth="20"
        className="absolute top-[22%] left-[40%] hidden transition-[translate] duration-500 ease-out lg:block"
      >
        <div
          className="float grid w-56 -rotate-3 grid-cols-7 gap-1 rounded-2xl border border-white/10 bg-neutral-900/90 p-3 shadow-2xl backdrop-blur"
          style={{ animationDelay: "-4s" }}
        >
          {Array.from({ length: 35 }, (_, i) => (
            <span
              key={i}
              className={
                "aspect-square rounded-sm " +
                ([3, 9, 16, 22, 30].includes(i)
                  ? "bg-ember"
                  : i % 7 === 6
                    ? "bg-transparent"
                    : "bg-white/15")
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
