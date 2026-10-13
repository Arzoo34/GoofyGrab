"use client";

import { useEffect, useState } from "react";
import { AD_SIZES, networkLabel, resolveCreative } from "@/lib/ads";
import type { AdPlacement } from "@/types/cms";
import { useAdSettings } from "./AdProvider";

type Props = {
  placement: AdPlacement;
  className?: string;
};

export function AdSlot({ placement, className = "" }: Props) {
  const settings = useAdSettings();
  const size = AD_SIZES[placement];
  const creative = resolveCreative(settings, placement);
  const isMobileOnly = placement === "MOBILE_ARTICLE";
  const isRail = placement === "HOME_SIDEBAR" || placement === "ARTICLE_SIDEBAR";
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const width = isMobile ? size.mobileWidth : size.width;
  const height = isMobile ? size.mobileHeight : size.height;

  if (!settings.enabled) {
    return (
      <div
        aria-hidden
        className={className}
        style={{
          width,
          maxWidth: "100%",
          height,
          minHeight: height,
        }}
      />
    );
  }

  return (
    <aside
      className={`ad-slot relative isolate overflow-hidden ${isMobileOnly ? "md:hidden" : ""} ${isRail ? "hidden md:grid" : ""} ${className}`}
      aria-label={`Advertisement ${size.label}`}
      data-ad-placement={placement}
      data-ad-network={creative?.network ?? settings.defaultNetwork}
      style={{
        width,
        maxWidth: "100%",
        height,
        minHeight: height,
        contain: "strict",
      }}
    >
      <span className="pointer-events-none absolute left-1 top-1 z-10 bg-void/80 px-1.5 py-[1px] font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.16em] text-muted">
        Advertisement · {width}×{height}
      </span>
      {creative ? (
        <a
          href={creative.href}
          className="flex h-full w-full flex-col items-center justify-center gap-1 px-4 pt-5 text-center hover:bg-paper/5"
          rel="sponsored nofollow"
        >
          <span className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.18em] text-radio">
            {networkLabel(creative.network)} · {creative.advertiser}
          </span>
          <span className="font-[family-name:var(--font-syne)] text-lg font-extrabold leading-tight">
            {creative.headline}
          </span>
          <span className="max-w-[48ch] text-xs text-muted">{creative.body}</span>
        </a>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-1 px-4 pt-4 text-center">
          <span className="font-[family-name:var(--font-grotesk)] text-xs text-muted">
            Reserved {size.label} · {settings.defaultNetwork}
          </span>
        </div>
      )}
    </aside>
  );
}

export function AdRail({
  placement,
  className = "",
}: {
  placement: AdPlacement;
  className?: string;
}) {
  return (
    <div
      className={`flex w-full justify-center py-6 ${className}`}
      data-ad-rail={placement}
    >
      <AdSlot placement={placement} />
    </div>
  );
}
