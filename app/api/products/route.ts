import { getProducts, getProductCategories } from "@/lib/server/internal/products";
import { getProductBySlug, getRelatedProducts } from "@/lib/server/internal/product-by-slug";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const category = searchParams.get("category");
  const type = searchParams.get("type");
  const featured = searchParams.get("featured");
  const relatedTo = searchParams.get("relatedTo");
  const limit = searchParams.get("limit");

  // Get single product by slug
  if (slug) {
    const product = getProductBySlug(slug);
    return Response.json(product);
  }

  // Get related products
  if (relatedTo) {
    const currentProduct = getProductBySlug(relatedTo);
    if (!currentProduct) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }
    const related = getRelatedProducts(currentProduct, limit ? parseInt(limit) : 4);
    return Response.json(related);
  }

  // Get categories
  if (searchParams.has("categories")) {
    const categories = getProductCategories();
    return Response.json(categories);
  }

  // Get products with filters
  const products = getProducts({
    category: category as any,
    type: type as any,
    featured: featured === "true" ? true : featured === "false" ? false : undefined,
  });

  return Response.json(products);
}
