import { readFileSync, readdirSync, existsSync } from "fs";
import { join } from "path";
import matter from "gray-matter";

export const runtime = "nodejs";

export type ContentType = "blog" | "notes" | "build-log" | "resources" | "projects";

export interface FrontMatter {
  title:       string;
  description: string;
  date:        string;
  tags?:       string[];
  status?:     "draft" | "published";
  readTime?:   string;
  [key: string]: unknown;
}

export interface ProjectFrontMatter {
  title: string;
  summary: string;
  description: string;
  date: string;
  tags: string[];
  status: "active" | "ongoing" | "archived" | "draft";
  technologies: string[];
  featuredImage?: string;
  repositoryUrl?: string;
  liveDemoUrl?: string;
  sortOrder?: number;
}

export interface ContentItem {
  slug:         string;
  frontMatter:  FrontMatter;
  content:      string;
}

const contentRoot = join(process.cwd(), "content");

export function getContentSlugs(type: ContentType): string[] {
  const dir = join(contentRoot, type);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.(mdx|md)$/, ""));
}

export function getContentItem(type: ContentType, slug: string): ContentItem | null {
  const mdxPath = join(contentRoot, type, `${slug}.mdx`);
  const mdPath = join(contentRoot, type, `${slug}.md`);
  
  const filePath = existsSync(mdxPath) ? mdxPath : mdPath;

  if (!existsSync(filePath)) return null;

  try {
    const raw = readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
      slug,
      frontMatter: data as FrontMatter,
      content,
    };
  } catch (error) {
    console.error(`Error parsing content file ${filePath}:`, error);
    return null;
  }
}

export function getAllContent(type: ContentType): ContentItem[] {
  const slugs = getContentSlugs(type);
  const items: ContentItem[] = [];

  for (const slug of slugs) {
    const item = getContentItem(type, slug);
    if (item && item.frontMatter.status !== "draft") {
      items.push(item);
    }
  }

  return items.sort((a, b) =>
    new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime()
  );
}
