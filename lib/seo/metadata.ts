import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

interface PageMetaOptions {
  title?:       string;
  description?: string;
  path?:        string;
  ogImage?:     string;
  noIndex?:     boolean;
  ogImage2?:    string;
}

export function buildMetadata(opts: PageMetaOptions = {}): Metadata {
  const title       = opts.title
    ? `${opts.title} — ${siteConfig.brand}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;
  const description = opts.description ?? siteConfig.description;
  const url         = `${siteConfig.baseUrl}${opts.path ?? ""}`;
  const faviconSourceUrl = `${siteConfig.baseUrl}/favicon.ico`;

  return {
    title,
    description,
    keywords: [...siteConfig.keywords],
    authors: [{ name: siteConfig.name, url: siteConfig.baseUrl }],
    creator: siteConfig.name,
    metadataBase: new URL(siteConfig.baseUrl),
    alternates: { canonical: url },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
        { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    // Next.js will generate <link rel="icon"> / apple-touch-icon from the `icons` field.
    openGraph: {
      type:        "website",
      locale:      "en_US",
      url,
      title,
      description,
      siteName:    siteConfig.brand,
      images: [{ url: faviconSourceUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card:        "summary_large_image",
      title,
      description,
      images:      [faviconSourceUrl],
      creator:     "@sudo_hades",
    },

    robots: opts.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}
