import { getAllContent } from "@/lib/content/mdx";
import type { ProjectFrontMatter } from "@/lib/content/mdx";

export interface ProjectItem {
  slug: string;
  frontMatter: ProjectFrontMatter;
  content: string;
}

export function getProjects(): ProjectItem[] {
  const allContent = getAllContent("projects");
  
  return allContent
    .map((item) => ({
      slug: item.slug,
      content: item.content,
      frontMatter: item.frontMatter as unknown as ProjectFrontMatter,
    }))
    .filter((item) => item.frontMatter.status !== "draft")
    .sort((a, b) => {
      // First sort by sortOrder if defined
      const aSortOrder = a.frontMatter.sortOrder ?? 999;
      const bSortOrder = b.frontMatter.sortOrder ?? 999;
      
      if (aSortOrder !== bSortOrder) {
        return aSortOrder - bSortOrder;
      }
      
      // Then sort by date (newest first)
      return new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime();
    }) as ProjectItem[];
}

export function getProjectBySlug(slug: string): ProjectItem | null {
  const projects = getProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}

export function getFeaturedProjects(limit?: number): ProjectItem[] {
  const projects = getProjects();
  const featured = projects.filter((p) => p.frontMatter.status === "active" || p.frontMatter.status === "ongoing");
  
  return limit ? featured.slice(0, limit) : featured;
}
