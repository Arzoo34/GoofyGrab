import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { FeedCard } from "@/components/ui/ArticleCard";
import { getByTag, getTag, getTags } from "@/cms/store";

export const revalidate = 60;

export function generateStaticParams() {
  return getTags().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tag = getTag(slug);
  if (!tag) return { title: "Tag" };
  return { title: tag.name };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tag = getTag(slug);
  if (!tag) notFound();
  const articles = getByTag(slug);
  return (
    <SiteShell title={tag.name}>
      <main id="main" className="mx-auto max-w-[1440px] px-4 py-12 md:px-8">
        <p className="font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.22em] text-radio">
          Tag
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-syne)] text-5xl font-extrabold uppercase tracking-tight md:text-7xl">
          {tag.name}
        </h1>
        <div className="mt-10">
          {articles.map((a) => (
            <FeedCard key={a.id} article={a} />
          ))}
        </div>
      </main>
    </SiteShell>
  );
}
