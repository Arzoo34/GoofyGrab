import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { CmsNav } from "@/components/cms/CmsNav";
import { CollectionForm } from "@/components/cms/CollectionForm";
import { getCategories } from "@/cms/store";

export const metadata: Metadata = { title: "Categories", robots: { index: false, follow: false } };

export default function CmsCategoriesPage() {
  const categories = getCategories();
  return (
    <SiteShell title="Categories">
      <main id="main" className="mx-auto max-w-[1440px] px-4 py-12 md:px-8">
        <CmsNav current="/cms/categories" />
        <h1 className="mb-8 font-[family-name:var(--font-syne)] text-5xl font-extrabold uppercase tracking-tight">
          Categories
        </h1>
        <CollectionForm
          endpoint="/api/cms/categories"
          submitLabel="Save desk"
          fields={[
            { name: "name", label: "Name", required: true },
            { name: "description", label: "Description", type: "textarea" },
            {
              name: "accent",
              label: "Accent",
              type: "select",
              options: [
                { value: "acid", label: "Acid purple" },
                { value: "radio", label: "Radioactive green" },
                { value: "volt", label: "Electric blue" },
                { value: "paper", label: "Paper" },
              ],
            },
          ]}
        />
        <ul className="mt-10 grid gap-3 md:grid-cols-2">
          {categories.map((c) => (
            <li key={c.id} className="border border-[var(--line)] p-4">
              <p className="font-[family-name:var(--font-syne)] text-xl font-bold">{c.name}</p>
              <p className="mt-1 text-sm text-muted">{c.description}</p>
              <p className="mt-2 font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.14em] text-radio">
                /category/{c.slug} · {c.accent}
              </p>
            </li>
          ))}
        </ul>
      </main>
    </SiteShell>
  );
}
