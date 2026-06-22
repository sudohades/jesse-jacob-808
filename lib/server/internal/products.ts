import { readFileSync, readdirSync, existsSync } from "fs";
import { join } from "path";
import { type Product, type ProductCategory, type ProductType } from "../../products/product-types";

export const runtime = "nodejs";

const productsRoot = join(process.cwd(), "content", "products");

/**
 * Get all published products.
 * Optionally filter by category or type.
 */
export function getProducts(options?: {
  category?: ProductCategory;
  type?: ProductType;
  featured?: boolean;
}): Product[] {
  if (!existsSync(productsRoot)) {
    return [];
  }

  const productFiles = readdirSync(productsRoot)
    .filter((f) => f.endsWith(".json"));

  const products: Product[] = [];

  for (const file of productFiles) {
    const filePath = join(productsRoot, file);
    const raw = readFileSync(filePath, "utf-8");
    
    try {
      const product = JSON.parse(raw) as Product;
      
      // Skip draft and archived products
      if (product.status !== "published") {
        continue;
      }

      // Apply filters
      if (options?.category && product.category !== options.category) {
        continue;
      }

      if (options?.type && product.type !== options.type) {
        continue;
      }

      if (options?.featured !== undefined && product.featured !== options.featured) {
        continue;
      }

      products.push(product);
    } catch (error) {
      console.error(`Error parsing product file ${file}:`, error);
    }
  }

  // Sort by featured first, then by date (newest first)
  return products.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

/**
 * Get all unique product categories.
 */
export function getProductCategories(): ProductCategory[] {
  const products = getProducts();
  const categories = new Set<ProductCategory>();
  
  for (const product of products) {
    categories.add(product.category);
  }

  return Array.from(categories).sort();
}

/**
 * Get featured products.
 */
export function getFeaturedProducts(): Product[] {
  return getProducts({ featured: true });
}

/**
 * Get products by type (digital or physical).
 */
export function getProductsByType(type: ProductType): Product[] {
  return getProducts({ type });
}
