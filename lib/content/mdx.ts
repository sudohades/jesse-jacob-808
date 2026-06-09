import fs   from "fs";
import path from "path";
import matter from "gray-matter";

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

const contentRoot = path.join(process.cwd(), "content");

export function getContentSlugs(type: ContentType): string[] {
  const dir = path.join(contentRoot, type);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.(mdx|md)$/, ""));
}

export function getContentItem(type: ContentType, slug: string): ContentItem | null {
  const mdxPath = path.join(contentRoot, type, `${slug}.mdx`);
  const mdPath = path.join(contentRoot, type, `${slug}.md`);
  
  const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;

  if (!fs.existsSync(filePath)) return null;

  try {
    const raw = fs.readFileSync(filePath, "utf-8");
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
