import { getLatest, getSettings } from "@/cms/store";
import { SITE_URL } from "@/lib/site";

export const revalidate = 300;

export function GET() {
  const settings = getSettings();
  const items = getLatest(20)
    .map(
      (a) => `    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${SITE_URL}/article/${a.slug}</link>
      <guid>${SITE_URL}/article/${a.slug}</guid>
      <pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${a.excerpt}]]></description>
      <category>${a.category.name}</category>
      <dc:creator>${a.author.name}</dc:creator>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${settings.name}</title>
    <link>${SITE_URL}</link>
    <description>${settings.description}</description>
    <language>en-us</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=300, stale-while-revalidate",
    },
  });
}
