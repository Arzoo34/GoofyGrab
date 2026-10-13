import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdRail } from "@/components/ads/AdSlot";
import { SiteShell } from "@/components/layout/SiteShell";
import { Headline } from "@/components/motion/Headline";
import { FeatureCard, FeedCard } from "@/components/ui/ArticleCard";
import { getByCategory, getCategories, getCategory } from "@/cms/store";

export const revalidate = 60;

export function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return { title: "Category" };
  return { title: cat.name, description: cat.description };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const articles = getByCategory(slug);
  const [lead, ...rest] = articles;

  return (
    <SiteShell title={category.name}>
      <main id="main" className="mx-auto max-w-[1440px] px-4 py-12 md:px-8">
        <p className="font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.22em] text-radio">
          Desk
        </p>
        <Headline
          text={category.name}
          className="mt-3 font-[family-name:var(--font-syne)] text-[56px] font-extrabold uppercase leading-[0.9] tracking-tight md:text-[96px]"
        />
        <p className="mt-4 max-w-[50ch] text-[17px] text-[#c8c8ce]">{category.description}</p>
        <AdRail placement="CATEGORY_TOP" />
        {lead && (
          <div className="mt-10">
            <FeatureCard article={lead} large />
          </div>
        )}
        <div className="mt-8">
          {rest.map((a, i) => (
            <div key={a.id}>
              <FeedCard article={a} />
              {i === 2 && <AdRail placement="CATEGORY_FEED" />}
            </div>
          ))}
          {articles.length === 0 && (
            <p className="py-16 text-muted">No stories on this desk yet.</p>
          )}
        </div>
      </main>
    </SiteShell>
  );
}
