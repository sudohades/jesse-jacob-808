/**
 * STRICT SERVER BOUNDARY LAYER
 * 
 * ⚠️ CRITICAL: This is the ONLY file allowed to touch:
 * - fs
 * - path
 * - gray-matter
 * - process.cwd
 * 
 * All file system access and MDX parsing MUST go through this layer.
 * This ensures Node.js-only code never leaks into Edge/SSR contexts.
 * 
 * NEVER import this file directly in React components.
 * ONLY import this in API routes with export const runtime = "nodejs"
 */

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

/**
 * Get all content slugs for a given type
 * ONLY callable from API routes with runtime = "nodejs"
 */
export async function getContentSlugs(type: ContentType): Promise<string[]> {
  const dir = join(contentRoot, type);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.(mdx|md)$/, ""));
}

/**
 * Get a single content item by type and slug
 * ONLY callable from API routes with runtime = "nodejs"
 */
export async function getContentItem(type: ContentType, slug: string): Promise<ContentItem | null> {
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

/**
 * Get all published content for a given type
 * ONLY callable from API routes with runtime = "nodejs"
 */
export async function getAllContent(type: ContentType): Promise<ContentItem[]> {
  const slugs = await getContentSlugs(type);
  const items: ContentItem[] = [];

  for (const slug of slugs) {
    const item = await getContentItem(type, slug);
    if (item && item.frontMatter.status !== "draft") {
      items.push(item);
    }
  }

  return items.sort((a, b) =>
    new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime()
  );
}

/**
 * Get content by type and optional slug
 * Unified interface for API routes
 */
export async function getContent(type: ContentType, slug?: string): Promise<ContentItem | ContentItem[] | null> {
  if (slug) {
    return await getContentItem(type, slug);
  }
  return await getAllContent(type);
}
