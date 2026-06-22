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

export interface ProjectItem {
  slug: string;
  frontMatter: ProjectFrontMatter;
  content: string;
}
