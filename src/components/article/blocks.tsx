import Image from "next/image";
import Link from "next/link";
import { AdSlot } from "@/components/ads/AdSlot";
import { ARTICLE_IN_CONTENT } from "@/lib/ads";
import { getPublishedArticles } from "@/cms/store";
import type { ContentBlock, HydratedArticle, MediaAsset } from "@/types/cms";

function Paragraph({ html }: { html: string }) {
  return <p className="prose-gg" dangerouslySetInnerHTML={{ __html: html }} />;
}

function HeadingBlock({
  level,
  text,
  anchor,
}: {
  level: 2 | 3;
  text: string;
  anchor: string;
}) {
  const cls =
    "scroll-mt-24 font-[family-name:var(--font-syne)] font-extrabold tracking-tight text-ink";
  if (level === 2) {
    return (
      <h2 id={anchor} className={`${cls} mt-12 text-[32px] leading-[1.1] md:text-[40px]`}>
        {text}
      </h2>
    );
  }
  return (
    <h3 id={anchor} className={`${cls} mt-8 text-[24px] leading-[1.15]`}>
      {text}
    </h3>
  );
}

function ImageBlock({ media }: { media: MediaAsset }) {
  return (
    <figure className="my-10">
      <Image
        src={media.url}
        alt={media.alt}
        width={media.width}
        height={media.height}
        className="h-auto w-full"
        sizes="(max-width: 760px) 100vw, 740px"
      />
      {(media.caption || media.credit) && (
        <figcaption className="mt-2 font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.12em] text-[#5c5c64]">
          {media.caption} {media.credit && `· ${media.credit}`}
        </figcaption>
      )}
    </figure>
  );
}

function QuoteBlock({ text, cite }: { text: string; cite?: string }) {
  return (
    <blockquote className="my-12 border-l-4 border-acid pl-6">
      <p className="font-[family-name:var(--font-syne)] text-[28px] font-bold leading-[1.2] tracking-tight text-ink md:text-[36px]">
        {text}
      </p>
      {cite && (
        <footer className="mt-3 font-[family-name:var(--font-plex)] text-[12px] uppercase tracking-[0.16em] text-[#5c5c64]">
          {cite}
        </footer>
      )}
    </blockquote>
  );
}

function ListBlock({ ordered, items }: { ordered: boolean; items: string[] }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag
      className={`my-8 space-y-2 pl-6 text-[18px] leading-relaxed text-ink md:text-[20px] ${
        ordered ? "list-decimal" : "list-disc"
      }`}
    >
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </Tag>
  );
}

function CodeBlock({
  language,
  filename,
  code,
}: {
  language: string;
  filename?: string;
  code: string;
}) {
  return (
    <figure className="my-10 overflow-hidden border border-ink bg-void text-paper">
      <figcaption className="flex items-center justify-between border-b border-[var(--line)] px-4 py-2 font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.16em] text-radio">
        <span>{filename ?? language}</span>
        <span>{language}</span>
      </figcaption>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code className="font-[family-name:var(--font-plex)]">{code}</code>
      </pre>
    </figure>
  );
}

function Callout({
  tone,
  title,
  body,
}: {
  tone: "info" | "warn" | "tip";
  title: string;
  body: string;
}) {
  const map = {
    info: "border-volt bg-volt/15",
    warn: "border-[#ff4d2e] bg-[#ff4d2e]/10",
    tip: "border-radio bg-radio/20",
  };
  return (
    <aside className={`my-10 border-2 px-5 py-4 ${map[tone]}`}>
      <p className="font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.18em] text-ink">
        {title}
      </p>
      <p className="mt-2 text-[17px] leading-relaxed text-ink">{body}</p>
    </aside>
  );
}

function VideoBlock({ videoId, title }: { videoId: string; title: string }) {
  return (
    <div className="relative my-10 aspect-video w-full overflow-hidden bg-ink">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={title}
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}

function RelatedById({ ids }: { ids: string[] }) {
  const all = getPublishedArticles();
  const picked = ids
    .map((id) => all.find((a) => a.id === id))
    .filter((a): a is HydratedArticle => Boolean(a));
  if (!picked.length) return null;
  return (
    <aside className="my-12 border-2 border-ink bg-paper p-5">
      <p className="font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.18em] text-acid">
        Related
      </p>
      <ul className="mt-3 space-y-2">
        {picked.map((a) => (
          <li key={a.id}>
            <Link
              href={`/article/${a.slug}`}
              className="font-[family-name:var(--font-syne)] text-xl font-bold leading-tight text-ink hover:text-acid"
            >
              {a.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return <Paragraph html={block.html} />;
    case "heading":
      return <HeadingBlock level={block.level} text={block.text} anchor={block.anchor} />;
    case "image":
      return <ImageBlock media={block.media} />;
    case "gallery":
      return (
        <div className="my-10 grid grid-cols-2 gap-2">
          {block.items.map((m) => (
            <figure key={m.id}>
              <Image
                src={m.url}
                alt={m.alt}
                width={m.width}
                height={m.height}
                className="h-auto w-full"
                sizes="370px"
              />
              {m.caption && (
                <figcaption className="mt-1 font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.12em] text-[#5c5c64]">
                  {m.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      );
    case "quote":
      return <QuoteBlock text={block.text} cite={block.cite} />;
    case "video":
      return <VideoBlock videoId={block.videoId} title={block.title} />;
    case "embed":
      return (
        <figure className="my-10 border-2 border-ink p-5">
          <p className="font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.16em] text-acid">
            Embed
          </p>
          <a
            href={block.url}
            className="mt-2 block font-[family-name:var(--font-syne)] text-xl font-bold text-ink underline decoration-acid underline-offset-4"
            rel="noopener noreferrer"
          >
            {block.title}
          </a>
          <figcaption className="mt-2 break-all font-[family-name:var(--font-plex)] text-[11px] text-[#5c5c64]">
            {block.url}
          </figcaption>
        </figure>
      );
    case "code":
      return (
        <CodeBlock language={block.language} filename={block.filename} code={block.code} />
      );
    case "list":
      return <ListBlock ordered={block.ordered} items={block.items} />;
    case "callout":
      return <Callout tone={block.tone} title={block.title} body={block.body} />;
    case "related":
      return <RelatedById ids={block.articleIds} />;
    default:
      return null;
  }
}

export function ArticleBlocks({ blocks }: { blocks: ContentBlock[] }) {
  const nodes: React.ReactNode[] = [];

  blocks.forEach((block, i) => {
    nodes.push(<Block key={block.id} block={block} />);
    const placement = ARTICLE_IN_CONTENT[i + 1];
    if (placement && i !== blocks.length - 1) {
      nodes.push(
        <div key={`ad-${block.id}`} className="my-10 flex justify-center">
          <AdSlot placement={placement} />
        </div>,
      );
    }
  });

  return <div className="flex flex-col">{nodes}</div>;
}

export function Toc({ article }: { article: HydratedArticle }) {
  const heads = article.contentBlocks.filter(
    (b): b is Extract<ContentBlock, { type: "heading" }> => b.type === "heading",
  );
  if (!heads.length) return null;
  return (
    <nav aria-label="On this page" className="sticky top-24 hidden xl:block">
      <p className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.2em] text-muted">
        In this story
      </p>
      <ul className="mt-3 space-y-2">
        {heads.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.anchor}`}
              className="font-[family-name:var(--font-grotesk)] text-[13px] text-[#3a3a42] hover:text-acid"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
