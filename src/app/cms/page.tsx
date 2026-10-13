import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { CmsNav } from "@/components/cms/CmsNav";
import { ARTICLE_FIELDS, COLLECTIONS, GLOBALS, SEO_FIELDS } from "@/cms/collections";
import {
  getAllArticles,
  getAdSettings,
  getNewsletterSettings,
  getSettings,
  getSnapshot,
} from "@/cms/store";
import { formatDate } from "@/lib/format";
import { AD_NETWORKS, AD_PLACEMENTS, AD_SIZES } from "@/lib/ads";

export const metadata: Metadata = {
  title: "Newsroom CMS",
  robots: { index: false, follow: false },
};

const WORKFLOW = ["draft", "review", "scheduled", "published"] as const;

export default function CmsPage() {
  const snap = getSnapshot();
  const articles = getAllArticles();
  const settings = getSettings();
  const ads = getAdSettings();
  const newsletter = getNewsletterSettings();

  return (
    <SiteShell title="Newsroom CMS">
      <main id="main" className="mx-auto max-w-[1440px] px-4 py-12 md:px-8">
        <CmsNav current="/cms" />
        <p className="font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.22em] text-radio">
          Payload-shaped newsroom
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-syne)] text-5xl font-extrabold uppercase leading-[0.9] tracking-tight md:text-7xl">
          Editors never touch code
        </h1>
        <p className="mt-5 max-w-[64ch] text-[17px] leading-relaxed text-[#c8c8ce]">
          Create stories, upload media, schedule, and publish from this desk.
          Structured blocks — not a giant HTML blob. Publishing revalidates the
          Next.js cache without a redeploy. {settings.name} collections match
          Payload + PostgreSQL + S3 in production.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/cms/articles/new"
            className="bg-radio px-5 py-3 font-[family-name:var(--font-grotesk)] text-xs font-bold uppercase tracking-[0.14em] text-void hover:bg-volt"
          >
            New article
          </Link>
          <Link
            href="/cms/media"
            className="border border-[var(--line)] px-5 py-3 font-[family-name:var(--font-grotesk)] text-xs font-bold uppercase tracking-[0.14em] hover:border-radio"
          >
            Media library
          </Link>
        </div>

        <section className="mt-12 grid gap-4 md:grid-cols-4">
          {[
            ["Collections", Object.keys(COLLECTIONS).length],
            ["Stories", articles.length],
            ["Users", snap.users.length],
            ["Placements", AD_PLACEMENTS.length],
          ].map(([label, n]) => (
            <div key={String(label)} className="border border-[var(--line)] p-5">
              <p className="font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.16em] text-muted">
                {label}
              </p>
              <p className="mt-2 font-[family-name:var(--font-syne)] text-5xl font-extrabold text-radio">
                {n}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-14">
          <h2 className="font-[family-name:var(--font-syne)] text-3xl font-extrabold uppercase">
            Publishing workflow
          </h2>
          <ol className="mt-6 grid gap-3 md:grid-cols-4">
            {WORKFLOW.map((s, i) => (
              <li key={s} className="border border-[var(--line)] p-4">
                <span className="font-[family-name:var(--font-plex)] text-[11px] text-radio">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 font-[family-name:var(--font-grotesk)] text-lg font-bold uppercase">
                  {s}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {articles.filter((a) => a.status === s).length} stories
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-[family-name:var(--font-syne)] text-3xl font-extrabold uppercase">
              Inventory
            </h2>
            <Link href="/cms/articles/new" className="text-sm text-radio hover:underline">
              Write
            </Link>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.14em] text-muted">
                <tr className="border-b border-[var(--line)]">
                  <th className="py-3 pr-4">Title</th>
                  <th className="py-3 pr-4">Desk</th>
                  <th className="py-3 pr-4">Author</th>
                  <th className="py-3 pr-4">Flags</th>
                  <th className="py-3 pr-4">Status</th>
                  <th className="py-3">Updated</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((a) => (
                  <tr key={a.id} className="border-b border-[var(--line)]">
                    <td className="py-3 pr-4">
                      <Link href={`/cms/articles/${a.id}`} className="hover:text-radio">
                        {a.title}
                      </Link>
                    </td>
                    <td className="py-3 pr-4 text-muted">{a.category.name}</td>
                    <td className="py-3 pr-4 text-muted">{a.author.name}</td>
                    <td className="py-3 pr-4 font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.1em] text-radio">
                      {[
                        a.featured && "featured",
                        a.breaking && "breaking",
                        a.trending && "trending",
                        a.editorPick && "pick",
                        a.sponsored && "sponsored",
                      ]
                        .filter(Boolean)
                        .join(" · ") || "—"}
                    </td>
                    <td className="py-3 pr-4 text-radio">{a.status}</td>
                    <td className="py-3 text-muted">{formatDate(a.updatedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-[family-name:var(--font-syne)] text-3xl font-extrabold uppercase">
              Article + SEO fields
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {[...ARTICLE_FIELDS, ...SEO_FIELDS].map((f) => (
                <li
                  key={f}
                  className="border border-[var(--line)] px-3 py-1 font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.12em]"
                >
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">Globals: {GLOBALS.join(" · ")}</p>
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-syne)] text-3xl font-extrabold uppercase">
              Ad settings
            </h2>
            <p className="mt-3 text-sm text-[#c8c8ce]">
              Default network: {ads.defaultNetwork}. AdSense {ads.adsensePublisherId}. GAM{" "}
              {ads.gamNetworkCode}. House: {ads.houseAdvertiser}. Sponsored content{" "}
              {ads.allowSponsored ? "allowed and labeled" : "off"}.
            </p>
            <p className="mt-2 text-sm text-muted">
              Networks: {AD_NETWORKS.map((n) => n.label).join(" · ")}
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-[11px] uppercase tracking-[0.1em]">
              {AD_PLACEMENTS.map((p) => (
                <li key={p} className="border border-[var(--line)] px-2 py-2">
                  {p}
                  <span className="mt-1 block text-muted">
                    {AD_SIZES[p].width}×{AD_SIZES[p].height} reserved
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-14 border border-[var(--line)] p-6">
          <h2 className="font-[family-name:var(--font-syne)] text-2xl font-extrabold uppercase">
            Newsletter
          </h2>
          <p className="mt-2 text-sm text-[#c8c8ce]">
            {newsletter.fromName} · {newsletter.fromEmail} · double opt-in{" "}
            {newsletter.doubleOptIn ? "on" : "off"}
          </p>
          <p className="mt-2 max-w-[60ch] text-sm text-muted">{newsletter.blurb}</p>
        </section>
      </main>
    </SiteShell>
  );
}
