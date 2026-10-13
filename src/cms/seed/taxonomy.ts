import type { Category, Tag, SiteSettings } from "@/types/cms";

export const settings: SiteSettings = {
  name: "Goofygrab",
  tagline: "Grab the signal. Leave the noise.",
  description:
    "Goofygrab is an independent technology and media publication covering AI, science, gadgets, startups, security, and the culture that grows around them.",
  url: "https://goofygrab.press",
  newsletterBlurb:
    "Five stories. Zero filler. The morning briefing for people who actually read the footnotes.",
  social: [
    { label: "Mastodon", href: "https://mastodon.social" },
    { label: "YouTube", href: "https://youtube.com" },
    { label: "RSS", href: "/rss.xml" },
  ],
};

export const categories: Category[] = [
  {
    id: "cat-tech",
    name: "Technology",
    slug: "technology",
    description: "Infrastructure, platforms, and the machinery underneath culture.",
    accent: "paper",
  },
  {
    id: "cat-ai",
    name: "AI",
    slug: "ai",
    description: "Models, labs, policy, and the people training the next weird thing.",
    accent: "acid",
  },
  {
    id: "cat-science",
    name: "Science",
    slug: "science",
    description: "Labs, papers, and discoveries that refuse to stay in journals.",
    accent: "volt",
  },
  {
    id: "cat-gadgets",
    name: "Gadgets",
    slug: "gadgets",
    description: "Phones, wearables, and objects that want a monthly subscription.",
    accent: "radio",
  },
  {
    id: "cat-startups",
    name: "Startups",
    slug: "startups",
    description: "Founders, funding, and the theater of the next round.",
    accent: "acid",
  },
  {
    id: "cat-business",
    name: "Business",
    slug: "business",
    description: "Markets, regulation, and the quarterly plot twists.",
    accent: "paper",
  },
  {
    id: "cat-gaming",
    name: "Gaming",
    slug: "gaming",
    description: "Studios, engines, live ops, and the players who fund them.",
    accent: "radio",
  },
  {
    id: "cat-software",
    name: "Software",
    slug: "software",
    description: "Tools, languages, and the craft of shipping code.",
    accent: "volt",
  },
  {
    id: "cat-internet",
    name: "Internet",
    slug: "internet",
    description: "Platforms, protocols, and the social weather of the web.",
    accent: "acid",
  },
  {
    id: "cat-security",
    name: "Security",
    slug: "security",
    description: "Breaches, patches, and the people who stay up for both.",
    accent: "volt",
  },
  {
    id: "cat-reviews",
    name: "Reviews",
    slug: "reviews",
    description: "Scored, stressed, and returned with receipts.",
    accent: "radio",
  },
  {
    id: "cat-howto",
    name: "How-To",
    slug: "how-to",
    description: "Practical field guides for living with machines.",
    accent: "paper",
  },
];

export const tags: Tag[] = [
  { id: "tag-chips", name: "Chips", slug: "chips" },
  { id: "tag-models", name: "Foundation Models", slug: "foundation-models" },
  { id: "tag-policy", name: "Policy", slug: "policy" },
  { id: "tag-climate", name: "Climate", slug: "climate" },
  { id: "tag-phones", name: "Phones", slug: "phones" },
  { id: "tag-funding", name: "Funding", slug: "funding" },
  { id: "tag-engines", name: "Game Engines", slug: "game-engines" },
  { id: "tag-devtools", name: "Devtools", slug: "devtools" },
  { id: "tag-privacy", name: "Privacy", slug: "privacy" },
  { id: "tag-space", name: "Space", slug: "space" },
  { id: "tag-opensource", name: "Open Source", slug: "open-source" },
  { id: "tag-antitrust", name: "Antitrust", slug: "antitrust" },
];
