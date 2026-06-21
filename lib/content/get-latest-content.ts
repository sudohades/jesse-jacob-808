import { getAllContent, type ContentItem, type ContentType } from "../server/content/mdx";

const contentTypes: ContentType[] = ["blog", "notes", "build-log"];

export interface LatestContentItem {
  slug: string;
  type: ContentType;
  frontMatter: ContentItem["frontMatter"];
}

export function getLatestContent(limit: number = 6): LatestContentItem[] {
  const allItems: LatestContentItem[] = [];

  for (const type of contentTypes) {
    const items = getAllContent(type);
    for (const item of items) {
      allItems.push({
        slug: item.slug,
        type,
        frontMatter: item.frontMatter,
      });
    }
  }

  return allItems
    .sort((a, b) => new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime())
    .slice(0, limit);
}
