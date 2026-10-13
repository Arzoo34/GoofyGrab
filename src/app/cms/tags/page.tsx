import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { CmsNav } from "@/components/cms/CmsNav";
import { CollectionForm } from "@/components/cms/CollectionForm";
import { getTags } from "@/cms/store";

export const metadata: Metadata = { title: "Tags", robots: { index: false, follow: false } };

export default function CmsTagsPage() {
  const tags = getTags();
  return (
    <SiteShell title="Tags">
      <main id="main" className="mx-auto max-w-[1440px] px-4 py-12 md:px-8">
        <CmsNav current="/cms/tags" />
        <h1 className="mb-8 font-[family-name:var(--font-syne)] text-5xl font-extrabold uppercase tracking-tight">
          Tags
        </h1>
        <CollectionForm
          endpoint="/api/cms/tags"
          submitLabel="Save tag"
          fields={[{ name: "name", label: "Name", required: true }]}
        />
        <ul className="mt-8 flex flex-wrap gap-2">
          {tags.map((t) => (
            <li
              key={t.id}
              className="border border-[var(--line)] px-3 py-2 font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.14em]"
            >
              {t.name}
            </li>
          ))}
        </ul>
      </main>
    </SiteShell>
  );
}
