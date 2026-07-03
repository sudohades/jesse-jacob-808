import { readFileSync, readdirSync, existsSync } from "fs";
import { join } from "path";
import { cache } from "react";
import { type Service, type ServiceCategory } from "../../products/product-types";

export const runtime = "nodejs";

const servicesRoot = join(process.cwd(), "content", "services");

const getServicesCached = cache((
  category?: ServiceCategory,
  featured?: boolean,
): Service[] => {
  if (!existsSync(servicesRoot)) {
    return [];
  }

  const serviceFiles = readdirSync(servicesRoot)
    .filter((f) => f.endsWith(".json"));

  const services: Service[] = [];

  for (const file of serviceFiles) {
    const filePath = join(servicesRoot, file);
    const raw = readFileSync(filePath, "utf-8");
    
    try {
      const service = JSON.parse(raw) as Service;
      
      // Skip draft and archived services
      if (service.status !== "published") {
        continue;
      }

      // Apply filters
      if (category && service.category !== category) {
        continue;
      }

      if (featured !== undefined && service.featured !== featured) {
        continue;
      }

      services.push(service);
    } catch (error) {
      console.error(`Error parsing service file ${file}:`, error);
    }
  }

  return services.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
});

/**
 * Get all published services.
 * Optionally filter by category.
 */
export function getServices(options?: {
  category?: ServiceCategory;
  featured?: boolean;
}): Service[] {
  return getServicesCached(options?.category, options?.featured);
}

/**
 * Get all unique service categories.
 */
export function getServiceCategories(): ServiceCategory[] {
  const services = getServices();
  const categories = new Set<ServiceCategory>();
  
  for (const service of services) {
    categories.add(service.category as ServiceCategory);
  }

  return Array.from(categories).sort();
}

/**
 * Get featured services.
 */
export function getFeaturedServices(): Service[] {
  return getServices({ featured: true });
}
