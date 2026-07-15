/**
 * Metadata Configuration
 * SEO and social metadata
 */
import { brand } from "./brand";
import { author } from "./author";
import { business } from "./business";
import { social } from "./social";

export const metadata = {
  title: `${brand.name} — ${brand.tagline}.`,
  description: business.description,
  authors: [{ name: author.name }],
  openGraph: {
    title: `${brand.name} — ${brand.tagline}`,
    images: [{ url: brand.logo.large }],
    description: business.description,
    type: "website",
    siteName: brand.name,
  },
  twitter: {
    card: social.twitter.card,
    site: social.twitter.handle,
  },
  icons: {
    icon: brand.logo.favicon,
  },
};
