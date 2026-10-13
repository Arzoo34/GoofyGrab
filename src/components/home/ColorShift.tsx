"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ColorShift({
  children,
  from = "#0B0B0F",
  to,
}: {
  children: React.ReactNode;
  from?: string;
  to: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !ref.current) return;
      gsap.fromTo(
        ref.current,
        { backgroundColor: from },
        {
          backgroundColor: to,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            end: "top 20%",
            scrub: 0.8,
          },
        },
      );
    },
    { scope: ref, dependencies: [from, to] },
  );

  return (
    <div ref={ref} style={{ backgroundColor: from }}>
      {children}
    </div>
  );
}
