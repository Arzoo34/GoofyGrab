import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { getSnapshot, upsertMedia } from "@/cms/store";
import type { MediaAsset } from "@/types/cms";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({ media: getSnapshot().media });
}

async function fromJson(req: NextRequest) {
  const body = (await req.json()) as Partial<MediaAsset> & { url?: string; alt?: string };
  if (!body.url || !body.alt) {
    return NextResponse.json({ error: "url and alt are required" }, { status: 400 });
  }
  const media: MediaAsset = {
    id: `media-${Date.now()}`,
    filename: body.filename || body.url.split("/").pop() || "upload.jpg",
    alt: body.alt,
    caption: body.caption,
    credit: body.credit,
    width: Number(body.width) || 1600,
    height: Number(body.height) || 900,
    url: body.url,
  };
  return NextResponse.json({ media: upsertMedia(media) }, { status: 201 });
}

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return fromJson(req);
  }

  const form = await req.formData();
  const file = form.get("file");
  const alt = String(form.get("alt") || "").trim();
  if (!(file instanceof File) || !alt) {
    return NextResponse.json({ error: "file and alt are required" }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name) || ".jpg";
  const safe = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, safe), bytes);

  const media: MediaAsset = {
    id: `media-${Date.now()}`,
    filename: file.name || safe,
    alt,
    caption: String(form.get("caption") || "") || undefined,
    credit: String(form.get("credit") || "") || undefined,
    width: Number(form.get("width")) || 1600,
    height: Number(form.get("height")) || 900,
    url: `/uploads/${safe}`,
  };
  return NextResponse.json({ media: upsertMedia(media) }, { status: 201 });
}
