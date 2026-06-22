import { getServices, getServiceCategories } from "@/lib/server/internal/services";
import { getServiceBySlug, getRelatedServices } from "@/lib/server/internal/service-by-slug";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");
  const relatedTo = searchParams.get("relatedTo");
  const limit = searchParams.get("limit");

  // Get single service by slug
  if (slug) {
    const service = getServiceBySlug(slug);
    return Response.json(service);
  }

  // Get related services
  if (relatedTo) {
    const currentService = getServiceBySlug(relatedTo);
    if (!currentService) {
      return Response.json({ error: "Service not found" }, { status: 404 });
    }
    const related = getRelatedServices(currentService, limit ? parseInt(limit) : 3);
    return Response.json(related);
  }

  // Get categories
  if (searchParams.has("categories")) {
    const categories = getServiceCategories();
    return Response.json(categories);
  }

  // Get services with filters
  const services = getServices({
    category: category as any,
    featured: featured === "true" ? true : featured === "false" ? false : undefined,
  });

  return Response.json(services);
}
