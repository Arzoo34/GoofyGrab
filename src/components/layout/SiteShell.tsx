import { Header } from "./Header";
import { Footer } from "./Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { PageTracker } from "@/components/analytics/PageTracker";
import { AdProvider } from "@/components/ads/AdProvider";
import { getAdSettings, getLatest, getSettings } from "@/cms/store";

export function SiteShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const settings = getSettings();
  const adSettings = getAdSettings();
  const searchIndex = getLatest().map((a) => ({
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt,
    category: a.category,
    author: a.author,
    tags: a.tags,
  }));

  return (
    <AdProvider settings={adSettings}>
      <SmoothScroll>
        <PageTracker title={title} />
        <Header searchIndex={searchIndex} />
        {children}
        <Footer settings={settings} />
      </SmoothScroll>
    </AdProvider>
  );
}
