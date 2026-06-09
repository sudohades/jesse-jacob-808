import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.baseUrl;
  return [
    { url: base,                    lastModified: new Date(), changeFrequency: "weekly",  priority: 1 },
    { url: `${base}/projects`,      lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/blog`,          lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/build-log`,     lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/notes`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`,       lastModified: new Date(), changeFrequency: "yearly",  priority: 0.6 },
  ];
}
