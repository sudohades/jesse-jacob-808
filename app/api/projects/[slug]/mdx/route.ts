import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import { getContentItem } from "@/lib/server/isolated/content-gateway";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const project = await getContentItem("projects", slug);

  if (!project) {
    return Response.json({ error: "Project not found" }, { status: 404 });
  }

  const mdx = await serialize(project.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  });

  return Response.json(mdx);
}
