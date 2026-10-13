import Image from "next/image";
import Link from "next/link";
import { Headline } from "@/components/motion/Headline";
import { CategoryTag } from "@/components/ui/CategoryTag";
import { SponsoredLabel } from "@/components/ui/SponsoredLabel";
import { readingLabel } from "@/lib/format";
import type { HydratedArticle } from "@/types/cms";

export function HeroFeature({ article }: { article: HydratedArticle }) {
  return (
    <article className="group relative isolate overflow-hidden border-b border-[var(--line)]">
      <div className="pointer-events-none absolute -right-16 top-0 hidden h-[120%] w-[58%] md:block">
        <div className="relative h-full min-h-[320px] w-[115%] md:min-h-[560px]">
          <Image
            src={article.heroImage.url}
            alt={article.heroImage.alt}
            width={article.heroImage.width}
            height={article.heroImage.height}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 58vw"
            priority
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-void via-void/55 to-transparent" />
        </div>
      </div>
      <div className="relative z-10 mx-auto grid max-w-[1440px] gap-8 px-4 py-12 md:grid-cols-[minmax(0,1.05fr)_0.95fr] md:px-8 md:py-20">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {article.sponsored && <SponsoredLabel name={article.sponsorName} />}
            {article.breaking && (
              <span className="bg-radio px-2 py-[3px] font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.16em] text-void">
                Breaking
              </span>
            )}
            <CategoryTag category={article.category} />
          </div>
          <Headline
            text={article.title}
            className="max-w-[14ch] font-[family-name:var(--font-syne)] text-[42px] font-extrabold uppercase leading-[0.86] tracking-tight md:text-[72px] lg:text-[88px]"
          />
          <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-[#d4d4da] md:text-[20px]">
            {article.dek}
          </p>
          <p className="mt-4 font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.14em] text-muted">
            {article.author.name} · {readingLabel(article.readingTime)}
          </p>
          <Link
            href={`/article/${article.slug}`}
            className="mt-8 inline-flex border-2 border-radio px-5 py-3 font-[family-name:var(--font-grotesk)] text-xs font-bold uppercase tracking-[0.16em] text-radio hover:bg-radio hover:text-void"
          >
            Read the story
          </Link>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden md:hidden">
          <Image
            src={article.heroImage.url}
            alt={article.heroImage.alt}
            width={article.heroImage.width}
            height={article.heroImage.height}
            className="h-full w-full object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </div>
    </article>
  );
}
