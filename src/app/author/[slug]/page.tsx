import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { FeedCard } from "@/components/ui/ArticleCard";
import { getAuthor, getAuthors, getByAuthor } from "@/cms/store";

export const revalidate = 60;

export function generateStaticParams() {
  return getAuthors().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return { title: "Author" };
  return { title: author.name, description: author.bio };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();
  const articles = getByAuthor(slug);

  return (
    <SiteShell title={author.name}>
      <main id="main" className="mx-auto max-w-[1440px] px-4 py-12 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end">
          <Image
            src={author.avatar.url}
            alt={author.avatar.alt}
            width={160}
            height={160}
            className="size-40 object-cover"
          />
          <div>
            <p className="font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.2em] text-radio">
              {author.role}
            </p>
            <h1 className="mt-2 font-[family-name:var(--font-syne)] text-5xl font-extrabold uppercase tracking-tight md:text-7xl">
              {author.name}
            </h1>
            <p className="mt-4 max-w-[56ch] text-[16px] leading-relaxed text-[#c8c8ce]">
              {author.bio}
            </p>
          </div>
        </div>
        <div className="mt-12">
          {articles.map((a) => (
            <FeedCard key={a.id} article={a} />
          ))}
        </div>
      </main>
    </SiteShell>
  );
}
