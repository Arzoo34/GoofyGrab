"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const field =
  "h-11 w-full border border-[var(--line)] bg-transparent px-3 text-sm text-paper outline-none focus:border-radio";
const label =
  "mb-1 block font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.16em] text-muted";

type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "select" | "number" | "email";
  options?: { value: string; label: string }[];
  required?: boolean;
  defaultValue?: string;
};

export function CollectionForm({
  endpoint,
  fields,
  submitLabel,
}: {
  endpoint: string;
  fields: Field[];
  submitLabel: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    setBusy(false);
    if (!res.ok) {
      setMsg(json.error || "Save failed");
      return;
    }
    setMsg("Saved.");
    e.currentTarget.reset();
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 border border-[var(--line)] p-5 md:grid-cols-2">
      {fields.map((f) => (
        <div key={f.name} className={f.type === "textarea" ? "md:col-span-2" : ""}>
          <label className={label} htmlFor={f.name}>
            {f.label}
          </label>
          {f.type === "textarea" ? (
            <textarea
              id={f.name}
              name={f.name}
              required={f.required}
              className={`${field} h-24 py-2`}
              defaultValue={f.defaultValue}
            />
          ) : f.type === "select" ? (
            <select id={f.name} name={f.name} className={field} defaultValue={f.defaultValue}>
              {f.options?.map((o) => (
                <option key={o.value} value={o.value} className="bg-void">
                  {o.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={f.name}
              name={f.name}
              type={f.type || "text"}
              required={f.required}
              className={field}
              defaultValue={f.defaultValue}
            />
          )}
        </div>
      ))}
      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={busy}
          className="h-11 bg-radio px-5 font-[family-name:var(--font-grotesk)] text-xs font-bold uppercase tracking-[0.14em] text-void disabled:opacity-50"
        >
          {submitLabel}
        </button>
        {msg && <p className="mt-2 text-sm text-radio">{msg}</p>}
      </div>
    </form>
  );
}
