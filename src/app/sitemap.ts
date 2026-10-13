import type { MetadataRoute } from "next";
import {
  getAllSlugs,
  getAuthors,
  getCategories,
  getTags,
} from "@/cms/store";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = ["", "/authors", "/about"].map((p) => ({
    url: `${SITE_URL}${p || "/"}`,
    lastModified: now,
    changeFrequency: "hourly",
    priority: p === "" ? 1 : 0.4,
  }));

  const articles = getAllSlugs().map((slug) => ({
    url: `${SITE_URL}/article/${slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const cats = getCategories().map((c) => ({
    url: `${SITE_URL}/category/${c.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.6,
  }));

  const authors = getAuthors().map((a) => ({
    url: `${SITE_URL}/author/${a.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  const tags = getTags().map((t) => ({
    url: `${SITE_URL}/tag/${t.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.4,
  }));

  return [...staticRoutes, ...articles, ...cats, ...authors, ...tags];
}
