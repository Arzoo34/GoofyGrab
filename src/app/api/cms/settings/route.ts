import { NextRequest, NextResponse } from "next/server";
import {
  getAdSettings,
  getNewsletterSettings,
  getSettings,
  updateAdSettings,
  updateNewsletterSettings,
  updateSettings,
} from "@/cms/store";
import type { AdSettings, NewsletterSettings, SiteSettings } from "@/types/cms";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    settings: getSettings(),
    adSettings: getAdSettings(),
    newsletterSettings: getNewsletterSettings(),
  });
}

export async function PUT(req: NextRequest) {
  const body = (await req.json()) as {
    settings?: SiteSettings;
    adSettings?: AdSettings;
    newsletterSettings?: NewsletterSettings;
  };
  const next = {
    settings: body.settings ? updateSettings(body.settings) : getSettings(),
    adSettings: body.adSettings ? updateAdSettings(body.adSettings) : getAdSettings(),
    newsletterSettings: body.newsletterSettings
      ? updateNewsletterSettings(body.newsletterSettings)
      : getNewsletterSettings(),
  };
  revalidatePath("/");
  revalidatePath("/cms");
  return NextResponse.json(next);
}
