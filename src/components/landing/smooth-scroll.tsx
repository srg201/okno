"use client";

import Lenis from "lenis";
import { useEffect } from "react";

// Инерционный скролл всей страницы. Якорные ссылки (#how и т. д.) тоже едут плавно.
// Если в системе отключена анимация — остаётся обычный скролл.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      anchors: true,
    });
    return () => lenis.destroy();
  }, []);

  return null;
}
