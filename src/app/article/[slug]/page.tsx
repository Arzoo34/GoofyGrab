import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdRail, AdSlot } from "@/components/ads/AdSlot";
import { ArticleBlocks, Toc } from "@/components/article/blocks";
import { ParallaxHero } from "@/components/article/ParallaxHero";
import { ReadingProgress } from "@/components/article/ReadingProgress";
import { SiteShell } from "@/components/layout/SiteShell";
import { Headline } from "@/components/motion/Headline";
import { CategoryTag } from "@/components/ui/CategoryTag";
import { FeedCard } from "@/components/ui/ArticleCard";
import { SponsoredLabel } from "@/components/ui/SponsoredLabel";
import {
  getAllSlugs,
  getArticleBySlug,
  getRelated,
  getSettings,
} from "@/cms/store";
import { formatDate, readingLabel } from "@/lib/format";
import { SITE_URL } from "@/lib/site";

export const revalidate = 60;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug, { includeUnpublished: true });
  if (!article) return { title: "Not found" };
  const url = `${SITE_URL}/article/${article.slug}`;
  const ogImage = article.seo.ogImage ?? article.heroImage;
  return {
    title: article.seo.metaTitle.replace(" — Goofygrab", ""),
    description: article.seo.metaDescription,
    robots: {
      index: !article.seo.noIndex,
      follow: !article.seo.noFollow,
    },
    alternates: { canonical: article.seo.canonicalUrl ?? url },
    openGraph: {
      type: "article",
      title: article.seo.ogTitle || article.title,
      description: article.seo.ogDescription || article.seo.metaDescription,
      url,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      images: [
        {
          url: ogImage.url,
          width: ogImage.width,
          height: ogImage.height,
          alt: ogImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seo.ogTitle || article.title,
      description: article.seo.ogDescription || article.seo.metaDescription,
      images: [ogImage.url],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug, { includeUnpublished: true });
  if (!article) notFound();
  const related = getRelated(article, 3);
  const settings = getSettings();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsArticle",
        headline: article.title,
        description: article.seo.metaDescription,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        author: {
          "@type": "Person",
          name: article.author.name,
          url: `${SITE_URL}/author/${article.author.slug}`,
        },
        publisher: {
          "@type": "NewsMediaOrganization",
          name: settings.name,
          url: SITE_URL,
        },
        image: [article.heroImage.url],
        mainEntityOfPage: `${SITE_URL}/article/${article.slug}`,
        articleSection: article.category.name,
        wordCount: article.readingTime * 220,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: article.category.name,
            item: `${SITE_URL}/category/${article.category.slug}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: `${SITE_URL}/article/${article.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <SiteShell title={article.title}>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main" className="bg-paper text-ink">
        {article.status !== "published" && (
          <p className="bg-radio px-4 py-2 text-center font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.16em] text-void">
            Preview · {article.status} · not in public feeds
          </p>
        )}
        <AdRail placement="ARTICLE_TOP" className="hidden md:flex" />
        <AdRail placement="MOBILE_ARTICLE" className="flex md:hidden" />
        <header className="mx-auto max-w-[1440px] px-4 pb-8 pt-10 md:px-8">
          <div className="flex flex-wrap items-center gap-2">
            {article.sponsored && <SponsoredLabel name={article.sponsorName} />}
            {article.breaking && (
              <span className="bg-radio px-2 py-[3px] font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.16em] text-void">
                Breaking
              </span>
            )}
            {article.editorPick && (
              <span className="border border-acid px-2 py-[3px] font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.16em] text-acid">
                Editor’s pick
              </span>
            )}
            <CategoryTag category={article.category} />
          </div>
          <Headline
            text={article.title}
            className="mt-4 max-w-[18ch] font-[family-name:var(--font-syne)] text-[42px] font-extrabold uppercase leading-[0.92] tracking-tight text-ink md:text-[72px] lg:text-[84px]"
          />
          <p className="mt-5 max-w-[62ch] text-[20px] leading-snug text-[#3a3a42] md:text-[24px]">
            {article.dek}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-[family-name:var(--font-plex)] text-[12px] uppercase tracking-[0.14em] text-[#5c5c64]">
            <Link href={`/author/${article.author.slug}`} className="text-ink hover:text-acid">
              {article.author.name}
            </Link>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            <span>{readingLabel(article.readingTime)}</span>
          </div>
        </header>
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <ParallaxHero media={article.heroImage} priority />
        </div>
        <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-12 md:px-8 xl:grid-cols-[220px_minmax(0,740px)_220px]">
          <div className="hidden xl:block">
            <Toc article={article} />
          </div>
          <article id="article-body" className="article-measure prose-gg mx-auto w-full">
            <ArticleBlocks blocks={article.contentBlocks} />
            <ul className="mt-12 flex flex-wrap gap-2">
              {article.tags.map((t) => (
                <li key={t.id}>
                  <Link
                    href={`/tag/${t.slug}`}
                    className="border border-ink px-2 py-1 font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.14em] text-ink hover:bg-ink hover:text-paper"
                  >
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
            <section className="mt-16 border-t-2 border-ink pt-8">
              <Link href={`/author/${article.author.slug}`} className="flex gap-4">
                <Image
                  src={article.author.avatar.url}
                  alt={article.author.avatar.alt}
                  width={72}
                  height={72}
                  className="size-[72px] object-cover"
                />
                <div>
                  <p className="font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.16em] text-[#5c5c64]">
                    Written by
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-syne)] text-2xl font-extrabold">
                    {article.author.name}
                  </p>
                  <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-[#3a3a42]">
                    {article.author.bio}
                  </p>
                </div>
              </Link>
            </section>
            <AdRail placement="ARTICLE_BOTTOM" />
          </article>
          <aside className="hidden xl:block">
            <div className="sticky top-24">
              <AdSlot placement="ARTICLE_SIDEBAR" />
            </div>
          </aside>
        </div>
        {related.length > 0 && (
          <section className="border-t border-ink/10 bg-void px-4 py-16 text-paper md:px-8">
            <div className="mx-auto max-w-[1440px]">
              <h2 className="font-[family-name:var(--font-syne)] text-4xl font-extrabold uppercase tracking-tight">
                Keep grabbing
              </h2>
              <div className="mt-6">
                {related.map((a) => (
                  <FeedCard key={a.id} article={a} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </SiteShell>
  );
}
