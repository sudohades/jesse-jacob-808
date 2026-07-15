/**
 * Framework-independent sitemap builder
 */
import type { SitemapEntry, SitemapRoute } from "./types";

export class SitemapBuilder {
  private routes: SitemapRoute[] = [];

  addRoute(route: SitemapRoute): this {
    this.routes.push(route);
    return this;
  }

  addRoutes(routes: SitemapRoute[]): this {
    this.routes.push(...routes);
    return this;
  }

  build(lastModified: Date = new Date()): SitemapEntry[] {
    return this.routes.map((route) => ({
      url: route.path,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }));
  }

  static create(): SitemapBuilder {
    return new SitemapBuilder();
  }
}
