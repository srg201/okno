"use client";

import { useEffect, useRef, useState } from "react";

// Слова загораются по одному, пока абзац проезжает через экран.
export function ScrollWords({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);
  const words = text.split(" ");

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh * 0.85 - r.top) / (r.height + vh * 0.35);
      setProgress(Math.max(0, Math.min(1, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const lit = Math.round(progress * words.length);

  return (
    <p
      ref={ref}
      className="text-4xl leading-[1.05] font-semibold tracking-tight md:text-7xl"
    >
      {words.map((w, i) => (
        <span
          key={i}
          className={
            "transition-colors duration-300 " +
            (i < lit ? "text-white" : "text-smoke")
          }
        >
          {w}{" "}
        </span>
      ))}
    </p>
  );
}
