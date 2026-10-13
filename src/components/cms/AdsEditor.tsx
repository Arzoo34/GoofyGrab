"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AD_NETWORKS, AD_PLACEMENTS, AD_SIZES } from "@/lib/ads";
import type { AdCreative, AdNetwork, AdSettings } from "@/types/cms";

const field =
  "h-11 w-full border border-[var(--line)] bg-transparent px-3 text-sm text-paper outline-none focus:border-radio";
const label =
  "mb-1 block font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.16em] text-muted";

export function AdsEditor({ initial }: { initial: AdSettings }) {
  const router = useRouter();
  const [settings, setSettings] = useState(initial);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  function patchCreative(id: string, next: Partial<AdCreative>) {
    setSettings((s) => ({
      ...s,
      creatives: s.creatives.map((c) => (c.id === id ? { ...c, ...next } : c)),
    }));
  }

  async function save() {
    setBusy(true);
    setMsg("");
    const res = await fetch("/api/cms/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adSettings: settings }),
    });
    setBusy(false);
    if (!res.ok) {
      setMsg("Save failed");
      return;
    }
    setMsg("Ad settings saved. Reserved sizes unchanged.");
    router.refresh();
  }

  return (
    <div className="mt-10 space-y-8">
      <section className="grid gap-4 border border-[var(--line)] p-5 md:grid-cols-2">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={settings.enabled}
            onChange={(e) => setSettings((s) => ({ ...s, enabled: e.target.checked }))}
          />
          Ads enabled
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={settings.allowSponsored}
            onChange={(e) => setSettings((s) => ({ ...s, allowSponsored: e.target.checked }))}
          />
          Allow sponsored stories (must be labeled)
        </label>
        <div>
          <label className={label}>Default network</label>
          <select
            className={field}
            value={settings.defaultNetwork}
            onChange={(e) => setSettings((s) => ({ ...s, defaultNetwork: e.target.value as AdNetwork }))}
          >
            {AD_NETWORKS.map((n) => (
              <option key={n.id} value={n.id} className="bg-void">
                {n.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label}>House advertiser</label>
          <input
            className={field}
            value={settings.houseAdvertiser}
            onChange={(e) => setSettings((s) => ({ ...s, houseAdvertiser: e.target.value }))}
          />
        </div>
        <div>
          <label className={label}>AdSense publisher ID</label>
          <input
            className={field}
            value={settings.adsensePublisherId}
            onChange={(e) => setSettings((s) => ({ ...s, adsensePublisherId: e.target.value }))}
          />
        </div>
        <div>
          <label className={label}>GAM network code</label>
          <input
            className={field}
            value={settings.gamNetworkCode}
            onChange={(e) => setSettings((s) => ({ ...s, gamNetworkCode: e.target.value }))}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-[family-name:var(--font-syne)] text-2xl font-extrabold uppercase">
          Creatives by placement
        </h2>
        {AD_PLACEMENTS.map((placement) => {
          const creative = settings.creatives.find((c) => c.placement === placement);
          const size = AD_SIZES[placement];
          if (!creative) return null;
          return (
            <div key={placement} className="border border-[var(--line)] p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.16em] text-radio">
                  {placement} · reserved {size.width}×{size.height}
                </p>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={creative.enabled}
                    onChange={(e) => patchCreative(creative.id, { enabled: e.target.checked })}
                  />
                  Enabled
                </label>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <select
                  className={field}
                  value={creative.network}
                  onChange={(e) => patchCreative(creative.id, { network: e.target.value as AdNetwork })}
                >
                  {AD_NETWORKS.map((n) => (
                    <option key={n.id} value={n.id} className="bg-void">
                      {n.label}
                    </option>
                  ))}
                </select>
                <input
                  className={field}
                  placeholder="Advertiser"
                  value={creative.advertiser}
                  onChange={(e) => patchCreative(creative.id, { advertiser: e.target.value })}
                />
                <input
                  className={field}
                  placeholder="Headline"
                  value={creative.headline}
                  onChange={(e) => patchCreative(creative.id, { headline: e.target.value })}
                />
                <input
                  className={field}
                  placeholder="Destination URL"
                  value={creative.href}
                  onChange={(e) => patchCreative(creative.id, { href: e.target.value })}
                />
                <input
                  className={`${field} md:col-span-2`}
                  placeholder="Body"
                  value={creative.body}
                  onChange={(e) => patchCreative(creative.id, { body: e.target.value })}
                />
                <input
                  className={field}
                  placeholder="Network slot ID"
                  value={creative.slotId ?? ""}
                  onChange={(e) => patchCreative(creative.id, { slotId: e.target.value })}
                />
                <input
                  className={field}
                  placeholder="Network account ID"
                  value={creative.networkId ?? ""}
                  onChange={(e) => patchCreative(creative.id, { networkId: e.target.value })}
                />
              </div>
            </div>
          );
        })}
      </section>
      <button
        type="button"
        disabled={busy}
        onClick={() => void save()}
        className="h-11 bg-radio px-6 font-[family-name:var(--font-grotesk)] text-xs font-bold uppercase tracking-[0.14em] text-void disabled:opacity-50"
      >
        Save ad settings
      </button>
      {msg && <p className="text-sm text-radio">{msg}</p>}
    </div>
  );
}
