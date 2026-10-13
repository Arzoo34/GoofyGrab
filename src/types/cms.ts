export type PublishStatus = "draft" | "review" | "scheduled" | "published";

export type UserRole = "admin" | "editor" | "author" | "reviewer";

export type AdPlacement =
  | "HOME_TOP"
  | "HOME_BETWEEN_FEATURES"
  | "HOME_FEED"
  | "HOME_SIDEBAR"
  | "ARTICLE_TOP"
  | "ARTICLE_AFTER_4"
  | "ARTICLE_AFTER_8"
  | "ARTICLE_AFTER_12"
  | "ARTICLE_SIDEBAR"
  | "ARTICLE_BOTTOM"
  | "CATEGORY_TOP"
  | "CATEGORY_FEED"
  | "MOBILE_ARTICLE";

export type AdNetwork =
  | "adsense"
  | "gam"
  | "direct"
  | "house"
  | "other";

export type AdSize = {
  width: number;
  height: number;
  mobileWidth: number;
  mobileHeight: number;
  label: string;
};

export type AdCreative = {
  id: string;
  placement: AdPlacement;
  network: AdNetwork;
  enabled: boolean;
  advertiser: string;
  headline: string;
  body: string;
  href: string;
  imageUrl?: string;
  slotId?: string;
  networkId?: string;
};

export type MediaAsset = {
  id: string;
  filename: string;
  alt: string;
  caption?: string;
  credit?: string;
  width: number;
  height: number;
  url: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type Author = {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  avatar: MediaAsset;
  twitter?: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  accent: "acid" | "radio" | "volt" | "paper";
};

export type Tag = {
  id: string;
  name: string;
  slug: string;
};

export type ContentBlock =
  | { type: "paragraph"; id: string; html: string }
  | { type: "heading"; id: string; level: 2 | 3; text: string; anchor: string }
  | { type: "image"; id: string; media: MediaAsset }
  | { type: "gallery"; id: string; items: MediaAsset[] }
  | { type: "quote"; id: string; text: string; cite?: string }
  | { type: "video"; id: string; provider: "youtube"; videoId: string; title: string }
  | { type: "embed"; id: string; url: string; title: string }
  | { type: "code"; id: string; language: string; filename?: string; code: string }
  | { type: "list"; id: string; ordered: boolean; items: string[] }
  | { type: "callout"; id: string; tone: "info" | "warn" | "tip"; title: string; body: string }
  | { type: "related"; id: string; articleIds: string[] };

export type SeoFields = {
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImage?: MediaAsset;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  dek: string;
  heroImage: MediaAsset;
  contentBlocks: ContentBlock[];
  authorId: string;
  categoryId: string;
  tagIds: string[];
  publishedAt: string;
  updatedAt: string;
  scheduledFor?: string;
  status: PublishStatus;
  featured: boolean;
  breaking: boolean;
  trending: boolean;
  trendingRank?: number;
  editorPick: boolean;
  sponsored: boolean;
  sponsorName?: string;
  readingTime: number;
  relatedArticleIds: string[];
  seo: SeoFields;
};

export type SiteSettings = {
  name: string;
  tagline: string;
  description: string;
  url: string;
  newsletterBlurb: string;
  social: { label: string; href: string }[];
};

export type AdSettings = {
  enabled: boolean;
  defaultNetwork: AdNetwork;
  adsensePublisherId: string;
  gamNetworkCode: string;
  houseAdvertiser: string;
  allowSponsored: boolean;
  creatives: AdCreative[];
};

export type NewsletterSettings = {
  enabled: boolean;
  fromName: string;
  fromEmail: string;
  blurb: string;
  doubleOptIn: boolean;
  archiveUrl: string;
};

export type CmsSnapshot = {
  settings: SiteSettings;
  adSettings: AdSettings;
  newsletterSettings: NewsletterSettings;
  users: User[];
  authors: Author[];
  categories: Category[];
  tags: Tag[];
  media: MediaAsset[];
  articles: Article[];
};

export type HydratedArticle = Article & {
  author: Author;
  category: Category;
  tags: Tag[];
};
