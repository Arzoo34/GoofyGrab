import Link from "next/link";
import Image from "next/image";
import { StaggerReveal } from "@/components/motion/Reveal";
import { CategoryTag } from "@/components/ui/CategoryTag";
import type { HydratedArticle } from "@/types/cms";

export function EditorPicks({ items }: { items: HydratedArticle[] }) {
  if (!items.length) return null;
  return (
    <section className="border-y border-[var(--line)] bg-[#111118]">
      <div className="mx-auto max-w-[1440px] px-4 py-14 md:px-8">
        <p className="font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.22em] text-radio">
          Editor&apos;s picks
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-syne)] text-4xl font-extrabold uppercase tracking-tight md:text-6xl">
          Worth the long read
        </h2>
        <StaggerReveal className="mt-8 grid gap-6 md:grid-cols-3">
          {items.slice(0, 3).map((a) => (
            <article key={a.id} data-stagger className="group border border-[var(--line)]">
              <Link href={`/article/${a.slug}`} className="block">
                <div className="aspect-[16/10] overflow-hidden">
                  <Image
                    src={a.heroImage.url}
                    alt={a.heroImage.alt}
                    width={a.heroImage.width}
                    height={a.heroImage.height}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <CategoryTag category={a.category} />
                  <h3 className="mt-3 font-[family-name:var(--font-syne)] text-2xl font-extrabold leading-[1.05] tracking-tight group-hover:text-radio">
                    {a.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-[#c8c8ce]">
                    {a.excerpt}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
