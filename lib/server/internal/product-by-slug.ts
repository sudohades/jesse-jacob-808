import { readFileSync, readdirSync, existsSync } from "fs";
import { join } from "path";
import { type Product } from "../../products/product-types";
import { getProducts } from "./products";

export const runtime = "nodejs";

const productsRoot = join(process.cwd(), "content", "products");

/**
 * Get a single product by its slug.
 * Returns null if the product doesn't exist or is not published.
 */
export function getProductBySlug(slug: string): Product | null {
  if (!existsSync(productsRoot)) {
    return null;
  }

  const productFiles = readdirSync(productsRoot)
    .filter((f) => f.endsWith(".json"));

  for (const file of productFiles) {
    const filePath = join(productsRoot, file);
    const raw = readFileSync(filePath, "utf-8");
    
    try {
      const product = JSON.parse(raw) as Product;
      
      if (product.slug === slug) {
        // Only return published products
        if (product.status !== "published") {
          return null;
        }
        return product;
      }
    } catch (error) {
      console.error(`Error parsing product file ${file}:`, error);
    }
  }

  return null;
}

/**
 * Get a product by its ID.
 * Returns null if the product doesn't exist or is not published.
 */
export function getProductById(id: string): Product | null {
  if (!existsSync(productsRoot)) {
    return null;
  }

  const productFiles = readdirSync(productsRoot)
    .filter((f) => f.endsWith(".json"));

  for (const file of productFiles) {
    const filePath = join(productsRoot, file);
    const raw = readFileSync(filePath, "utf-8");
    
    try {
      const product = JSON.parse(raw) as Product;
      
      if (product.id === id) {
        // Only return published products
        if (product.status !== "published") {
          return null;
        }
        return product;
      }
    } catch (error) {
      console.error(`Error parsing product file ${file}:`, error);
    }
  }

  return null;
}

/**
 * Get related products based on category and tags.
 * Excludes the current product.
 */
export function getRelatedProducts(
  currentProduct: Product,
  limit: number = 4
): Product[] {
  const allProducts = getProducts();
  
  const related = allProducts
    .filter((p: Product) => p.id !== currentProduct.id)
    .filter((p: Product) => {
      // Same category or shared tags
      const sameCategory = p.category === currentProduct.category;
      const sharedTags = p.tags.some((tag: string) => currentProduct.tags.includes(tag));
      return sameCategory || sharedTags;
    })
    .slice(0, limit);

  return related;
}
