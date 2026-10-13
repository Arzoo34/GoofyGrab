import { NextRequest, NextResponse } from "next/server";
import { getSnapshot, slugify, upsertAuthor } from "@/cms/store";
import type { Author } from "@/types/cms";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({ authors: getSnapshot().authors });
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<Author>;
  const snap = getSnapshot();
  const name = body.name?.trim() || "Untitled author";
  const author: Author = {
    id: body.id || `auth-${Date.now()}`,
    name,
    slug: body.slug?.trim() || slugify(name),
    role: body.role || "Contributor",
    bio: body.bio || "",
    avatar: body.avatar ?? snap.authors[0]?.avatar ?? snap.media[0],
    twitter: body.twitter,
  };
  const saved = upsertAuthor(author);
  revalidatePath("/cms");
  revalidatePath("/authors");
  revalidatePath(`/author/${saved.slug}`);
  return NextResponse.json({ author: saved });
}
