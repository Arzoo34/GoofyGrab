import { NextRequest, NextResponse } from "next/server";
import { getAllArticles, getSnapshot } from "@/cms/store";

export const dynamic = "force-dynamic";

export function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.toLowerCase() ?? "";
  const snap = getSnapshot();
  const articles = getAllArticles()
    .filter((a) => !q || a.title.toLowerCase().includes(q) || a.slug.includes(q))
    .slice(0, 12)
    .map((a) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      href: `/article/${a.slug}`,
      status: a.status,
    }));

  return NextResponse.json({
    articles,
    authors: snap.authors,
    categories: snap.categories,
    tags: snap.tags,
    media: snap.media,
    users: snap.users,
  });
}
