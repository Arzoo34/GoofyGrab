"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";

export function PageTracker({ title }: { title: string }) {
  const path = usePathname();
  const start = useRef(Date.now());
  const seen = useRef(new Set<number>());

  useEffect(() => {
    start.current = Date.now();
    seen.current = new Set();
    track({ name: "page_view", path, title });

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = Math.round((window.scrollY / max) * 100);
      ([25, 50, 75, 100] as const).forEach((d) => {
        if (pct >= d && !seen.current.has(d)) {
          seen.current.add(d);
          track({ name: "scroll_depth", path, depth: d });
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      const seconds = Math.round((Date.now() - start.current) / 1000);
      if (seconds > 4) track({ name: "reading_time", path, seconds });
    };
  }, [path, title]);

  return null;
}
