import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { Headline } from "@/components/motion/Headline";
import { getAuthors, getSettings } from "@/cms/store";

export const metadata: Metadata = {
  title: "About",
  description:
    "Goofygrab is an independent technology and media publication. Masthead, mission, and how the newsroom works.",
};

export default function AboutPage() {
  const settings = getSettings();
  const authors = getAuthors();

  return (
    <SiteShell title="About">
      <main id="main" className="mx-auto max-w-[1440px] px-4 py-12 md:px-8">
        <p className="font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.22em] text-radio">
          Masthead
        </p>
        <Headline
          text="A magazine that still has desks."
          className="mt-3 max-w-[16ch] font-[family-name:var(--font-syne)] text-[48px] font-extrabold uppercase leading-[0.88] tracking-tight md:text-[84px]"
        />
        <p className="mt-6 max-w-[62ch] text-[18px] leading-relaxed text-[#c8c8ce] md:text-[20px]">
          {settings.description} We publish reported stories, scored reviews, and
          field notes — not a firehose. Ads never shift the layout. Analytics stay
          on-device unless you opt into a briefing.
        </p>
        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            ["Editorial", "Desks for AI, security, gadgets, business, gaming, and how-to. Editors never touch code."],
            ["Performance", "RSC by default. GSAP and Lenis load only where motion earns its keep. Ads reserve exact pixels."],
            ["Independence", "House ads and labeled sponsorships. No third-party pixels in the reading column."],
          ].map(([title, body]) => (
            <div key={title} className="border border-[var(--line)] p-6">
              <h2 className="font-[family-name:var(--font-syne)] text-2xl font-extrabold uppercase">
                {title}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#c8c8ce]">{body}</p>
            </div>
          ))}
        </section>
        <section className="mt-16">
          <h2 className="font-[family-name:var(--font-syne)] text-3xl font-extrabold uppercase">
            Who writes it
          </h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {authors.map((a) => (
              <li key={a.id} className="border-b border-[var(--line)] py-4">
                <Link href={`/author/${a.slug}`} className="hover:text-radio">
                  <span className="font-[family-name:var(--font-syne)] text-xl font-bold">
                    {a.name}
                  </span>
                  <span className="mt-1 block font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.14em] text-muted">
                    {a.role}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </SiteShell>
  );
}
