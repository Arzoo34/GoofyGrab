const relativeFormatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export function formatTime(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function formatRelative(iso: string): string {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const deltaMin = Math.round((then - now) / 60000);
  if (Math.abs(deltaMin) < 60) {
    return relativeFormatter.format(deltaMin, "minute");
  }
  const deltaHr = Math.round(deltaMin / 60);
  if (Math.abs(deltaHr) < 24) {
    return relativeFormatter.format(deltaHr, "hour");
  }
  const deltaDay = Math.round(deltaHr / 24);
  return relativeFormatter.format(deltaDay, "day");
}

export function padRank(n: number): string {
  return String(n).padStart(2, "0");
}

export function readingLabel(minutes: number): string {
  return `${minutes} min read`;
}

export function toAnchor(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function estimateReadingTime(blocks: unknown[]): number {
  const text = blocks
    .map((raw) => {
      const b = raw as ContentBlockLike;
      const items = Array.isArray(b.items) && typeof b.items[0] === "string" ? (b.items as string[]) : [];
      return [b.html, b.text, b.code, ...items].filter(Boolean).join(" ");
    })
    .join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

type ContentBlockLike = {
  html?: string;
  text?: string;
  code?: string;
  items?: unknown[];
};
