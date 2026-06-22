import { getContentSlugs, getContentItem, getAllContent, type ContentType } from "@/lib/server/isolated/content-gateway";
import type { ProjectItem, ProjectFrontMatter } from "@/lib/types/project";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") as ContentType;
  const all = searchParams.has("all");

  // Get all content of a type
  if (all && type) {
    const content = await getAllContent(type);
    return Response.json(content);
  }

  // Get all slugs for a type
  if (searchParams.has("slugs") && type) {
    const slugs = await getContentSlugs(type);
    return Response.json(slugs);
  }

  // Get projects (special handling for project frontmatter)
  if (type === "projects" && !slug) {
    const allContent = await getAllContent("projects");
    const projects = allContent
      .map((item) => ({
        slug: item.slug,
        content: item.content,
        frontMatter: item.frontMatter as unknown as ProjectFrontMatter,
      }))
      .filter((item) => item.frontMatter.status !== "draft")
      .sort((a, b) => {
        const aSortOrder = a.frontMatter.sortOrder ?? 999;
        const bSortOrder = b.frontMatter.sortOrder ?? 999;
        if (aSortOrder !== bSortOrder) {
          return aSortOrder - bSortOrder;
        }
        return new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime();
      }) as ProjectItem[];
    return Response.json(projects);
  }

  // Get single project by slug
  if (type === "projects" && slug) {
    const allContent = await getAllContent("projects");
    const project = allContent
      .map((item) => ({
        slug: item.slug,
        content: item.content,
        frontMatter: item.frontMatter as unknown as ProjectFrontMatter,
      }))
      .find((p) => p.slug === slug) ?? null;
    return Response.json(project);
  }

  // Get single content item
  if (type && slug) {
    const item = await getContentItem(type, slug);
    return Response.json(item);
  }

  return Response.json({ error: "Invalid request" }, { status: 400 });
}
