"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

type Props = {
  text: string;
  as?: "h1" | "h2" | "p";
  className?: string;
};

export function Headline({ text, as: Tag = "h1", className = "" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      gsap.from(el.querySelectorAll(".gg-word"), {
        yPercent: 110,
        rotateZ: 4,
        duration: 0.85,
        stagger: 0.045,
        ease: "expo.out",
        delay: 0.08,
      });
    },
    { scope: ref, dependencies: [text] },
  );

  return (
    <Tag ref={ref as never} className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="mr-[0.22em] inline-block overflow-hidden align-bottom"
        >
          <span className="gg-word inline-block">{word}</span>
        </span>
      ))}
    </Tag>
  );
}
