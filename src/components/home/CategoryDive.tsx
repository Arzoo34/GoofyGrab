import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { readingLabel } from "@/lib/format";
import type { Category, HydratedArticle } from "@/types/cms";

const SURFACES: Record<Category["accent"], string> = {
  acid: "bg-acid text-paper",
  radio: "bg-radio text-void",
  volt: "bg-volt text-void",
  paper: "bg-paper text-void",
};

export function CategoryDive({
  category,
  articles,
}: {
  category: Category;
  articles: HydratedArticle[];
}) {
  if (articles.length === 0) return null;
  const [lead, ...rest] = articles;
  const surface = SURFACES[category.accent];

  return (
    <section className={`${surface} relative`} data-dive>
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-20 md:grid-cols-[1.2fr_1fr] md:px-8">
        <Reveal>
          <p className="font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.22em] opacity-70">
            Deep dive
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-syne)] text-[48px] font-extrabold uppercase leading-[0.9] tracking-tight md:text-[88px]">
            {category.name}
          </h2>
          <p className="mt-4 max-w-[44ch] text-[16px] leading-relaxed opacity-80">
            {category.description}
          </p>
          <Link
            href={`/category/${category.slug}`}
            className="mt-6 inline-flex border-2 border-current px-4 py-2 font-[family-name:var(--font-grotesk)] text-xs font-bold uppercase tracking-[0.16em] hover:bg-void hover:text-paper"
          >
            All {category.name}
          </Link>
        </Reveal>
        <div className="flex flex-col gap-5">
          <Link href={`/article/${lead.slug}`} className="group block">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={lead.heroImage.url}
                alt={lead.heroImage.alt}
                width={lead.heroImage.width}
                height={lead.heroImage.height}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>
            <h3 className="mt-3 font-[family-name:var(--font-syne)] text-2xl font-extrabold leading-tight">
              {lead.title}
            </h3>
            <p className="mt-1 font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.14em] opacity-70">
              {lead.author.name} · {readingLabel(lead.readingTime)}
            </p>
          </Link>
          <ul className="divide-y divide-current/20 border-t border-current/20">
            {rest.slice(0, 3).map((a) => (
              <li key={a.id} className="py-3">
                <Link
                  href={`/article/${a.slug}`}
                  className="font-[family-name:var(--font-syne)] text-lg font-bold leading-tight hover:underline"
                >
                  {a.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
