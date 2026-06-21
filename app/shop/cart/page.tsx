"use client";

import { useCart } from "@/lib/shop/cart-context";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default function CartPage() {
  const { cart, removeItem, updateQuantity, clearCart } = useCart();

  if (cart.items.length === 0) {
    return (
      <section className="relative px-6 py-24 min-h-[60vh]">
        <div className="mx-auto max-w-4xl">
          <Link href="/shop" className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors mb-8">
            <ArrowLeft size={16} />
            Back to Shop
          </Link>

          <div className="card-base p-12 text-center">
            <ShoppingBag size={48} className="mx-auto mb-4 text-[var(--text-muted)]" />
            <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
              Your cart is empty
            </h1>
            <p className="text-[var(--text-secondary)] mb-6">
              Add some products to get started
            </p>
            <Link href="/shop">
              <Button variant="primary">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Link href="/shop" className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors mb-8">
          <ArrowLeft size={16} />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                Shopping Cart ({cart.itemCount})
              </h1>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="text-[var(--text-muted)] hover:text-red-400"
              >
                <Trash2 size={14} className="mr-2" />
                Clear Cart
              </Button>
            </div>

            {cart.items.map((item) => (
              <div
                key={item.product.id}
                className="card-base p-4 flex gap-4"
              >
                {/* Product Image */}
                {item.product.images[0] && (
                  <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded bg-[rgba(15,15,15,0.35)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)]">
                    <Image
                      src={item.product.images[0].url}
                      alt={item.product.images[0].alt}
                      fill
                      className="object-contain"
                      sizes="96px"
                    />
                  </div>
                )}

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <Link
                        href={`/shop/${item.product.slug}`}
                        className="text-base font-semibold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors line-clamp-1"
                      >
                        {item.product.title}
                      </Link>
                      <p className="text-sm text-[var(--text-secondary)] mt-1">
                        {item.product.shortDescription}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-lg font-semibold text-[var(--text-primary)]">
                        ${item.product.price}
                      </div>
                      <Badge variant="muted" className="mt-1 text-[0.6rem]">
                        {item.product.type}
                      </Badge>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="h-8 w-8 p-0"
                      >
                        <Minus size={12} />
                      </Button>
                      <span className="w-8 text-center font-mono text-sm text-[var(--text-primary)]">
                        {item.quantity}
                      </span>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus size={12} />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.product.id)}
                      className="text-[var(--text-muted)] hover:text-red-400"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card-base p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Subtotal</span>
                  <span className="text-[var(--text-primary)] font-mono">
                    ${cart.total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Items</span>
                  <span className="text-[var(--text-primary)] font-mono">
                    {cart.itemCount}
                  </span>
                </div>
                <div className="border-t border-[rgba(255,255,255,0.08)] pt-3">
                  <div className="flex justify-between text-base font-semibold">
                    <span className="text-[var(--text-primary)]">Total</span>
                    <span className="text-[var(--accent-primary)] font-mono">
                      ${cart.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => {
                  // Stub for PayHero checkout
                  console.log("PayHero checkout stub triggered");
                }}
              >
                Proceed to Checkout
              </Button>

              <div className="mt-4 text-center">
                <Link href="/shop" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                  Continue Shopping
                </Link>
              </div>

              <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.08)]">
                <p className="text-xs text-[var(--text-muted)] text-center">
                  Secure checkout powered by PayHero (Coming Soon)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
