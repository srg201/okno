"use client";

import { useEffect, useRef, useState } from "react";

// Счётчик 0 → 100 поверх страницы. Уезжает вверх сам по CSS-анимации
// (работает и без JS). Показывается один раз за сессию.
export function Preloader() {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("okno-preloader")) {
      if (ref.current) ref.current.style.display = "none";
      return;
    }
    sessionStorage.setItem("okno-preloader", "1");
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / 1500, 1);
      setCount(Math.round(100 * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="preloader fixed inset-0 z-50 flex flex-col justify-between bg-black p-4 text-ash md:p-8"
    >
      <p className="font-mono text-xs tracking-widest text-smoke">
        0123456789 0123456789
      </p>
      <div className="flex items-end justify-between">
        <span className="text-sm">okno</span>
        <span className="text-[22vw] leading-[0.8] font-semibold tracking-tighter text-white tabular-nums md:text-[14vw]">
          {count}
        </span>
      </div>
    </div>
  );
}
