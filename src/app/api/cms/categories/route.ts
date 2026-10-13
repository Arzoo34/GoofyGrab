import { NextRequest, NextResponse } from "next/server";
import { slugify, upsertCategory } from "@/cms/store";
import type { Category } from "@/types/cms";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<Category>;
  const name = body.name?.trim() || "Untitled desk";
  const category: Category = {
    id: body.id || `cat-${Date.now()}`,
    name,
    slug: body.slug?.trim() || slugify(name),
    description: body.description || "",
    accent: body.accent || "paper",
  };
  const saved = upsertCategory(category);
  revalidatePath("/cms");
  revalidatePath(`/category/${saved.slug}`);
  return NextResponse.json({ category: saved });
}
