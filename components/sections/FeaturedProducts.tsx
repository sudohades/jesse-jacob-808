import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeInUp, StaggerContainer } from "@/components/animations/FadeInUp";
import { getFeaturedProducts } from "@/lib/server/products/get-products";
import { Badge } from "@/components/ui/Badge";

export function FeaturedProducts() {
  const products = getFeaturedProducts().slice(0, 3);

  if (products.length === 0) return null;

  return (
    <section className="relative px-6 py-24" aria-labelledby="products-heading">
      <div className="mx-auto max-w-6xl">
        <div className="glow-line mb-16" aria-hidden />

        <FadeInUp className="flex items-end justify-between gap-4 flex-wrap">
          <SectionHeader
            eyebrow="// shop"
            title="Featured products."
            subtitle="Digital tools and resources to accelerate your development workflow."
          />

          <Link
            href="/shop"
            className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors font-medium whitespace-nowrap"
          >
            All products <ArrowRight size={14} aria-hidden />
          </Link>
        </FadeInUp>

        <StaggerContainer
          stagger={0.06}
          delayStart={0.1}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/shop/${product.slug}`}
              className="card-base group p-6 transition-all duration-300 hover:shadow-[0_0_24px_rgba(210,107,255,0.15)] hover:border-[rgba(210,107,255,0.3)]"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[rgba(15,15,15,0.35)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] text-[var(--text-muted)] transition-colors group-hover:border-[rgba(210,107,255,0.2)] group-hover:text-[var(--accent-primary)]">
                  <ShoppingBag size={16} aria-hidden />
                </div>
                <Badge variant="muted" className="font-mono text-[0.6rem]">
                  {product.category}
                </Badge>
              </div>

              <h3 className="text-sm font-semibold text-[var(--text-primary)] tracking-tight mb-2 group-hover:text-[var(--accent-primary)] transition-colors line-clamp-2">
                {product.title}
              </h3>

              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4 line-clamp-2">
                {product.shortDescription}
              </p>

              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-[var(--text-primary)]">
                  ${product.price}
                </span>
                <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--accent-secondary)]" aria-hidden />
              </div>
            </Link>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
