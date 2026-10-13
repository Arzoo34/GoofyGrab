import type { AdSettings, NewsletterSettings, User } from "@/types/cms";
import type { AdCreative, AdPlacement } from "@/types/cms";

const house = (
  placement: AdPlacement,
  headline: string,
  body: string,
): AdCreative => ({
  id: `ad-${placement.toLowerCase()}`,
  placement,
  network: "house",
  enabled: true,
  advertiser: "Goofygrab House",
  headline,
  body,
  href: "/cms",
});

export const users: User[] = [
  { id: "user-admin", name: "Amina Shah", email: "amina@goofygrab.press", role: "admin" },
  { id: "user-editor", name: "Leo Park", email: "leo@goofygrab.press", role: "editor" },
  { id: "user-author", name: "Mira Chen", email: "mira@goofygrab.press", role: "author" },
  { id: "user-review", name: "Sam Ortiz", email: "sam@goofygrab.press", role: "reviewer" },
];

export const adSettings: AdSettings = {
  enabled: true,
  defaultNetwork: "house",
  adsensePublisherId: "ca-pub-0000000000000000",
  gamNetworkCode: "12345678",
  houseAdvertiser: "Goofygrab House",
  allowSponsored: true,
  creatives: [
    house("HOME_TOP", "Morning Grab", "The briefing. Five stories. No filler."),
    house("HOME_BETWEEN_FEATURES", "Desks, not feeds", "AI, security, gadgets — pick a beat."),
    house("HOME_FEED", "Direct inventory", "Reserved 728×90. Your campaign, our CLS budget."),
    house("HOME_SIDEBAR", "Half page, zero shift", "300×600 reserved before paint."),
    house("ARTICLE_TOP", "Stay with the story", "House placement. Never overlaps type."),
    house("ARTICLE_AFTER_4", "Mid-article", "300×250 after block four."),
    house("ARTICLE_AFTER_8", "Still reading", "300×250 after block eight."),
    house("ARTICLE_AFTER_12", "Deep in the piece", "300×250 after block twelve."),
    house("ARTICLE_SIDEBAR", "Rail", "Pinned beside, never over, the text."),
    house("ARTICLE_BOTTOM", "After the byline", "Leaderboard, then related stories."),
    house("CATEGORY_TOP", "Desk sponsorship", "Category leaderboard, reserved."),
    house("CATEGORY_FEED", "In the stack", "Feed banner on every desk."),
    house("MOBILE_ARTICLE", "Mobile only", "320×50, in flow, never sticky over copy."),
  ],
};

export const newsletterSettings: NewsletterSettings = {
  enabled: true,
  fromName: "Goofygrab Morning Grab",
  fromEmail: "desk@goofygrab.press",
  blurb: "Five stories. Zero filler. The morning briefing for people who actually read the footnotes.",
  doubleOptIn: true,
  archiveUrl: "/rss.xml",
};
