import Link from "next/link";
import { padRank } from "@/lib/format";
import type { HydratedArticle } from "@/types/cms";

export function Trending({ items }: { items: HydratedArticle[] }) {
  return (
    <section aria-labelledby="trending-heading" className="border-l border-[var(--line)] pl-5">
      <h2
        id="trending-heading"
        className="font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.22em] text-radio"
      >
        Trending now
      </h2>
      <ol className="mt-4">
        {items.slice(0, 5).map((a, i) => (
          <li key={a.id} className="border-b border-[var(--line)] last:border-0">
            <Link
              href={`/article/${a.slug}`}
              className="group flex gap-4 py-4"
            >
              <span className="font-[family-name:var(--font-syne)] text-3xl font-extrabold leading-none text-paper/20 group-hover:text-radio">
                {padRank(i + 1)}
              </span>
              <span>
                <span className="block font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.16em] text-muted">
                  {a.category.name}
                </span>
                <span className="mt-1 block font-[family-name:var(--font-syne)] text-[17px] font-bold leading-tight group-hover:text-radio">
                  {a.title}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
