"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { NewsletterSettings, SiteSettings } from "@/types/cms";

const field =
  "h-11 w-full border border-[var(--line)] bg-transparent px-3 text-sm text-paper outline-none focus:border-radio";
const label =
  "mb-1 block font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.16em] text-muted";

export function SettingsEditor({
  site,
  newsletter,
}: {
  site: SiteSettings;
  newsletter: NewsletterSettings;
}) {
  const router = useRouter();
  const [settings, setSettings] = useState(site);
  const [nl, setNl] = useState(newsletter);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function save() {
    setBusy(true);
    setMsg("");
    const res = await fetch("/api/cms/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settings, newsletterSettings: nl }),
    });
    setBusy(false);
    if (!res.ok) {
      setMsg("Save failed");
      return;
    }
    setMsg("Settings saved.");
    router.refresh();
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <section className="space-y-3 border border-[var(--line)] p-5">
        <h2 className="font-[family-name:var(--font-syne)] text-2xl font-extrabold uppercase">Site</h2>
        <div>
          <label className={label}>Name</label>
          <input className={field} value={settings.name} onChange={(e) => setSettings({ ...settings, name: e.target.value })} />
        </div>
        <div>
          <label className={label}>Tagline</label>
          <input className={field} value={settings.tagline} onChange={(e) => setSettings({ ...settings, tagline: e.target.value })} />
        </div>
        <div>
          <label className={label}>Description</label>
          <textarea
            className={`${field} h-24 py-2`}
            value={settings.description}
            onChange={(e) => setSettings({ ...settings, description: e.target.value })}
          />
        </div>
        <div>
          <label className={label}>URL</label>
          <input className={field} value={settings.url} onChange={(e) => setSettings({ ...settings, url: e.target.value })} />
        </div>
      </section>
      <section className="space-y-3 border border-[var(--line)] p-5">
        <h2 className="font-[family-name:var(--font-syne)] text-2xl font-extrabold uppercase">Newsletter</h2>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={nl.enabled} onChange={(e) => setNl({ ...nl, enabled: e.target.checked })} />
          Enabled
        </label>
        <div>
          <label className={label}>From name</label>
          <input className={field} value={nl.fromName} onChange={(e) => setNl({ ...nl, fromName: e.target.value })} />
        </div>
        <div>
          <label className={label}>From email</label>
          <input className={field} value={nl.fromEmail} onChange={(e) => setNl({ ...nl, fromEmail: e.target.value })} />
        </div>
        <div>
          <label className={label}>Blurb</label>
          <textarea className={`${field} h-24 py-2`} value={nl.blurb} onChange={(e) => setNl({ ...nl, blurb: e.target.value })} />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={nl.doubleOptIn}
            onChange={(e) => setNl({ ...nl, doubleOptIn: e.target.checked })}
          />
          Double opt-in
        </label>
      </section>
      <div className="lg:col-span-2">
        <button
          type="button"
          disabled={busy}
          onClick={() => void save()}
          className="h-11 bg-radio px-6 font-[family-name:var(--font-grotesk)] text-xs font-bold uppercase tracking-[0.14em] text-void disabled:opacity-50"
        >
          Save settings
        </button>
        {msg && <p className="mt-3 text-sm text-radio">{msg}</p>}
      </div>
    </div>
  );
}
