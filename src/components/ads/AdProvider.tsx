"use client";

import { createContext, useContext } from "react";
import type { AdSettings } from "@/types/cms";

const AdContext = createContext<AdSettings | null>(null);

export function AdProvider({
  settings,
  children,
}: {
  settings: AdSettings;
  children: React.ReactNode;
}) {
  return <AdContext.Provider value={settings}>{children}</AdContext.Provider>;
}

export function useAdSettings(): AdSettings {
  const ctx = useContext(AdContext);
  if (!ctx) {
    throw new Error("useAdSettings must be used within AdProvider");
  }
  return ctx;
}
