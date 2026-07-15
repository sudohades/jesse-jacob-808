/**
 * Framework-independent sitemap types
 */
export type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export interface SitemapEntry {
  url: string;
  lastModified?: Date;
  changeFrequency?: ChangeFrequency;
  priority?: number;
}

export interface SitemapRoute {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
}
