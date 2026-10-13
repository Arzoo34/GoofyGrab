/**
 * Payload CMS schema for Goofygrab.
 * Production: wire this to `@payloadcms/next` + PostgreSQL adapter + S3.
 * The public site and the newsroom desk share collections via `src/cms/store.ts`.
 */
import {
  AD_PLACEMENT_FIELDS,
  ARTICLE_FIELDS,
  ARTICLE_STATUSES,
  CONTENT_BLOCKS,
  COLLECTIONS,
  GLOBALS,
  SEO_FIELDS,
} from "./collections";

export const payloadBlueprint = {
  db: "postgresql",
  media: {
    adapter: "s3",
    fields: COLLECTIONS.media.fields,
    requireAlt: true,
    requireDimensions: true,
  },
  collections: {
    users: {
      auth: true,
      fields: ["email", "role", "name"],
      roles: ["admin", "editor", "author", "reviewer"],
    },
    articles: {
      versions: { drafts: true },
      admin: { useAsTitle: "title", preview: "/article/{slug}" },
      hooks: {
        afterChange: ["revalidatePath:/", "revalidateTag:articles"],
      },
      fields: ARTICLE_FIELDS,
      seo: SEO_FIELDS,
      status: ARTICLE_STATUSES,
      blocks: CONTENT_BLOCKS,
      editor: {
        features: [
          "bold",
          "italic",
          "link",
          "internalLink:articles",
          "headings",
          "lists",
          "blockquote",
          "code",
          "upload",
          "youtube",
          "embed",
        ],
      },
    },
    authors: COLLECTIONS.authors,
    categories: COLLECTIONS.categories,
    tags: COLLECTIONS.tags,
    media: COLLECTIONS.media,
  },
  globals: GLOBALS,
  ads: {
    networks: ["adsense", "gam", "direct", "house", "other"],
    placements: AD_PLACEMENT_FIELDS,
    reserveExactPixels: true,
    sponsoredLabelRequired: true,
  },
};

export type PayloadBlueprint = typeof payloadBlueprint;
