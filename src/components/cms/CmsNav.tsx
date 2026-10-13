import Link from "next/link";

const LINKS = [
  { href: "/cms", label: "Desk" },
  { href: "/cms/articles/new", label: "New story" },
  { href: "/cms/media", label: "Media" },
  { href: "/cms/authors", label: "Authors" },
  { href: "/cms/categories", label: "Categories" },
  { href: "/cms/tags", label: "Tags" },
  { href: "/cms/users", label: "Users" },
  { href: "/cms/ads", label: "Ads" },
  { href: "/cms/settings", label: "Settings" },
] as const;

export function CmsNav({ current }: { current?: string }) {
  return (
    <nav aria-label="Newsroom collections" className="mb-10 flex flex-wrap gap-2">
      {LINKS.map((l) => {
        const active = current === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`px-3 py-2 font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.16em] ${
              active ? "bg-radio text-void" : "border border-[var(--line)] hover:border-radio"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
