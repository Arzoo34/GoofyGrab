import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { CmsNav } from "@/components/cms/CmsNav";
import { MediaUploader } from "@/components/cms/MediaUploader";
import { getSnapshot } from "@/cms/store";

export const metadata: Metadata = {
  title: "Media library",
  robots: { index: false, follow: false },
};

export default function MediaPage() {
  const { media } = getSnapshot();
  return (
    <SiteShell title="Media library">
      <main id="main" className="mx-auto max-w-[1440px] px-4 py-12 md:px-8">
        <CmsNav current="/cms/media" />
        <h1 className="font-[family-name:var(--font-syne)] text-5xl font-extrabold uppercase tracking-tight">
          Media
        </h1>
        <p className="mt-3 max-w-[56ch] text-[16px] text-[#c8c8ce]">
          Filename, alt, caption, credit, and exact width/height are required so
          rendered images never cause layout shift.
        </p>
        <MediaUploader initial={media} />
      </main>
    </SiteShell>
  );
}
