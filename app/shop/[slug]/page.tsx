import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { generateProductStructuredData, generateBreadcrumbStructuredData } from "@/lib/seo/product-structured-data";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Download, Package, Check } from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";
import { MarketplaceActions } from "@/components/shop/MarketplaceActions";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { getProductBySlug, getRelatedProducts } from "@/lib/server/internal/product-by-slug";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return buildMetadata({ title: "Product Not Found", path: "/shop" });
  }

  return buildMetadata({
    title: product.title,
    description: product.shortDescription,
    path: `/shop/${product.slug}`,
    ogImage: product.images[0]?.url,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product, 3);
  const isDigital = product.type === "digital";

  // Generate structured data
  const productStructuredData = generateProductStructuredData(product);
  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
    { name: product.title, url: `/shop/${product.slug}` },
  ]);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: productStructuredData }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbStructuredData }}
      />

      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-6xl">
          {/* Back Button */}
          <Link href="/shop" className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors mb-8">
            <ArrowLeft size={16} />
            Back to Shop
          </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            {product.images[0] && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[rgba(15,15,15,0.35)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)]">
                <Image
                  src={product.images[0].url}
                  alt={product.images[0].alt}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.slice(1).map((image: any, index: number) => (
                  <div key={index} className="relative aspect-square overflow-hidden rounded bg-[rgba(15,15,15,0.35)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)]">
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 25vw, 12.5vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant={isDigital ? "violet" : "default"}>
                  {isDigital ? (
                    <span className="flex items-center gap-1">
                      <Download size={10} />
                      Digital
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Package size={10} />
                      Physical
                    </span>
                  )}
                </Badge>
                <Badge variant="muted">{product.category}</Badge>
                {product.featured && (
                  <Badge variant="cyan" dot>
                    Featured
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-3">
                {product.title}
              </h1>

              <p className="text-2xl font-semibold text-[var(--accent-primary)] mb-4">
                {product.currency === "USD" ? "$" : ""}{product.price}
              </p>

              <p className="text-[var(--text-secondary)] leading-relaxed">
                {product.shortDescription}
              </p>
            </div>

            {/* Features */}
            {product.features.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">
                  Features
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature: any, index: number) => (
                    <li key={index} className="flex items-start gap-3 text-[var(--text-secondary)]">
                      <Check size={16} className="text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* License Info (Digital) */}
            {isDigital && product.licenseType && product.licenseType !== "none" && (
              <div className="p-4 rounded-lg bg-[rgba(15,15,15,0.35)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)]">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">
                  License: {product.licenseType}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  {product.licenseType === "personal" && "For personal and non-commercial projects."}
                  {product.licenseType === "commercial" && "For commercial projects and client work."}
                  {product.licenseType === "enterprise" && "For enterprise use with priority support."}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="pt-4 space-y-3">
              <AddToCartButton product={product} />
              <MarketplaceActions
                marketplaceLinks={{
                  fiverr: product.marketplaceLinks?.fiverr,
                  sproutGigs: product.marketplaceLinks?.sproutGigs,
                  gumroad: product.marketplaceLinks?.gumroad,
                  payhip: product.marketplaceLinks?.payhip,
                }}
                offeringTitle={product.title}
                customOrderSupported={product.customOrderSupported ?? false}
              />
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="pt-4 border-t border-[rgba(255,255,255,0.08)]">
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag: any) => (
                    <span
                      key={tag}
                      className="text-[0.65rem] font-mono text-[var(--text-muted)] border border-[rgba(255,255,255,0.08)] rounded px-2 py-1 bg-[rgba(15,15,15,0.35)] backdrop-blur-xl"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Long Description */}
        {product.longDescription && (
          <div className="mt-16 pt-8 border-t border-[rgba(255,255,255,0.08)]">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
              Description
            </h2>
            <div className="prose prose-invert max-w-none text-[var(--text-secondary)]">
              <p className="leading-relaxed whitespace-pre-wrap">{product.longDescription}</p>
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-8 border-t border-[rgba(255,255,255,0.08)]">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((relatedProduct: any) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
    </>
  );
}
