import { ImageResponse } from "next/og";
import { getArticleBySlug } from "@/cms/store";

export const alt = "Goofygrab article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ArticleOg({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug, { includeUnpublished: true });
  const title = article?.title ?? "Goofygrab";
  const desk = article?.category.name ?? "Tech";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0B0F",
          color: "#F7F7F4",
          padding: 64,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#B8FF00",
          }}
        >
          <span>Goofygrab</span>
          <span>{desk}</span>
        </div>
        <div
          style={{
            fontSize: title.length > 48 ? 56 : 72,
            fontWeight: 800,
            lineHeight: 0.92,
            textTransform: "uppercase",
            maxWidth: 1040,
          }}
        >
          {title}
        </div>
      </div>
    ),
    { ...size },
  );
}
