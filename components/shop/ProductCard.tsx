"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { type Product } from "@/lib/products/product-types";
import { ShoppingCart, Download, Package } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useCart } from "@/lib/shop/cart-context";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart();
  const primaryImage = product.images[0];
  const isDigital = product.type === "digital";

  return (
    <article
      className={cn(
        "card-base group relative overflow-hidden transition-all duration-300",
        "hover:shadow-[0_0_24px_rgba(210,107,255,0.15)] hover:border-[rgba(210,107,255,0.3)]",
        className
      )}
    >
      <Link href={`/shop/${product.slug}`} className="block">
        {/* Image */}
        {primaryImage && (
          <div className="relative aspect-[4/3] overflow-hidden bg-[rgba(15,15,15,0.35)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)]">
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {product.featured && (
              <div className="absolute top-3 right-3">
                <Badge variant="cyan" dot>
                  Featured
                </Badge>
              </div>
            )}
            <div className="absolute top-3 left-3">
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
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <Badge variant="muted" className="font-mono text-[0.6rem]">
              {product.category}
            </Badge>
            <div className="text-right">
              <div className="text-lg font-semibold text-[var(--text-primary)]">
                {product.currency === "USD" ? "$" : ""}{product.price}
              </div>
            </div>
          </div>

          <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2 line-clamp-2 group-hover:text-[var(--accent-primary)] transition-colors">
            {product.title}
          </h3>

          <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4">
            {product.shortDescription}
          </p>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {product.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[0.65rem] font-mono text-[var(--text-muted)] border border-[rgba(255,255,255,0.08)] rounded px-1.5 py-0.5 bg-[rgba(15,15,15,0.35)] backdrop-blur-xl"
                >
                  {tag}
                </span>
              ))}
              {product.tags.length > 3 && (
                <span className="text-[0.65rem] font-mono text-[var(--text-muted)]">
                  +{product.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>

      {/* Action - Outside Link */}
      <div className="p-5 pt-0">
        <Button
          variant="primary"
          size="sm"
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            console.log("Adding product:", product);
            addItem(product);
          }}
        >
          <ShoppingCart size={14} />
          Add to Cart
        </Button>
      </div>
    </article>
  );
}
