import fs from "fs";
import path from "path";
import { type Service } from "@/lib/products/product-types";
import { getServices } from "./get-services";

const servicesRoot = path.join(process.cwd(), "content", "services");

/**
 * Get a single service by its slug.
 * Returns null if the service doesn't exist or is not published.
 */
export function getServiceBySlug(slug: string): Service | null {
  if (!fs.existsSync(servicesRoot)) {
    return null;
  }

  const serviceFiles = fs
    .readdirSync(servicesRoot)
    .filter((f) => f.endsWith(".json"));

  for (const file of serviceFiles) {
    const filePath = path.join(servicesRoot, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    
    try {
      const service = JSON.parse(raw) as Service;
      
      if (service.slug === slug) {
        // Only return published services
        if (service.status !== "published") {
          return null;
        }
        return service;
      }
    } catch (error) {
      console.error(`Error parsing service file ${file}:`, error);
    }
  }

  return null;
}

/**
 * Get a service by its ID.
 * Returns null if the service doesn't exist or is not published.
 */
export function getServiceById(id: string): Service | null {
  if (!fs.existsSync(servicesRoot)) {
    return null;
  }

  const serviceFiles = fs
    .readdirSync(servicesRoot)
    .filter((f) => f.endsWith(".json"));

  for (const file of serviceFiles) {
    const filePath = path.join(servicesRoot, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    
    try {
      const service = JSON.parse(raw) as Service;
      
      if (service.id === id) {
        // Only return published services
        if (service.status !== "published") {
          return null;
        }
        return service;
      }
    } catch (error) {
      console.error(`Error parsing service file ${file}:`, error);
    }
  }

  return null;
}

/**
 * Get related services based on category.
 * Excludes the current service.
 */
export function getRelatedServices(
  currentService: Service,
  limit: number = 3
): Service[] {
  const allServices = getServices();
  
  const related = allServices
    .filter((s: Service) => s.id !== currentService.id)
    .filter((s: Service) => s.category === currentService.category)
    .slice(0, limit);

  return related;
}
