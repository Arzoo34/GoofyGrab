"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

export function NewsletterForm({ blurb }: { blurb: string }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <form
      className="mt-8 max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
        if (!email.includes("@")) return;
        track({ name: "newsletter_intent", source: "footer" });
        setDone(true);
      }}
    >
      <p className="font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.18em] text-radio">
        Morning grab
      </p>
      <p className="mt-2 text-sm leading-relaxed text-[#c8c8ce]">{blurb}</p>
      {done ? (
        <p className="mt-4 border border-radio bg-radio px-3 py-3 font-[family-name:var(--font-grotesk)] text-sm font-semibold text-void" role="status">
          You are on the list. We will not shout.
        </p>
      ) : (
        <div className="mt-4 flex">
          <label className="sr-only" htmlFor="nl-email">
            Email
          </label>
          <input
            id="nl-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@newsroom.tld"
            className="h-12 min-h-12 flex-1 border border-[var(--line)] bg-transparent px-3 text-sm text-paper outline-none placeholder:text-muted focus:border-radio"
          />
          <button
            type="submit"
            className="h-12 cursor-pointer bg-radio px-5 font-[family-name:var(--font-grotesk)] text-xs font-bold uppercase tracking-[0.14em] text-void hover:bg-volt"
          >
            Subscribe
          </button>
        </div>
      )}
    </form>
  );
}
