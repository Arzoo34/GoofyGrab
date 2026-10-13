import { NextRequest, NextResponse } from "next/server";
import { getAllArticles, getSnapshot, slugify, upsertArticle } from "@/cms/store";
import { estimateReadingTime, toAnchor } from "@/lib/format";
import type { Article, ContentBlock, PublishStatus } from "@/types/cms";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

function revalidatePublic() {
  revalidatePath("/");
  revalidatePath("/cms");
  revalidatePath("/sitemap.xml");
  revalidatePath("/rss.xml");
}

export function GET() {
  return NextResponse.json({ articles: getAllArticles() });
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<Article> & { title?: string };
  const snap = getSnapshot();
  const now = new Date().toISOString();
  const title = body.title?.trim() || "Untitled story";
  const slug = body.slug?.trim() || slugify(title) || `story-${Date.now()}`;
  const blocks: ContentBlock[] = body.contentBlocks?.length
    ? body.contentBlocks
    : [{ type: "paragraph", id: `p-${Date.now()}`, html: "" }];

  const article: Article = {
    id: body.id || `art-${Date.now()}`,
    title,
    slug,
    excerpt: body.excerpt ?? "",
    dek: body.dek ?? "",
    heroImage: body.heroImage ?? snap.media[0],
    contentBlocks: blocks.map((b) =>
      b.type === "heading" ? { ...b, anchor: b.anchor || toAnchor(b.text) } : b,
    ),
    authorId: body.authorId ?? snap.authors[0].id,
    categoryId: body.categoryId ?? snap.categories[0].id,
    tagIds: body.tagIds ?? [],
    publishedAt: body.publishedAt ?? now,
    updatedAt: now,
    scheduledFor: body.scheduledFor,
    status: (body.status as PublishStatus) ?? "draft",
    featured: Boolean(body.featured),
    breaking: Boolean(body.breaking),
    trending: Boolean(body.trending),
    trendingRank: body.trendingRank,
    editorPick: Boolean(body.editorPick),
    sponsored: Boolean(body.sponsored),
    sponsorName: body.sponsorName,
    readingTime: estimateReadingTime(blocks),
    relatedArticleIds: body.relatedArticleIds ?? [],
    seo: {
      metaTitle: body.seo?.metaTitle || `${title} — Goofygrab`,
      metaDescription: body.seo?.metaDescription || body.excerpt || "",
      ogTitle: body.seo?.ogTitle || title,
      ogDescription: body.seo?.ogDescription || body.excerpt || "",
      ogImage: body.seo?.ogImage,
      canonicalUrl: body.seo?.canonicalUrl,
      noIndex: Boolean(body.seo?.noIndex),
      noFollow: Boolean(body.seo?.noFollow),
    },
  };

  const saved = upsertArticle(article);
  revalidatePublic();
  revalidatePath(`/article/${saved.slug}`);
  return NextResponse.json({ article: saved }, { status: 201 });
}
