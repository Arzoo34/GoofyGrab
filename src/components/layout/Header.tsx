"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { gsap } from "gsap";
import { Logo } from "@/components/ui/Logo";
import { SearchOverlay } from "./SearchOverlay";
import { MORE_NAV, NAV } from "@/lib/site";
import type { HydratedArticle } from "@/types/cms";

export function Header({
  searchIndex,
}: {
  searchIndex: Pick<
    HydratedArticle,
    "title" | "slug" | "excerpt" | "category" | "author" | "tags"
  >[];
}) {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open || search ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, search]);

  useEffect(() => {
    if (!open) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    gsap.from("[data-mobile-link]", {
      x: 40,
      opacity: 0,
      stagger: 0.05,
      duration: 0.45,
      ease: "expo.out",
    });
  }, [open]);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header
        className={`sticky top-0 z-50 border-b border-[var(--line)] bg-void/90 backdrop-blur-md transition-[height,background] duration-200 ${
          compact ? "h-14" : "h-[72px]"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between gap-4 px-4 md:px-8">
          <Logo compact={compact} />
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-[family-name:var(--font-grotesk)] text-[13px] font-semibold uppercase tracking-[0.16em] text-paper/80 hover:text-radio"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearch(true)}
              className="grid size-11 cursor-pointer place-items-center text-paper hover:text-radio"
              aria-label="Open search"
            >
              <Search className="size-5" />
            </button>
            <button
              type="button"
              className="grid size-11 cursor-pointer place-items-center text-paper lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-40 bg-void pt-[72px] lg:hidden">
          <nav className="flex flex-col px-6 py-8" aria-label="Mobile">
            {[...NAV, ...MORE_NAV].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-mobile-link
                onClick={() => setOpen(false)}
                className="border-b border-[var(--line)] py-4 font-[family-name:var(--font-syne)] text-3xl font-extrabold uppercase tracking-tight hover:text-radio"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
      <SearchOverlay open={search} onClose={() => setSearch(false)} articles={searchIndex} />
    </>
  );
}
