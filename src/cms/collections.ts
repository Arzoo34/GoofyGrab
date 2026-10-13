import type { AdPlacement } from "@/types/cms";

export const ARTICLE_STATUSES = ["draft", "review", "scheduled", "published"] as const;

export const CONTENT_BLOCKS = [
  "paragraph",
  "heading",
  "image",
  "gallery",
  "quote",
  "video",
  "embed",
  "code",
  "list",
  "callout",
  "related",
] as const;

export const NAV_CATEGORIES = [
  { name: "Tech", slug: "technology" },
  { name: "AI", slug: "ai" },
  { name: "Science", slug: "science" },
  { name: "Business", slug: "business" },
  { name: "Gaming", slug: "gaming" },
] as const;

export const ARTICLE_FIELDS = [
  "title",
  "slug",
  "excerpt",
  "heroImage",
  "contentBlocks",
  "author",
  "category",
  "tags",
  "publishedAt",
  "updatedAt",
  "status",
  "featured",
  "breaking",
  "trending",
  "editorPick",
  "sponsored",
  "readingTime",
  "relatedArticles",
  "seo",
] as const;

export const SEO_FIELDS = [
  "metaTitle",
  "metaDescription",
  "ogTitle",
  "ogDescription",
  "ogImage",
  "canonicalUrl",
  "noIndex",
  "noFollow",
] as const;

export const AD_PLACEMENT_FIELDS: AdPlacement[] = [
  "HOME_TOP",
  "HOME_BETWEEN_FEATURES",
  "HOME_FEED",
  "HOME_SIDEBAR",
  "ARTICLE_TOP",
  "ARTICLE_AFTER_4",
  "ARTICLE_AFTER_8",
  "ARTICLE_AFTER_12",
  "ARTICLE_SIDEBAR",
  "ARTICLE_BOTTOM",
  "CATEGORY_TOP",
  "CATEGORY_FEED",
  "MOBILE_ARTICLE",
];

export const COLLECTIONS = {
  users: { slug: "users", fields: ["email", "role", "name"] },
  articles: { slug: "articles", fields: ARTICLE_FIELDS },
  authors: { slug: "authors", fields: ["name", "slug", "role", "bio", "avatar"] },
  categories: { slug: "categories", fields: ["name", "slug", "description", "accent"] },
  tags: { slug: "tags", fields: ["name", "slug"] },
  media: {
    slug: "media",
    fields: ["filename", "alt", "caption", "credit", "width", "height", "url"],
  },
} as const;

export const GLOBALS = ["siteSettings", "adSettings", "newsletterSettings"] as const;
