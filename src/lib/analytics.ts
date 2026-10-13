type AnalyticsEvent =
  | { name: "page_view"; path: string; title: string }
  | { name: "scroll_depth"; path: string; depth: 25 | 50 | 75 | 100 }
  | { name: "reading_time"; path: string; seconds: number }
  | { name: "search"; query: string }
  | { name: "newsletter_intent"; source: string };

const KEY = "gg_analytics_queue";

function enqueue(event: AnalyticsEvent & { t: number }) {
  if (typeof window === "undefined") return;
  try {
    const raw = window.sessionStorage.getItem(KEY);
    const queue: unknown[] = raw ? JSON.parse(raw) : [];
    queue.push(event);
    window.sessionStorage.setItem(KEY, JSON.stringify(queue.slice(-80)));
  } catch {
    return;
  }
}

export function track(event: AnalyticsEvent) {
  enqueue({ ...event, t: Date.now() });
}

export function getQueuedEvents(): unknown[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.sessionStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
