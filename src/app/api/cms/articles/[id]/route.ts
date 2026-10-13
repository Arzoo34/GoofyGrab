import { NextRequest, NextResponse } from "next/server";
import { getArticleById, slugify, upsertArticle } from "@/cms/store";
import { estimateReadingTime, toAnchor } from "@/lib/format";
import type { Article, ContentBlock, PublishStatus } from "@/types/cms";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return params.then(({ id }) => {
    const article = getArticleById(id);
    if (!article) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ article });
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const existing = getArticleById(id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = (await req.json()) as Partial<Article>;
  const now = new Date().toISOString();
  const title = body.title?.trim() || existing.title;
  const blocks: ContentBlock[] = (body.contentBlocks ?? existing.contentBlocks).map((b) =>
    b.type === "heading" ? { ...b, anchor: b.anchor || toAnchor(b.text) } : b,
  );

  const article: Article = {
    ...existing,
    ...body,
    id,
    title,
    slug: body.slug?.trim() || existing.slug || slugify(title),
    excerpt: body.excerpt ?? existing.excerpt,
    dek: body.dek ?? existing.dek,
    heroImage: body.heroImage ?? existing.heroImage,
    contentBlocks: blocks,
    authorId: body.authorId ?? existing.authorId,
    categoryId: body.categoryId ?? existing.categoryId,
    tagIds: body.tagIds ?? existing.tagIds,
    publishedAt: body.publishedAt ?? existing.publishedAt,
    updatedAt: now,
    scheduledFor: body.scheduledFor,
    status: (body.status as PublishStatus) ?? existing.status,
    featured: body.featured ?? existing.featured,
    breaking: body.breaking ?? existing.breaking,
    trending: body.trending ?? existing.trending,
    editorPick: body.editorPick ?? existing.editorPick,
    sponsored: body.sponsored ?? existing.sponsored,
    sponsorName: body.sponsorName ?? existing.sponsorName,
    readingTime: estimateReadingTime(blocks),
    relatedArticleIds: body.relatedArticleIds ?? existing.relatedArticleIds,
    seo: {
      metaTitle: body.seo?.metaTitle || existing.seo.metaTitle,
      metaDescription: body.seo?.metaDescription || existing.seo.metaDescription,
      ogTitle: body.seo?.ogTitle || existing.seo.ogTitle,
      ogDescription: body.seo?.ogDescription || existing.seo.ogDescription,
      ogImage: body.seo?.ogImage ?? existing.seo.ogImage,
      canonicalUrl: body.seo?.canonicalUrl ?? existing.seo.canonicalUrl,
      noIndex: body.seo?.noIndex ?? existing.seo.noIndex,
      noFollow: body.seo?.noFollow ?? existing.seo.noFollow,
    },
  };

  const saved = upsertArticle(article);
  revalidatePath("/");
  revalidatePath("/cms");
  revalidatePath(`/article/${saved.slug}`);
  revalidatePath(`/category/${saved.category.slug}`);
  return NextResponse.json({ article: saved });
}
