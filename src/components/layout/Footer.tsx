import Link from "next/link";
import { MORE_NAV, NAV } from "@/lib/site";
import { NewsletterForm } from "./NewsletterForm";
import type { SiteSettings } from "@/types/cms";

export function Footer({ settings }: { settings: SiteSettings }) {
  const links = [...NAV, ...MORE_NAV];
  return (
    <footer className="mt-24 border-t border-[var(--line)] bg-void">
      <div className="overflow-hidden border-b border-[var(--line)] py-6">
        <div className="marquee-track font-[family-name:var(--font-syne)] text-[72px] font-extrabold uppercase leading-none tracking-tight text-paper/10 md:text-[120px]">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="mx-8">
              Goofygrab —
            </span>
          ))}
        </div>
      </div>
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-[family-name:var(--font-syne)] text-3xl font-extrabold uppercase tracking-tight">
            {settings.tagline}
          </p>
          <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-[#c8c8ce]">
            {settings.description}
          </p>
          <NewsletterForm blurb={settings.newsletterBlurb} />
        </div>
        <div>
          <p className="font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.2em] text-muted">
            Desks
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="font-[family-name:var(--font-grotesk)] text-sm uppercase tracking-[0.08em] text-paper hover:text-radio"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.2em] text-muted">
            Masthead
          </p>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            <li>
              <Link href="/authors" className="hover:text-radio">
                Authors
              </Link>
            </li>
            <li>
              <Link href="/cms" className="hover:text-radio">
                Newsroom CMS
              </Link>
            </li>
            <li>
              <Link href="/cms/articles/new" className="hover:text-radio">
                Write a story
              </Link>
            </li>
            <li>
              <a href="/rss.xml" className="hover:text-radio">
                RSS
              </a>
            </li>
            {settings.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="hover:text-radio">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="border-t border-[var(--line)] px-4 py-6 font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.16em] text-muted md:px-8">
        © {new Date().getFullYear()} Goofygrab Press · Independent editorial · No layout shift ads
      </p>
    </footer>
  );
}
