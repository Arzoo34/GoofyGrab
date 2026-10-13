import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { ArticleEditor } from "@/components/cms/ArticleEditor";
import { CmsNav } from "@/components/cms/CmsNav";
import { getAllArticles, getArticleById, getSnapshot } from "@/cms/store";

export const metadata: Metadata = {
  title: "Edit article",
  robots: { index: false, follow: false },
};

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = getArticleById(id);
  if (!article) notFound();
  const snap = getSnapshot();
  const articles = getAllArticles().map((a) => ({ id: a.id, title: a.title, slug: a.slug }));

  return (
    <SiteShell title={`Edit ${article.title}`}>
      <main id="main" className="mx-auto max-w-[1440px] px-4 py-12 md:px-8">
        <CmsNav />
        <p className="font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.22em] text-radio">
          Editing · {article.status}
        </p>
        <h1 className="mt-2 mb-10 font-[family-name:var(--font-syne)] text-4xl font-extrabold uppercase tracking-tight md:text-6xl">
          {article.title}
        </h1>
        <ArticleEditor
          article={article}
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
