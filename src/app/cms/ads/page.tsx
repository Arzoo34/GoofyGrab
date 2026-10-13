import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { CmsNav } from "@/components/cms/CmsNav";
import { AdsEditor } from "@/components/cms/AdsEditor";
import { getAdSettings } from "@/cms/store";
import { AD_PLACEMENTS, AD_SIZES } from "@/lib/ads";

export const metadata: Metadata = { title: "Ad settings", robots: { index: false, follow: false } };

export default function CmsAdsPage() {
  const ads = getAdSettings();
  return (
    <SiteShell title="Ad settings">
      <main id="main" className="mx-auto max-w-[1440px] px-4 py-12 md:px-8">
        <CmsNav current="/cms/ads" />
        <h1 className="font-[family-name:var(--font-syne)] text-5xl font-extrabold uppercase tracking-tight">
          Advertisement settings
        </h1>
        <p className="mt-4 max-w-[64ch] text-[16px] leading-relaxed text-[#c8c8ce]">
          Network-agnostic slots for AdSense, Google Ad Manager, direct, house, and other.
          Every placement reserves exact pixels before creative loads. Sponsored stories stay labeled.
        </p>
        <ul className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {AD_PLACEMENTS.map((p) => (
            <li key={p} className="border border-[var(--line)] px-3 py-3 font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.12em]">
              {p}
              <span className="mt-1 block text-muted">
                {AD_SIZES[p].width}×{AD_SIZES[p].height} / {AD_SIZES[p].mobileWidth}×{AD_SIZES[p].mobileHeight} mobile
              </span>
            </li>
          ))}
        </ul>
        <AdsEditor initial={ads} />
      </main>
    </SiteShell>
  );
}
