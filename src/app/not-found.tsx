import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";

export default function NotFound() {
  return (
    <SiteShell title="404">
      <main id="main" className="mx-auto max-w-[1440px] px-4 py-24 md:px-8">
        <p className="font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.22em] text-radio">
          404
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-syne)] text-6xl font-extrabold uppercase leading-[0.9] tracking-tight md:text-[96px]">
          This story fell off the desk.
        </h1>
        <Link
          href="/"
          className="mt-8 inline-flex border border-radio px-5 py-3 font-[family-name:var(--font-grotesk)] text-xs font-bold uppercase tracking-[0.16em] text-radio hover:bg-radio hover:text-void"
        >
          Back to homepage
        </Link>
      </main>
    </SiteShell>
  );
}
