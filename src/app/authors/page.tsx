import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { getAuthors } from "@/cms/store";

export const metadata: Metadata = { title: "Masthead" };

export default function AuthorsPage() {
  const authors = getAuthors();
  return (
    <SiteShell title="Masthead">
      <main id="main" className="mx-auto max-w-[1440px] px-4 py-12 md:px-8">
        <h1 className="font-[family-name:var(--font-syne)] text-5xl font-extrabold uppercase tracking-tight md:text-7xl">
          Masthead
        </h1>
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map((a) => (
            <li key={a.id} className="border border-[var(--line)] p-5">
              <Link href={`/author/${a.slug}`} className="block hover:text-radio">
                <Image
                  src={a.avatar.url}
                  alt={a.avatar.alt}
                  width={400}
                  height={400}
                  className="aspect-square w-full object-cover"
                />
                <p className="mt-4 font-[family-name:var(--font-syne)] text-2xl font-extrabold uppercase">
                  {a.name}
                </p>
                <p className="mt-1 font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.16em] text-muted">
                  {a.role}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </SiteShell>
  );
}
