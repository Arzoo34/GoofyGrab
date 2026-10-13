"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { MediaAsset } from "@/types/cms";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ParallaxHero({ media, priority = false }: { media: MediaAsset; priority?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !wrap.current) return;
      const img = wrap.current.querySelector("img");
      if (!img) return;
      gsap.to(img, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    },
    { scope: wrap },
  );

  return (
    <figure ref={wrap} className="relative overflow-hidden">
      <div className="aspect-[16/9] w-full overflow-hidden bg-ink">
        <Image
          src={media.url}
          alt={media.alt}
          width={media.width}
          height={media.height}
          className="h-[115%] w-full object-cover"
          sizes="100vw"
          priority={priority}
          fetchPriority={priority ? "high" : undefined}
        />
      </div>
      {(media.caption || media.credit) && (
        <figcaption className="mt-3 flex flex-wrap justify-between gap-2 font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.12em] text-muted">
          <span>{media.caption}</span>
          {media.credit && <span>{media.credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}
