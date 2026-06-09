import fs from "fs";
import path from "path";
import { type Service, type ServiceCategory } from "@/lib/products/product-types";

const servicesRoot = path.join(process.cwd(), "content", "services");

/**
 * Get all published services.
 * Optionally filter by category.
 */
export function getServices(options?: {
  category?: ServiceCategory;
  featured?: boolean;
}): Service[] {
  if (!fs.existsSync(servicesRoot)) {
    return [];
  }

  const serviceFiles = fs
    .readdirSync(servicesRoot)
    .filter((f) => f.endsWith(".json"));

  const services: Service[] = [];

  for (const file of serviceFiles) {
    const filePath = path.join(servicesRoot, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    
    try {
      const service = JSON.parse(raw) as Service;
      
      // Skip draft and archived services
      if (service.status !== "published") {
        continue;
      }

      // Apply filters
      if (options?.category && service.category !== options.category) {
        continue;
      }

      if (options?.featured !== undefined && service.featured !== options.featured) {
        continue;
      }

      services.push(service);
    } catch (error) {
      console.error(`Error parsing service file ${file}:`, error);
    }
  }

  // Sort by featured first, then by date (newest first)
  return services.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
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
