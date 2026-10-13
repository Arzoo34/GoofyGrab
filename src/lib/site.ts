export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://goofygrab.press";

export const NAV = [
  { label: "Tech", href: "/category/technology" },
  { label: "AI", href: "/category/ai" },
  { label: "Science", href: "/category/science" },
  { label: "Business", href: "/category/business" },
  { label: "Gaming", href: "/category/gaming" },
] as const;

export const MORE_NAV = [
  { label: "Gadgets", href: "/category/gadgets" },
  { label: "Startups", href: "/category/startups" },
  { label: "Software", href: "/category/software" },
  { label: "Internet", href: "/category/internet" },
  { label: "Security", href: "/category/security" },
  { label: "Reviews", href: "/category/reviews" },
  { label: "How-To", href: "/category/how-to" },
  { label: "About", href: "/about" },
  { label: "Authors", href: "/authors" },
] as const;

export const ACCENT_CLASS = {
  acid: "bg-acid text-paper",
  radio: "bg-radio text-void",
  volt: "bg-volt text-void",
  paper: "bg-paper text-void",
} as const;

export const ACCENT_TEXT = {
  acid: "text-acid",
  radio: "text-radio",
  volt: "text-volt",
  paper: "text-paper",
} as const;
