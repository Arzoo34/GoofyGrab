"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type {
  Article,
  Author,
  Category,
  ContentBlock,
  MediaAsset,
  PublishStatus,
  Tag,
} from "@/types/cms";
import { CONTENT_BLOCKS } from "@/cms/collections";

type Props = {
  article?: Article;
  authors: Author[];
  categories: Category[];
  tags: Tag[];
  media: MediaAsset[];
  articles: { id: string; title: string; slug: string }[];
};

const STATUSES: PublishStatus[] = ["draft", "review", "scheduled", "published"];

const emptyParagraph = (): ContentBlock => ({
  type: "paragraph",
  id: `blk-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
  html: "",
});

function newBlock(type: ContentBlock["type"], media: MediaAsset[]): ContentBlock {
  const id = `blk-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  switch (type) {
    case "paragraph":
      return { type, id, html: "" };
    case "heading":
      return { type, id, level: 2, text: "", anchor: "" };
    case "image":
      return { type, id, media: media[0] };
    case "gallery":
      return { type, id, items: media.slice(0, 2) };
    case "quote":
      return { type, id, text: "", cite: "" };
    case "video":
      return { type, id, provider: "youtube", videoId: "", title: "" };
    case "embed":
      return { type, id, url: "", title: "" };
    case "code":
      return { type, id, language: "ts", filename: "", code: "" };
    case "list":
      return { type, id, ordered: false, items: [""] };
    case "callout":
      return { type, id, tone: "info", title: "", body: "" };
    case "related":
      return { type, id, articleIds: [] };
  }
}

export function ArticleEditor({
  article,
  authors,
  categories,
  tags,
  media,
  articles,
}: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? "");
  const [dek, setDek] = useState(article?.dek ?? "");
  const [authorId, setAuthorId] = useState(article?.authorId ?? authors[0]?.id ?? "");
  const [categoryId, setCategoryId] = useState(article?.categoryId ?? categories[0]?.id ?? "");
  const [tagIds, setTagIds] = useState<string[]>(article?.tagIds ?? []);
  const [status, setStatus] = useState<PublishStatus>(article?.status ?? "draft");
  const [scheduledFor, setScheduledFor] = useState(article?.scheduledFor ?? "");
  const [featured, setFeatured] = useState(article?.featured ?? false);
  const [breaking, setBreaking] = useState(article?.breaking ?? false);
  const [trending, setTrending] = useState(article?.trending ?? false);
  const [editorPick, setEditorPick] = useState(article?.editorPick ?? false);
  const [sponsored, setSponsored] = useState(article?.sponsored ?? false);
  const [sponsorName, setSponsorName] = useState(article?.sponsorName ?? "");
  const [heroId, setHeroId] = useState(article?.heroImage.id ?? media[0]?.id ?? "");
  const [relatedIds, setRelatedIds] = useState<string[]>(article?.relatedArticleIds ?? []);
  const [blocks, setBlocks] = useState<ContentBlock[]>(
    article?.contentBlocks?.length ? article.contentBlocks : [emptyParagraph()],
  );
  const [metaTitle, setMetaTitle] = useState(article?.seo.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(article?.seo.metaDescription ?? "");
  const [ogTitle, setOgTitle] = useState(article?.seo.ogTitle ?? "");
  const [ogDescription, setOgDescription] = useState(article?.seo.ogDescription ?? "");
  const [canonicalUrl, setCanonicalUrl] = useState(article?.seo.canonicalUrl ?? "");
  const [noIndex, setNoIndex] = useState(article?.seo.noIndex ?? false);
  const [noFollow, setNoFollow] = useState(article?.seo.noFollow ?? false);
  const [linkQuery, setLinkQuery] = useState("");
  const [linkTarget, setLinkTarget] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const hero = media.find((m) => m.id === heroId) ?? media[0];
  const linkHits = useMemo(() => {
    const q = linkQuery.toLowerCase();
    if (!q) return articles.slice(0, 6);
    return articles.filter((a) => a.title.toLowerCase().includes(q) || a.slug.includes(q)).slice(0, 8);
  }, [linkQuery, articles]);

  function patchBlock(id: string, next: ContentBlock) {
    setBlocks((prev) => prev.map((b) => (b.id === id ? next : b)));
  }

  function insertInternalLink(href: string, label: string) {
    if (!linkTarget) return;
    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id !== linkTarget || b.type !== "paragraph") return b;
        const anchor = `<a href="${href}">${label}</a>`;
        return { ...b, html: b.html ? `${b.html} ${anchor}` : anchor };
      }),
    );
    setLinkQuery("");
  }

  async function save(nextStatus?: PublishStatus) {
    setBusy(true);
    setMessage("");
    const payload = {
      id: article?.id,
      title,
      slug,
      excerpt,
      dek,
      heroImage: hero,
      contentBlocks: blocks,
      authorId,
      categoryId,
      tagIds,
      status: nextStatus ?? status,
      scheduledFor: scheduledFor || undefined,
      featured,
      breaking,
      trending,
      editorPick,
      sponsored,
      sponsorName: sponsored ? sponsorName : undefined,
      relatedArticleIds: relatedIds,
      seo: {
        metaTitle: metaTitle || `${title} — Goofygrab`,
        metaDescription: metaDescription || excerpt,
        ogTitle: ogTitle || title,
        ogDescription: ogDescription || excerpt,
        ogImage: hero,
        canonicalUrl: canonicalUrl || undefined,
        noIndex,
        noFollow,
      },
    };
    const url = article?.id ? `/api/cms/articles/${article.id}` : "/api/cms/articles";
    const res = await fetch(url, {
      method: article?.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setMessage(data.error || "Save failed");
      return;
    }
    setMessage(nextStatus === "published" ? "Published. Cache revalidated." : "Saved.");
    if (!article?.id && data.article?.id) {
      router.push(`/cms/articles/${data.article.id}`);
    }
    router.refresh();
  }

  const field =
    "h-11 w-full border border-[var(--line)] bg-transparent px-3 text-sm text-paper outline-none focus:border-radio";
  const label = "mb-1 block font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.16em] text-muted";

  return (
    <form
      className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]"
      onSubmit={(e) => {
        e.preventDefault();
        void save();
      }}
    >
      <div className="space-y-6">
        <div>
          <label className={label} htmlFor="title">
            Title
          </label>
          <input
            id="title"
            className={`${field} h-auto py-3 font-[family-name:var(--font-syne)] text-3xl font-extrabold`}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!article) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-"));
            }}
            required
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={label} htmlFor="slug">
              Slug
            </label>
            <input id="slug" className={field} value={slug} onChange={(e) => setSlug(e.target.value)} />
          </div>
          <div>
            <label className={label} htmlFor="dek">
              Subheadline
            </label>
            <input id="dek" className={field} value={dek} onChange={(e) => setDek(e.target.value)} />
          </div>
        </div>
        <div>
          <label className={label} htmlFor="excerpt">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            className={`${field} h-24 py-2`}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </div>

        <section className="border border-[var(--line)] p-4">
          <p className={label}>Content blocks</p>
          <div className="mb-4 flex flex-wrap gap-2">
            {CONTENT_BLOCKS.map((type) => (
              <button
                key={type}
                type="button"
                className="border border-[var(--line)] px-2 py-1 font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.12em] hover:border-radio hover:text-radio"
                onClick={() => setBlocks((b) => [...b, newBlock(type, media)])}
              >
                + {type}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            {blocks.map((block, i) => (
              <div key={block.id} className="border border-[var(--line)] p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.16em] text-radio">
                    {String(i + 1).padStart(2, "0")} {block.type}
                  </span>
                  <button
                    type="button"
                    className="text-[11px] text-muted hover:text-radio"
                    onClick={() => setBlocks((prev) => prev.filter((b) => b.id !== block.id))}
                  >
                    Remove
                  </button>
                </div>
                <BlockFields
                  block={block}
                  media={media}
                  articles={articles}
                  onChange={(next) => patchBlock(block.id, next)}
                  onLink={() => setLinkTarget(block.id)}
                />
              </div>
            ))}
          </div>
        </section>

        {linkTarget && (
          <section className="border border-radio p-4">
            <p className={label}>Insert internal link</p>
            <input
              className={field}
              value={linkQuery}
              onChange={(e) => setLinkQuery(e.target.value)}
              placeholder="Search Goofygrab stories"
              aria-label="Search stories to link"
            />
            <ul className="mt-3 space-y-1">
              {linkHits.map((a) => (
                <li key={a.id}>
                  <button
                    type="button"
                    className="w-full px-2 py-2 text-left hover:bg-paper/5"
                    onClick={() => insertInternalLink(`/article/${a.slug}`, a.title)}
                  >
                    {a.title}
                  </button>
                </li>
              ))}
            </ul>
            <button type="button" className="mt-2 text-xs text-muted" onClick={() => setLinkTarget(null)}>
              Close
            </button>
          </section>
        )}

        <section className="border border-[var(--line)] p-4">
          <p className={label}>SEO</p>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={label} htmlFor="metaTitle">
                Meta title
              </label>
              <input id="metaTitle" className={field} value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
            </div>
            <div>
              <label className={label} htmlFor="ogTitle">
                OG title
              </label>
              <input id="ogTitle" className={field} value={ogTitle} onChange={(e) => setOgTitle(e.target.value)} />
            </div>
            <div>
              <label className={label} htmlFor="metaDescription">
                Meta description
              </label>
              <textarea
                id="metaDescription"
                className={`${field} h-20 py-2`}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
              />
            </div>
            <div>
              <label className={label} htmlFor="ogDescription">
                OG description
              </label>
              <textarea
                id="ogDescription"
                className={`${field} h-20 py-2`}
                value={ogDescription}
                onChange={(e) => setOgDescription(e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className={label} htmlFor="canonical">
                Canonical URL
              </label>
              <input
                id="canonical"
                className={field}
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-3 flex gap-4 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={noIndex} onChange={(e) => setNoIndex(e.target.checked)} />
              noIndex
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={noFollow} onChange={(e) => setNoFollow(e.target.checked)} />
              noFollow
            </label>
          </div>
        </section>
      </div>

      <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
        <div className="border border-[var(--line)] p-4">
          <p className={label}>Publish</p>
          <select className={field} value={status} onChange={(e) => setStatus(e.target.value as PublishStatus)}>
            {STATUSES.map((s) => (
              <option key={s} value={s} className="bg-void">
                {s}
              </option>
            ))}
          </select>
          {status === "scheduled" && (
            <input
              type="datetime-local"
              className={`${field} mt-3`}
              value={scheduledFor ? scheduledFor.slice(0, 16) : ""}
              onChange={(e) => setScheduledFor(e.target.value ? new Date(e.target.value).toISOString() : "")}
            />
          )}
          <div className="mt-4 flex flex-col gap-2">
            <button
              type="submit"
              disabled={busy}
              className="h-11 bg-paper font-[family-name:var(--font-grotesk)] text-xs font-bold uppercase tracking-[0.14em] text-void hover:bg-radio disabled:opacity-50"
            >
              Save draft
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => void save("review")}
              className="h-11 border border-[var(--line)] text-xs font-bold uppercase tracking-[0.14em] hover:border-volt"
            >
              Send to review
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => void save("published")}
              className="h-11 bg-radio font-[family-name:var(--font-grotesk)] text-xs font-bold uppercase tracking-[0.14em] text-void hover:bg-volt disabled:opacity-50"
            >
              Publish
            </button>
            {slug && (
              <Link
                href={`/article/${slug}`}
                className="grid h-11 place-items-center border border-radio text-xs font-bold uppercase tracking-[0.14em] text-radio"
              >
                Preview
              </Link>
            )}
          </div>
          {message && <p className="mt-3 text-sm text-radio">{message}</p>}
        </div>

        <div className="border border-[var(--line)] p-4">
          <label className={label} htmlFor="author">
            Author
          </label>
          <select id="author" className={field} value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
            {authors.map((a) => (
              <option key={a.id} value={a.id} className="bg-void">
                {a.name}
              </option>
            ))}
          </select>
          <label className={`${label} mt-4`} htmlFor="category">
            Category
          </label>
          <select id="category" className={field} value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            {categories.map((c) => (
              <option key={c.id} value={c.id} className="bg-void">
                {c.name}
              </option>
            ))}
          </select>
          <p className={`${label} mt-4`}>Tags</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => {
              const on = tagIds.includes(t.id);
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() =>
                    setTagIds((prev) => (on ? prev.filter((id) => id !== t.id) : [...prev, t.id]))
                  }
                  className={`px-2 py-1 text-[11px] uppercase tracking-[0.1em] ${
                    on ? "bg-radio text-void" : "border border-[var(--line)]"
                  }`}
                >
                  {t.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="border border-[var(--line)] p-4">
          <p className={label}>Hero image</p>
          <select className={field} value={heroId} onChange={(e) => setHeroId(e.target.value)}>
            {media.map((m) => (
              <option key={m.id} value={m.id} className="bg-void">
                {m.filename} · {m.width}×{m.height}
              </option>
            ))}
          </select>
          {hero && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={hero.url} alt={hero.alt} width={hero.width} height={hero.height} className="mt-3 w-full" />
          )}
        </div>

        <div className="border border-[var(--line)] p-4 space-y-2 text-sm">
          {[
            ["Featured", featured, setFeatured],
            ["Breaking", breaking, setBreaking],
            ["Trending", trending, setTrending],
            ["Editor pick", editorPick, setEditorPick],
            ["Sponsored", sponsored, setSponsored],
          ].map(([labelText, value, setter]) => (
            <label key={String(labelText)} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={value as boolean}
                onChange={(e) => (setter as (v: boolean) => void)(e.target.checked)}
              />
              {labelText as string}
            </label>
          ))}
          {sponsored && (
            <input
              className={field}
              placeholder="Sponsor name"
              value={sponsorName}
              onChange={(e) => setSponsorName(e.target.value)}
            />
          )}
        </div>

        <div className="border border-[var(--line)] p-4">
          <p className={label}>Related articles</p>
          <select
            className={field}
            value=""
            onChange={(e) => {
              if (e.target.value && !relatedIds.includes(e.target.value)) {
                setRelatedIds((p) => [...p, e.target.value]);
              }
            }}
          >
            <option value="">Add related…</option>
            {articles
              .filter((a) => a.id !== article?.id)
              .map((a) => (
                <option key={a.id} value={a.id} className="bg-void">
                  {a.title}
                </option>
              ))}
          </select>
          <ul className="mt-2 space-y-1 text-sm">
            {relatedIds.map((id) => {
              const a = articles.find((x) => x.id === id);
              return (
                <li key={id} className="flex justify-between gap-2">
                  <span>{a?.title ?? id}</span>
                  <button type="button" onClick={() => setRelatedIds((p) => p.filter((x) => x !== id))}>
                    ×
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </form>
  );
}

function BlockFields({
  block,
  media,
  articles,
  onChange,
  onLink,
}: {
  block: ContentBlock;
  media: MediaAsset[];
  articles: { id: string; title: string; slug: string }[];
  onChange: (next: ContentBlock) => void;
  onLink: () => void;
}) {
  const field =
    "w-full border border-[var(--line)] bg-transparent px-3 py-2 text-sm text-paper outline-none focus:border-radio";
  switch (block.type) {
    case "paragraph":
      return (
        <div>
          <textarea
            className={`${field} min-h-28`}
            value={block.html}
            onChange={(e) => onChange({ ...block, html: e.target.value })}
            placeholder="Write the paragraph. Use Insert link to search the Goofygrab database."
          />
          <button type="button" onClick={onLink} className="mt-2 text-[11px] uppercase tracking-[0.12em] text-radio">
            Insert link
          </button>
        </div>
      );
    case "heading":
      return (
        <div className="flex gap-2">
          <select
            className={field}
            value={block.level}
            onChange={(e) => onChange({ ...block, level: Number(e.target.value) as 2 | 3 })}
          >
            <option value={2}>H2</option>
            <option value={3}>H3</option>
          </select>
          <input
            className={field}
            value={block.text}
            onChange={(e) => onChange({ ...block, text: e.target.value })}
            placeholder="Heading"
          />
        </div>
      );
    case "image":
      return (
        <select
          className={field}
          value={block.media.id}
          onChange={(e) => {
            const m = media.find((x) => x.id === e.target.value);
            if (m) onChange({ ...block, media: m });
          }}
        >
          {media.map((m) => (
            <option key={m.id} value={m.id} className="bg-void">
              {m.alt} ({m.width}×{m.height})
            </option>
          ))}
        </select>
      );
    case "quote":
      return (
        <div className="space-y-2">
          <textarea className={field} value={block.text} onChange={(e) => onChange({ ...block, text: e.target.value })} />
          <input
            className={field}
            placeholder="Citation"
            value={block.cite ?? ""}
            onChange={(e) => onChange({ ...block, cite: e.target.value })}
          />
        </div>
      );
    case "video":
      return (
        <div className="grid gap-2 md:grid-cols-2">
          <input
            className={field}
            placeholder="YouTube ID"
            value={block.videoId}
            onChange={(e) => onChange({ ...block, videoId: e.target.value })}
          />
          <input
            className={field}
            placeholder="Title"
            value={block.title}
            onChange={(e) => onChange({ ...block, title: e.target.value })}
          />
        </div>
      );
    case "embed":
      return (
        <div className="grid gap-2">
          <input className={field} placeholder="URL" value={block.url} onChange={(e) => onChange({ ...block, url: e.target.value })} />
          <input className={field} placeholder="Title" value={block.title} onChange={(e) => onChange({ ...block, title: e.target.value })} />
        </div>
      );
    case "code":
      return (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <input className={field} value={block.language} onChange={(e) => onChange({ ...block, language: e.target.value })} />
            <input className={field} value={block.filename ?? ""} onChange={(e) => onChange({ ...block, filename: e.target.value })} />
          </div>
          <textarea className={`${field} min-h-32 font-[family-name:var(--font-plex)]`} value={block.code} onChange={(e) => onChange({ ...block, code: e.target.value })} />
        </div>
      );
    case "list":
      return (
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={block.ordered}
              onChange={(e) => onChange({ ...block, ordered: e.target.checked })}
            />
            Numbered
          </label>
          <textarea
            className={`${field} min-h-24`}
            value={block.items.join("\n")}
            onChange={(e) => onChange({ ...block, items: e.target.value.split("\n") })}
          />
        </div>
      );
    case "callout":
      return (
        <div className="space-y-2">
          <select
            className={field}
            value={block.tone}
            onChange={(e) => onChange({ ...block, tone: e.target.value as "info" | "warn" | "tip" })}
          >
            <option value="info">Info</option>
            <option value="warn">Warn</option>
            <option value="tip">Tip</option>
          </select>
          <input className={field} value={block.title} onChange={(e) => onChange({ ...block, title: e.target.value })} />
          <textarea className={field} value={block.body} onChange={(e) => onChange({ ...block, body: e.target.value })} />
        </div>
      );
    case "gallery":
      return (
        <div className="space-y-2">
          <p className="text-xs text-muted">Select two or more assets. Width and height stay locked.</p>
          <select
            className={field}
            multiple
            value={block.items.map((m) => m.id)}
            onChange={(e) => {
              const ids = Array.from(e.target.selectedOptions).map((o) => o.value);
              const items = media.filter((m) => ids.includes(m.id));
              onChange({ ...block, items: items.length ? items : block.items });
            }}
          >
            {media.map((m) => (
              <option key={m.id} value={m.id} className="bg-void">
                {m.alt} ({m.width}×{m.height})
              </option>
            ))}
          </select>
        </div>
      );
    case "related":
      return (
        <select
          className={field}
          multiple
          value={block.articleIds}
          onChange={(e) =>
            onChange({
              ...block,
              articleIds: Array.from(e.target.selectedOptions).map((o) => o.value),
            })
          }
        >
          {articles.map((a) => (
            <option key={a.id} value={a.id} className="bg-void">
              {a.title}
            </option>
          ))}
        </select>
      );
    default:
      return null;
  }
}
