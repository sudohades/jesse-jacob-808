import { type Product } from "@/lib/products/product-types";
import { siteConfig } from "@/lib/site-config";

/**
 * Generate JSON-LD structured data for a product.
 * This helps search engines understand product information for rich results.
 */
export function generateProductStructuredData(product: Product) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.shortDescription,
    image: product.images.map((img) => `${siteConfig.baseUrl}${img.url}`),
    brand: {
      "@type": "Brand",
      name: siteConfig.brand,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability: "https://schema.org/InStock",
      url: `${siteConfig.baseUrl}/shop/${product.slug}`,
      seller: {
        "@type": "Organization",
        name: siteConfig.brand,
        url: siteConfig.baseUrl,
      },
    },
    category: product.category,
    keywords: product.tags.join(", "),
    additionalProperty: product.features.map((feature) => ({
      "@type": "PropertyValue",
      name: "Feature",
      value: feature,
    })),
  };

  // Add digital-specific properties
  if (product.type === "digital") {
    structuredData.additionalProperty.push({
      "@type": "PropertyValue",
      name: "Product Type",
      value: "Digital Download",
    });

    if (product.licenseType && product.licenseType !== "none") {
      structuredData.additionalProperty.push({
        "@type": "PropertyValue",
        name: "License",
        value: product.licenseType,
      });
    }
  }

  return JSON.stringify(structuredData);
}

/**
 * Generate JSON-LD structured data for a product list (breadcrumb).
 */
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.baseUrl}${item.url}`,
    })),
  };

  return JSON.stringify(structuredData);
}
