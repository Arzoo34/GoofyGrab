"use client";

import { useRef } from "react";

export function MagneticCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={`gg-card ${className}`}
      onMouseEnter={() => {
        document.documentElement.style.setProperty("--gg-cursor", "crosshair");
      }}
      onMouseLeave={() => {
        document.documentElement.style.setProperty("--gg-cursor", "auto");
      }}
    >
      {children}
    </div>
  );
}
