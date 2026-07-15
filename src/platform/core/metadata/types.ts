/**
 * Framework-independent metadata types
 */
export interface SiteMetadata {
  title: string;
  description: string;
  authors?: Array<{ name: string }>;
  openGraph?: OpenGraphMetadata;
  twitter?: TwitterMetadata;
  icons?: IconsMetadata;
}

export interface OpenGraphMetadata {
  title?: string;
  description?: string;
  images?: Array<{ url: string }>;
  type?: string;
  siteName?: string;
}

export interface TwitterMetadata {
  card?: "summary" | "summary_large_image" | "app" | "player";
  site?: string;
}

export interface IconsMetadata {
  icon?: string;
}
