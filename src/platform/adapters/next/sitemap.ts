/**
 * Next.js adapter for sitemap
 * Converts platform sitemap to Next.js MetadataRoute.Sitemap format
 */
import type { MetadataRoute } from "next";
import { SitemapBuilder, type SitemapRoute } from "../../core/sitemap";

export function createNextSitemap(routes: SitemapRoute[]): MetadataRoute.Sitemap {
  const builder = SitemapBuilder.create();
  builder.addRoutes(routes);
  return builder.build();
}
