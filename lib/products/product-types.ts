/**
 * Offering type definitions for the shop system.
 * Supports both Services and Digital Products with marketplace integrations.
 */

export type OfferingType = "service" | "digital";
export type ProductCategory = "tools" | "templates" | "courses" | "books" | "hardware" | "other";
export type ServiceCategory = "linux-administration" | "vps-setup" | "nginx-configuration" | "automation" | "consulting" | "other";
export type LicenseType = "personal" | "commercial" | "enterprise" | "none";

/**
 * Marketplace links for external platforms.
 * Extensible - add new platforms as needed.
 */
export interface MarketplaceLinks {
  fiverr?: string;
  sproutGigs?: string;
  gumroad?: string;
  payhip?: string;
  // Future platforms: upwork?, contra?, githubSponsors?, koFi?, buyMeACoffee?, stripeCheckout?
}

/**
 * Base offering interface with shared fields.
 */
export interface BaseOffering {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  pricing: string;
  deliveryEstimate: string;
  featured: boolean;
  customOrderSupported: boolean;
  marketplaceLinks: MarketplaceLinks;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  status: "draft" | "published" | "archived";
}

/**
 * Service-specific fields.
 */
export interface Service extends BaseOffering {
  type: "service";
  deliverables: string[];
  requirements?: string[];
}

/**
 * Digital Product-specific fields.
 */
export interface DigitalProduct extends BaseOffering {
  type: "digital";
  shortDescription: string;
  longDescription: string;
  tags: string[];
  features: string[];
  images: ProductImage[];
  downloadUrl?: string;
  licenseType?: LicenseType;
}

/**
 * Union type for all offerings.
 */
export type Offering = Service | DigitalProduct;

/**
 * Legacy Product type for backward compatibility.
 * @deprecated Use Offering instead.
 */
export type ProductType = "digital" | "physical";

export interface Product {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  type: ProductType;
  price: number;
  currency: string;
  category: ProductCategory;
  tags: string[];
  features: string[];
  images: ProductImage[];
  downloadUrl?: string;
  licenseType?: LicenseType;
  createdAt: string;
  updatedAt: string;
  featured: boolean;
  status: "draft" | "published" | "archived";
  marketplaceLinks?: MarketplaceLinks;
  customOrderSupported?: boolean;
}

export interface ProductImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

/**
 * PayHero-compatible checkout session interface.
 * This is a stub that will be replaced with actual PayHero integration.
 */
export interface CheckoutSession {
  id: string;
  url?: string;
  status: "pending" | "completed" | "failed";
  amount: number;
  currency: string;
  items: CartItem[];
  createdAt: string;
}

/**
 * Checkout options for PayHero integration.
 */
export interface CheckoutOptions {
  successUrl?: string;
  cancelUrl?: string;
  metadata?: Record<string, string>;
}
