import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { ArticleEditor } from "@/components/cms/ArticleEditor";
import { CmsNav } from "@/components/cms/CmsNav";
import { getAllArticles, getSnapshot } from "@/cms/store";

export const metadata: Metadata = {
  title: "New article",
  robots: { index: false, follow: false },
};

export default function NewArticlePage() {
  const snap = getSnapshot();
  const articles = getAllArticles().map((a) => ({ id: a.id, title: a.title, slug: a.slug }));
  return (
    <SiteShell title="New article">
      <main id="main" className="mx-auto max-w-[1440px] px-4 py-12 md:px-8">
        <CmsNav current="/cms/articles/new" />
        <p className="font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.22em] text-radio">
          Newsroom
        </p>
        <h1 className="mt-2 mb-10 font-[family-name:var(--font-syne)] text-4xl font-extrabold uppercase tracking-tight md:text-6xl">
          New story
        </h1>
        <ArticleEditor
          authors={snap.authors}
          categories={snap.categories}
          tags={snap.tags}
          media={snap.media}
          articles={articles}
        />
      </main>
    </SiteShell>
  );
}
