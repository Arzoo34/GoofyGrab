import { NextRequest, NextResponse } from "next/server";
import { slugify, upsertTag } from "@/cms/store";
import type { Tag } from "@/types/cms";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<Tag>;
  const name = body.name?.trim() || "Untitled tag";
  const tag: Tag = {
    id: body.id || `tag-${Date.now()}`,
    name,
    slug: body.slug?.trim() || slugify(name),
  };
  const saved = upsertTag(tag);
  revalidatePath("/cms");
  revalidatePath(`/tag/${saved.slug}`);
  return NextResponse.json({ tag: saved });
}
