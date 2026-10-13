import type { AdNetwork, AdPlacement, AdSettings, AdSize } from "@/types/cms";

export const AD_PLACEMENTS: AdPlacement[] = [
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

export const AD_NETWORKS: { id: AdNetwork; label: string }[] = [
  { id: "house", label: "House ads" },
  { id: "direct", label: "Direct advertisers" },
  { id: "adsense", label: "Google AdSense" },
  { id: "gam", label: "Google Ad Manager" },
  { id: "other", label: "Other network" },
];

export const AD_SIZES: Record<AdPlacement, AdSize> = {
  HOME_TOP: { width: 728, height: 90, mobileWidth: 320, mobileHeight: 50, label: "Leaderboard" },
  HOME_BETWEEN_FEATURES: { width: 728, height: 90, mobileWidth: 320, mobileHeight: 50, label: "Between features" },
  HOME_FEED: { width: 728, height: 90, mobileWidth: 320, mobileHeight: 50, label: "Feed banner" },
  HOME_SIDEBAR: { width: 300, height: 600, mobileWidth: 300, mobileHeight: 250, label: "Home rail" },
  ARTICLE_TOP: { width: 728, height: 90, mobileWidth: 320, mobileHeight: 50, label: "Article leaderboard" },
  ARTICLE_AFTER_4: { width: 300, height: 250, mobileWidth: 300, mobileHeight: 250, label: "After block 4" },
  ARTICLE_AFTER_8: { width: 300, height: 250, mobileWidth: 300, mobileHeight: 250, label: "After block 8" },
  ARTICLE_AFTER_12: { width: 300, height: 250, mobileWidth: 300, mobileHeight: 250, label: "After block 12" },
  ARTICLE_SIDEBAR: { width: 300, height: 600, mobileWidth: 300, mobileHeight: 250, label: "Article rail" },
  ARTICLE_BOTTOM: { width: 728, height: 90, mobileWidth: 320, mobileHeight: 50, label: "Article footer" },
  CATEGORY_TOP: { width: 728, height: 90, mobileWidth: 320, mobileHeight: 50, label: "Category leaderboard" },
  CATEGORY_FEED: { width: 728, height: 90, mobileWidth: 320, mobileHeight: 50, label: "Category feed" },
  MOBILE_ARTICLE: { width: 320, height: 50, mobileWidth: 320, mobileHeight: 50, label: "Mobile article" },
};

export const ARTICLE_IN_CONTENT: Partial<Record<number, AdPlacement>> = {
  4: "ARTICLE_AFTER_4",
  8: "ARTICLE_AFTER_8",
  12: "ARTICLE_AFTER_12",
};

export function networkLabel(network: AdNetwork): string {
  return AD_NETWORKS.find((n) => n.id === network)?.label ?? network;
}

export function resolveCreative(settings: AdSettings, placement: AdPlacement) {
  if (!settings.enabled) return undefined;
  return settings.creatives.find((c) => c.placement === placement && c.enabled);
}
