"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

// Фото внутри рамки едет медленнее страницы — лёгкий параллакс.
export function ParallaxImage({
  src,
  alt,
  sizes,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const tick = () => {
      const f = frame.current;
      const i = inner.current;
      if (f && i) {
        const r = f.getBoundingClientRect();
        const vh = window.innerHeight;
        if (r.bottom > 0 && r.top < vh) {
          // -1 … 1: от входа снизу до выхода сверху
          const p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
          i.style.translate = `0 ${(p * 8).toFixed(2)}%`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={frame}
      className={"relative overflow-hidden " + (className ?? "")}
    >
      <div ref={inner} className="absolute inset-x-0 -inset-y-[10%]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover transition-[filter,scale] duration-700 group-hover:scale-105 [@media(hover:hover)]:grayscale [@media(hover:hover)]:group-hover:grayscale-0"
        />
      </div>
    </div>
  );
}
