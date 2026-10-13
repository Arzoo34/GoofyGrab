"use client";

import { useState } from "react";
import type { MediaAsset } from "@/types/cms";

export function MediaUploader({ initial }: { initial: MediaAsset[] }) {
  const [items, setItems] = useState(initial);
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [caption, setCaption] = useState("");
  const [credit, setCredit] = useState("");
  const [width, setWidth] = useState(1600);
  const [height, setHeight] = useState(900);
  const [filename, setFilename] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState("");

  const field =
    "h-11 w-full border border-[var(--line)] bg-transparent px-3 text-sm outline-none focus:border-radio";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    let res: Response;
    if (file) {
      const form = new FormData();
      form.set("file", file);
      form.set("alt", alt);
      form.set("caption", caption);
      form.set("credit", credit);
      form.set("width", String(width));
      form.set("height", String(height));
      res = await fetch("/api/cms/media", { method: "POST", body: form });
    } else {
      res = await fetch("/api/cms/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, alt, caption, credit, width, height, filename }),
      });
    }
    const data = await res.json();
    if (!res.ok) {
      setMsg(data.error || "Upload failed");
      return;
    }
    setItems((prev) => [data.media, ...prev]);
    setUrl("");
    setAlt("");
    setCaption("");
    setCredit("");
    setFilename("");
    setFile(null);
    setMsg("Saved to library. Width and height are locked so ads and images never shift.");
  }

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[360px_minmax(0,1fr)]">
      <form onSubmit={submit} className="space-y-3 border border-[var(--line)] p-5">
        <p className="font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.16em] text-radio">
          Add asset
        </p>
        <input
          className={field}
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          aria-label="Upload image file"
        />
        <input
          className={field}
          placeholder="Or paste image URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required={!file}
        />
        <input className={field} required placeholder="Alt text" value={alt} onChange={(e) => setAlt(e.target.value)} />
        <input className={field} placeholder="Filename" value={filename} onChange={(e) => setFilename(e.target.value)} />
        <input className={field} placeholder="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} />
        <input className={field} placeholder="Credit" value={credit} onChange={(e) => setCredit(e.target.value)} />
        <div className="grid grid-cols-2 gap-2">
          <input
            className={field}
            type="number"
            min={1}
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            aria-label="Width"
          />
          <input
            className={field}
            type="number"
            min={1}
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            aria-label="Height"
          />
        </div>
        <button
          type="submit"
          className="h-11 w-full bg-radio font-[family-name:var(--font-grotesk)] text-xs font-bold uppercase tracking-[0.14em] text-void"
        >
          Save media
        </button>
        {msg && <p className="text-sm text-radio">{msg}</p>}
      </form>
      <ul className="grid gap-4 sm:grid-cols-2">
        {items.map((m) => (
          <li key={m.id} className="border border-[var(--line)] p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={m.url} alt={m.alt} width={m.width} height={m.height} className="w-full" />
            <p className="mt-2 font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.12em] text-muted">
              {m.filename} · {m.width}×{m.height}
            </p>
            <p className="text-sm">{m.alt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
