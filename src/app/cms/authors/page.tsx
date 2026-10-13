import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { CmsNav } from "@/components/cms/CmsNav";
import { CollectionForm } from "@/components/cms/CollectionForm";
import { getAuthors } from "@/cms/store";

export const metadata: Metadata = { title: "Authors", robots: { index: false, follow: false } };

export default function CmsAuthorsPage() {
  const authors = getAuthors();
  return (
    <SiteShell title="Authors">
      <main id="main" className="mx-auto max-w-[1440px] px-4 py-12 md:px-8">
        <CmsNav current="/cms/authors" />
        <h1 className="mb-8 font-[family-name:var(--font-syne)] text-5xl font-extrabold uppercase tracking-tight">
          Authors
        </h1>
        <CollectionForm
          endpoint="/api/cms/authors"
          submitLabel="Save author"
          fields={[
            { name: "name", label: "Name", required: true },
            { name: "role", label: "Desk / role", required: true },
            { name: "bio", label: "Bio", type: "textarea" },
            { name: "twitter", label: "Twitter handle" },
          ]}
        />
        <ul className="mt-10 divide-y divide-[var(--line)]">
          {authors.map((a) => (
            <li key={a.id} className="py-4">
              <p className="font-[family-name:var(--font-syne)] text-xl font-bold">{a.name}</p>
              <p className="font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.14em] text-muted">
                {a.role} · /author/{a.slug}
              </p>
            </li>
          ))}
        </ul>
      </main>
    </SiteShell>
  );
}
