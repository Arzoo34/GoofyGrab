"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  skew?: number;
};

export function Reveal({
  children,
  className = "",
  y = 28,
  delay = 0,
  skew = 2.5,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !ref.current) return;
      gsap.from(ref.current, {
        opacity: 0,
        y,
        skewY: skew,
        duration: 0.7,
        delay,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function StaggerReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !ref.current) return;
      const items = ref.current.querySelectorAll("[data-stagger]");
      gsap.from(items, {
        opacity: 0,
        y: 24,
        skewY: 2,
        duration: 0.55,
        stagger: 0.07,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
