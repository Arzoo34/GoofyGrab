import type { Author, MediaAsset } from "@/types/cms";

const avatar = (
  id: string,
  filename: string,
  alt: string,
  url: string,
): MediaAsset => ({
  id,
  filename,
  alt,
  width: 400,
  height: 400,
  url,
  credit: "Goofygrab Staff",
});

export const authors: Author[] = [
  {
    id: "auth-mira",
    name: "Mira Chen",
    slug: "mira-chen",
    role: "Editor-at-Large, Intelligence",
    bio: "Mira covers frontier models, chip geopolitics, and the messy politics of machine judgment. Previously at a research lab she is not allowed to name.",
    avatar: avatar(
      "media-mira",
      "mira-chen.jpg",
      "Portrait of Mira Chen",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80",
    ),
    twitter: "mira_gg",
  },
  {
    id: "auth-jules",
    name: "Jules Okonkwo",
    slug: "jules-okonkwo",
    role: "Hardware Desk",
    bio: "Jules tears down phones, laptops, and whatever else vendors send in padded envelopes. If it has a battery, it will be opened.",
    avatar: avatar(
      "media-jules",
      "jules-okonkwo.jpg",
      "Portrait of Jules Okonkwo",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80",
    ),
  },
  {
    id: "auth-rowan",
    name: "Rowan Hale",
    slug: "rowan-hale",
    role: "Security Correspondent",
    bio: "Rowan reports on exploits, nation-state crews, and the boring infrastructure that actually keeps the internet up.",
    avatar: avatar(
      "media-rowan",
      "rowan-hale.jpg",
      "Portrait of Rowan Hale",
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&h=400&q=80",
    ),
  },
  {
    id: "auth-priya",
    name: "Priya Nair",
    slug: "priya-nair",
    role: "Startups & Markets",
    bio: "Priya follows the money: seed decks, late-stage theater, and the quiet companies that actually ship.",
    avatar: avatar(
      "media-priya",
      "priya-nair.jpg",
      "Portrait of Priya Nair",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&h=400&q=80",
    ),
  },
  {
    id: "auth-dex",
    name: "Dex Navarro",
    slug: "dex-navarro",
    role: "Games & Culture",
    bio: "Dex writes about engines, live-service economics, and why your favorite studio keeps renaming itself.",
    avatar: avatar(
      "media-dex",
      "dex-navarro.jpg",
      "Portrait of Dex Navarro",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=80",
    ),
  },
];
