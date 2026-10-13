import type {
  AdSettings,
  Article,
  Author,
  Category,
  CmsSnapshot,
  HydratedArticle,
  MediaAsset,
  NewsletterSettings,
  SiteSettings,
  Tag,
  User,
} from "@/types/cms";
import { authors } from "./seed/authors";
import { articles as seedArticles } from "./seed/articles";
import { categories, settings, tags } from "./seed/taxonomy";
import { heroes } from "./seed/media";
import { adSettings, newsletterSettings, users } from "./seed/settings";

const snapshot: CmsSnapshot = {
  settings,
  adSettings,
  newsletterSettings,
  users,
  authors,
  categories,
  tags,
  media: Object.values(heroes),
  articles: seedArticles,
};

export function getSnapshot(): CmsSnapshot {
  return snapshot;
}

export function getSettings() {
  return snapshot.settings;
}

export function getAdSettings() {
  return snapshot.adSettings;
}

export function getNewsletterSettings() {
  return snapshot.newsletterSettings;
}

export function getUsers() {
  return snapshot.users;
}

export function getCategories(): Category[] {
  return snapshot.categories;
}

export function getCategory(slug: string): Category | undefined {
  return snapshot.categories.find((c) => c.slug === slug);
}

export function getAuthors(): Author[] {
  return snapshot.authors;
}

export function getAuthor(slug: string): Author | undefined {
  return snapshot.authors.find((a) => a.slug === slug);
}

export function getTags(): Tag[] {
  return snapshot.tags;
}

export function getTag(slug: string): Tag | undefined {
  return snapshot.tags.find((t) => t.slug === slug);
}

function live(): Article[] {
  const now = Date.now();
  return snapshot.articles
    .filter((a) => {
      if (a.status === "published") return true;
      if (a.status === "scheduled" && a.scheduledFor) {
        return new Date(a.scheduledFor).getTime() <= now;
      }
      return false;
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function hydrate(article: Article): HydratedArticle {
  const author = snapshot.authors.find((a) => a.id === article.authorId);
  const category = snapshot.categories.find((c) => c.id === article.categoryId);
  const articleTags = snapshot.tags.filter((t) => article.tagIds.includes(t.id));
  if (!author || !category) {
    throw new Error(`Broken relations on article ${article.id}`);
  }
  return { ...article, author, category, tags: articleTags };
}

export function getAllArticles(): HydratedArticle[] {
  return [...snapshot.articles]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    .map(hydrate);
}

export function getArticleById(id: string): HydratedArticle | undefined {
  const article = snapshot.articles.find((a) => a.id === id);
  return article ? hydrate(article) : undefined;
}

export function getPublishedArticles(): HydratedArticle[] {
  return live().map(hydrate);
}

export function getArticleBySlug(
  slug: string,
  opts?: { includeUnpublished?: boolean },
): HydratedArticle | undefined {
  const pool = opts?.includeUnpublished ? snapshot.articles : live();
  const article = pool.find((a) => a.slug === slug);
  return article ? hydrate(article) : undefined;
}

export function getFeatured(): HydratedArticle[] {
  return live()
    .filter((a) => a.featured)
    .map(hydrate);
}

export function getBreaking(): HydratedArticle[] {
  return live()
    .filter((a) => a.breaking)
    .map(hydrate);
}

export function getEditorPicks(): HydratedArticle[] {
  return live()
    .filter((a) => a.editorPick)
    .map(hydrate);
}

export function getTrending(): HydratedArticle[] {
  return live()
    .filter((a) => a.trending)
    .sort((a, b) => (a.trendingRank ?? 99) - (b.trendingRank ?? 99))
    .map(hydrate);
}

export function getLatest(limit?: number): HydratedArticle[] {
  const list = live().map(hydrate);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export function getByCategory(slug: string): HydratedArticle[] {
  const cat = getCategory(slug);
  if (!cat) return [];
  return live()
    .filter((a) => a.categoryId === cat.id)
    .map(hydrate);
}

export function getByAuthor(slug: string): HydratedArticle[] {
  const author = getAuthor(slug);
  if (!author) return [];
  return live()
    .filter((a) => a.authorId === author.id)
    .map(hydrate);
}

export function getByTag(slug: string): HydratedArticle[] {
  const tag = getTag(slug);
  if (!tag) return [];
  return live()
    .filter((a) => a.tagIds.includes(tag.id))
    .map(hydrate);
}

export function getRelated(article: HydratedArticle, limit = 3): HydratedArticle[] {
  const pinned = article.relatedArticleIds
    .map((id) => snapshot.articles.find((a) => a.id === id))
    .filter((a): a is Article => Boolean(a && a.id !== article.id))
    .map(hydrate);

  if (pinned.length >= limit) return pinned.slice(0, limit);

  const extra = live()
    .filter((a) => a.id !== article.id && !pinned.some((p) => p.id === a.id))
    .map((a) => ({
      article: hydrate(a),
      score:
        (a.categoryId === article.categoryId ? 3 : 0) +
        a.tagIds.filter((id) => article.tagIds.includes(id)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .map((x) => x.article);

  return [...pinned, ...extra].slice(0, limit);
}

export function searchArticles(
  query: string,
  filters?: { categorySlug?: string; tagSlug?: string; authorSlug?: string },
): HydratedArticle[] {
  const q = query.trim().toLowerCase();
  const cat = filters?.categorySlug ? getCategory(filters.categorySlug) : undefined;
  const tag = filters?.tagSlug ? getTag(filters.tagSlug) : undefined;
  const author = filters?.authorSlug ? getAuthor(filters.authorSlug) : undefined;
  return live()
    .filter((a) => {
      if (cat && a.categoryId !== cat.id) return false;
      if (tag && !a.tagIds.includes(tag.id)) return false;
      if (author && a.authorId !== author.id) return false;
      if (!q) return Boolean(cat || tag || author);
      const by = snapshot.authors.find((x) => x.id === a.authorId);
      const category = snapshot.categories.find((x) => x.id === a.categoryId);
      const hay = [
        a.title,
        a.excerpt,
        a.dek,
        by?.name,
        category?.name,
        ...a.tagIds.map((id) => snapshot.tags.find((t) => t.id === id)?.name),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    })
    .map(hydrate);
}

export function getAllSlugs(): string[] {
  return live().map((a) => a.slug);
}

export function upsertArticle(next: Article) {
  const idx = snapshot.articles.findIndex((a) => a.id === next.id);
  if (idx === -1) snapshot.articles.unshift(next);
  else snapshot.articles[idx] = next;
  return hydrate(next);
}

function upsertById<T extends { id: string }>(list: T[], next: T): T {
  const idx = list.findIndex((item) => item.id === next.id);
  if (idx === -1) list.unshift(next);
  else list[idx] = next;
  return next;
}

export function upsertUser(next: User) {
  return upsertById(snapshot.users, next);
}

export function upsertAuthor(next: Author) {
  return upsertById(snapshot.authors, next);
}

export function upsertCategory(next: Category) {
  return upsertById(snapshot.categories, next);
}

export function upsertTag(next: Tag) {
  return upsertById(snapshot.tags, next);
}

export function upsertMedia(next: MediaAsset) {
  return upsertById(snapshot.media, next);
}

export function updateSettings(next: SiteSettings) {
  snapshot.settings = next;
  return snapshot.settings;
}

export function updateAdSettings(next: AdSettings) {
  snapshot.adSettings = next;
  return snapshot.adSettings;
}

export function updateNewsletterSettings(next: NewsletterSettings) {
  snapshot.newsletterSettings = next;
  return snapshot.newsletterSettings;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}
