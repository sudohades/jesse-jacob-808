import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { ProductCard } from "@/components/shop/ProductCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Shop",
  description: "Digital products, tools, templates, and resources for developers and system administrators.",
  path: "/shop",
});

export default async function ShopPage() {
  const res = await fetch(`${siteConfig.baseUrl}/api/products`, { cache: "no-store" });
  const allProducts = await res.json();
  const featuredProducts = allProducts.filter((p: any) => p.featured);
  
  const categoriesRes = await fetch(`${siteConfig.baseUrl}/api/products?categories=true`, { cache: "no-store" });
  const categories = await categoriesRes.json();

  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14">
          <SectionHeader
            eyebrow="// shop"
            title="Products & Tools"
            subtitle="Digital resources, templates, and tools for developers and system administrators."
          />
        </div>

        {/* Category Filters */}
        <div className="mb-10 flex flex-wrap gap-3">
          <Link href="/shop">
            <Button variant="primary" size="sm">
              All Products
            </Button>
          </Link>
          {categories.map((category: any) => (
            <Link key={category} href={`/shop?category=${category}`}>
              <Button variant="ghost" size="sm">
                {category}
              </Button>
            </Link>
          ))}
        </div>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="cyan" dot>
                Featured
              </Badge>
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                Featured Products
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* All Products */}
        <div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
            All Products
          </h2>
          {allProducts.length === 0 ? (
            <div className="card-base p-8 text-[var(--text-muted)] font-mono text-sm">
              No products available yet. Check back soon!
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {allProducts.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
