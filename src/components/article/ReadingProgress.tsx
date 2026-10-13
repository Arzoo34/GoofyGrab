"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("article-body");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const next = total <= 0 ? 100 : Math.min(100, Math.max(0, (scrolled / total) * 100));
      setP(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] bg-transparent"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(p)}
    >
      <div className="h-full bg-radio" style={{ width: `${p}%` }} />
    </div>
  );
}
