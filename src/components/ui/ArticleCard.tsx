import Image from "next/image";
import Link from "next/link";
import { formatRelative, readingLabel } from "@/lib/format";
import type { HydratedArticle } from "@/types/cms";
import { CategoryTag } from "./CategoryTag";
import { SponsoredLabel } from "./SponsoredLabel";
import { MagneticCard } from "./MagneticCard";

export function FeedCard({ article }: { article: HydratedArticle }) {
  return (
    <MagneticCard className="group grid grid-cols-[96px_1fr] gap-4 border-b border-[var(--line)] py-5 md:grid-cols-[160px_1fr] md:gap-6">
      <Link
        href={`/article/${article.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-ink"
      >
        <Image
          src={article.heroImage.url}
          alt={article.heroImage.alt}
          width={article.heroImage.width}
          height={article.heroImage.height}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 96px, 160px"
        />
      </Link>
      <div className="min-w-0">
        <div className="mb-2 flex flex-wrap items-center gap-3">
          {article.sponsored && <SponsoredLabel name={article.sponsorName} />}
          <CategoryTag category={article.category} />
          <time
            dateTime={article.publishedAt}
            className="font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.14em] text-muted"
          >
            {formatRelative(article.publishedAt)}
          </time>
        </div>
        <h3 className="font-[family-name:var(--font-syne)] text-[20px] font-bold leading-[1.15] tracking-tight md:text-[26px]">
          <Link
            href={`/article/${article.slug}`}
            className="hover:text-radio transition-colors"
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 hidden max-w-[62ch] text-[15px] leading-relaxed text-[#c8c8ce] md:block">
          {article.excerpt}
        </p>
        <p className="mt-2 font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.12em] text-muted">
          {article.author.name} · {readingLabel(article.readingTime)}
        </p>
      </div>
    </MagneticCard>
  );
}

export function FeatureCard({
  article,
  large = false,
}: {
  article: HydratedArticle;
  large?: boolean;
}) {
  return (
    <MagneticCard className="group relative isolate flex h-full flex-col overflow-hidden border border-[var(--line)]">
      <Link href={`/article/${article.slug}`} className="relative block">
        <div className={large ? "aspect-[16/10]" : "aspect-[16/11]"}>
          <Image
            src={article.heroImage.url}
            alt={article.heroImage.alt}
            width={article.heroImage.width}
            height={article.heroImage.height}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            sizes={large ? "(max-width: 1024px) 100vw, 60vw" : "40vw"}
            priority={large}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
      </Link>
      <div className={`relative z-10 ${large ? "-mt-28 p-6 md:p-8" : "-mt-16 p-5"}`}>
        <CategoryTag category={article.category} />
        <h2
          className={`mt-3 font-[family-name:var(--font-syne)] font-extrabold leading-[0.95] tracking-tight ${
            large
              ? "text-[36px] md:text-[56px] lg:text-[64px]"
              : "text-[22px] md:text-[28px]"
          }`}
        >
          <Link href={`/article/${article.slug}`} className="hover:text-radio">
            {article.title}
          </Link>
        </h2>
        {large && (
          <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-[#d4d4da] md:text-[18px]">
            {article.dek}
          </p>
        )}
        <p className="mt-3 font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.14em] text-muted">
          {article.author.name} · {readingLabel(article.readingTime)}
        </p>
      </div>
    </MagneticCard>
  );
}
