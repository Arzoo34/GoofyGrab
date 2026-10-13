import type { Metadata } from "next";
import { AdRail, AdSlot } from "@/components/ads/AdSlot";
import { CategoryDive } from "@/components/home/CategoryDive";
import { EditorPicks } from "@/components/home/EditorPicks";
import { HeroFeature } from "@/components/home/HeroFeature";
import { BreakingMarquee } from "@/components/home/Marquee";
import { Trending } from "@/components/home/Trending";
import { SiteShell } from "@/components/layout/SiteShell";
import { Headline } from "@/components/motion/Headline";
import { StaggerReveal } from "@/components/motion/Reveal";
import { FeatureCard, FeedCard } from "@/components/ui/ArticleCard";
import {
  getByCategory,
  getCategory,
  getEditorPicks,
  getFeatured,
  getLatest,
  getSettings,
  getTrending,
} from "@/cms/store";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Grab the signal. Leave the noise.",
  description:
    "Goofygrab is an independent technology and media publication covering AI, science, gadgets, startups, security, and the culture around them.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const settings = getSettings();
  const featured = getFeatured();
  const trending = getTrending();
  const latest = getLatest();
  const picks = getEditorPicks();
  const hero = featured[0] ?? latest[0];
  const side = featured.filter((a) => a.id !== hero?.id).slice(0, 2);
  const feed = latest.filter((a) => a.id !== hero?.id).slice(0, 10);

  const dives = ["ai", "security", "gaming"]
    .map((slug) => {
      const category = getCategory(slug);
      if (!category) return null;
      return { category, articles: getByCategory(slug) };
    })
    .filter(Boolean) as {
    category: NonNullable<ReturnType<typeof getCategory>>;
    articles: ReturnType<typeof getByCategory>;
  }[];

  return (
    <SiteShell title={settings.name}>
      <main id="main">
        <BreakingMarquee />
        <AdRail placement="HOME_TOP" />
        <section className="grid-bg relative overflow-hidden border-b border-[var(--line)]">
          <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-acid/30 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 bg-volt/20 blur-3xl" />
          <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-8 md:py-16">
            <p className="font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.28em] text-radio">
              Independent tech & media
            </p>
            <Headline
              text="The magazine for people who still read."
              className="mt-4 max-w-[16ch] font-[family-name:var(--font-syne)] text-[48px] font-extrabold uppercase leading-[0.86] tracking-tight md:text-[88px] lg:text-[112px]"
            />
            <p className="mt-6 max-w-[52ch] text-[17px] leading-relaxed text-[#c8c8ce] md:text-[19px]">
              {settings.description}
            </p>
          </div>
        </section>

        {hero && <HeroFeature article={hero} />}

        {hero && (
          <section className="mx-auto grid max-w-[1440px] gap-6 px-4 py-10 md:grid-cols-[1.4fr_0.8fr] md:px-8">
            <div className="flex flex-col gap-6">
              {side.map((a) => (
                <FeatureCard key={a.id} article={a} />
              ))}
            </div>
            <Trending items={trending} />
          </section>
        )}

        <AdRail placement="HOME_BETWEEN_FEATURES" />
        <EditorPicks items={picks} />

        <section className="mx-auto max-w-[1440px] px-4 py-8 md:grid md:grid-cols-[minmax(0,1fr)_300px] md:gap-10 md:px-8">
          <div>
            <h2 className="mb-2 font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.22em] text-muted">
              Latest
            </h2>
            <StaggerReveal>
              {feed.map((a, i) => (
                <div key={a.id} data-stagger>
                  <FeedCard article={a} />
                  {i === 3 && <AdRail placement="HOME_FEED" />}
                </div>
              ))}
            </StaggerReveal>
          </div>
          <aside className="hidden md:block">
            <div className="sticky top-24 flex justify-center">
              <AdSlot placement="HOME_SIDEBAR" />
            </div>
          </aside>
        </section>

        {dives.map((d) => (
          <CategoryDive key={d.category.id} category={d.category} articles={d.articles} />
        ))}
      </main>
    </SiteShell>
  );
}
