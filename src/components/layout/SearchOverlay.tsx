"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { Search, X } from "lucide-react";
import { track } from "@/lib/analytics";
import type { HydratedArticle } from "@/types/cms";

type IndexItem = Pick<
  HydratedArticle,
  "title" | "slug" | "excerpt" | "category" | "author" | "tags"
>;

type Props = {
  open: boolean;
  onClose: () => void;
  articles: IndexItem[];
};

export function SearchOverlay({ open, onClose, articles }: Props) {
  const [q, setQ] = useState("");
  const [desk, setDesk] = useState("all");
  const panel = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const desks = useMemo(() => {
    const map = new Map<string, string>();
    articles.forEach((a) => map.set(a.category.slug, a.category.name));
    return [...map.entries()];
  }, [articles]);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return articles
      .filter((a) => (desk === "all" ? true : a.category.slug === desk))
      .filter((a) => {
        if (!needle) return true;
        const hay = [
          a.title,
          a.excerpt,
          a.category.name,
          a.author.name,
          ...a.tags.map((t) => t.name),
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(needle);
      })
      .slice(0, needle ? 8 : 6);
  }, [q, desk, articles]);

  useEffect(() => {
    if (!open || !panel.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = panel.current.querySelectorAll("[data-search-item]");
    if (reduce) {
      input.current?.focus();
      return;
    }
    const tl = gsap.timeline();
    tl.fromTo(
      panel.current,
      { yPercent: -8, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.45, ease: "expo.out" },
    ).from(
      items,
      { y: 16, opacity: 0, stagger: 0.04, duration: 0.35, ease: "power2.out" },
      "-=0.2",
    );
    input.current?.focus();
    return () => {
      tl.kill();
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (!open) {
      setQ("");
      setDesk("all");
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] bg-void/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Search Goofygrab"
    >
      <div ref={panel} className="mx-auto flex min-h-full max-w-3xl flex-col px-5 pt-24 md:pt-32">
        <div className="flex items-center gap-3 border-b-2 border-radio pb-3" data-search-item>
          <Search className="size-6 shrink-0 text-radio" aria-hidden />
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search stories, authors, tags"
            className="w-full bg-transparent font-[family-name:var(--font-syne)] text-[28px] font-bold tracking-tight text-paper outline-none placeholder:text-muted md:text-[40px]"
            aria-label="Search stories"
          />
          <button
            type="button"
            onClick={onClose}
            className="grid size-11 place-items-center border border-[var(--line)] text-paper hover:bg-radio hover:text-void"
            aria-label="Close search"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="mt-5 flex flex-wrap gap-2" data-search-item>
          <button
            type="button"
            onClick={() => setDesk("all")}
            className={`px-3 py-1 font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.16em] ${
              desk === "all" ? "bg-radio text-void" : "border border-[var(--line)] text-muted"
            }`}
          >
            All desks
          </button>
          {desks.map(([slug, name]) => (
            <button
              key={slug}
              type="button"
              onClick={() => setDesk(slug)}
              className={`px-3 py-1 font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.16em] ${
                desk === slug ? "bg-radio text-void" : "border border-[var(--line)] text-muted"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
        <ul className="mt-8 flex flex-col gap-1">
          {results.map((a) => (
            <li key={a.slug} data-search-item>
              <button
                type="button"
                onClick={() => {
                  track({ name: "search", query: q || a.title });
                  onClose();
                  router.push(`/article/${a.slug}`);
                }}
                className="w-full cursor-pointer border-l-2 border-transparent px-4 py-3 text-left hover:border-radio hover:bg-paper/5"
              >
                <span className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.18em] text-radio">
                  {a.category.name}
                </span>
                <span className="mt-1 block font-[family-name:var(--font-syne)] text-xl font-bold leading-tight">
                  {a.title}
                </span>
                <span className="mt-1 block text-sm text-muted">
                  {a.author.name}
                  {a.tags.length ? ` · ${a.tags.map((t) => t.name).join(", ")}` : ""}
                </span>
              </button>
            </li>
          ))}
          {q && results.length === 0 && (
            <li className="px-4 py-8 font-[family-name:var(--font-grotesk)] text-muted">
              No matches for “{q}”.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
