import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { CmsNav } from "@/components/cms/CmsNav";
import { SettingsEditor } from "@/components/cms/SettingsEditor";
import { getNewsletterSettings, getSettings } from "@/cms/store";

export const metadata: Metadata = { title: "Site settings", robots: { index: false, follow: false } };

export default function CmsSettingsPage() {
  return (
    <SiteShell title="Site settings">
      <main id="main" className="mx-auto max-w-[1440px] px-4 py-12 md:px-8">
        <CmsNav current="/cms/settings" />
        <h1 className="mb-8 font-[family-name:var(--font-syne)] text-5xl font-extrabold uppercase tracking-tight">
          Site & newsletter
        </h1>
        <SettingsEditor site={getSettings()} newsletter={getNewsletterSettings()} />
      </main>
    </SiteShell>
  );
}
