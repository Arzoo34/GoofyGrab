import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Source_Serif_4, Space_Grotesk, Syne } from "next/font/google";
import { getSettings } from "@/cms/store";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const source = Source_Serif_4({
  variable: "--font-source",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const plex = IBM_Plex_Mono({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const settings = getSettings();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${settings.name} — ${settings.tagline}`,
    template: `%s — ${settings.name}`,
  },
  description: settings.description,
  applicationName: settings.name,
  authors: [{ name: "Goofygrab Press" }],
  openGraph: {
    type: "website",
    siteName: settings.name,
    title: settings.name,
    description: settings.description,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: settings.name,
    description: settings.description,
  },
  robots: { index: true, follow: true },
  alternates: {
    types: { "application/rss+xml": "/rss.xml" },
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${syne.variable} ${grotesk.variable} ${source.variable} ${plex.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
