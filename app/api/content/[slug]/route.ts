import { getContentItem, getContentSlugs, getAllContent } from "@/lib/server/internal/mdx";
import { getProjects, getProjectBySlug } from "@/lib/server/internal/projects";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") as any;
  const all = searchParams.has("all");

  // Get all content of a type
  if (all && type) {
    const content = getAllContent(type);
    return Response.json(content);
  }

  // Get all slugs for a type
  if (searchParams.has("slugs") && type) {
    const slugs = getContentSlugs(type);
    return Response.json(slugs);
  }

  // Get projects
  if (type === "projects" && !slug) {
    const projects = getProjects();
    return Response.json(projects);
  }

  // Get single project by slug
  if (type === "projects" && slug) {
    const project = getProjectBySlug(slug);
    return Response.json(project);
  }

  // Get single content item
  if (type && slug) {
    const item = getContentItem(type, slug);
    return Response.json(item);
  }

  return Response.json({ error: "Invalid request" }, { status: 400 });
}
