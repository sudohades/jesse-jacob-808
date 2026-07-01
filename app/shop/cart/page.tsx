"use client";

import { useCart } from "@/lib/shop/cart-context";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useState } from "react";

export default function CartPage() {
  const { cart, removeItem, updateQuantity, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleRemove = (productId: string) => {
    removeItem(productId);
  };

  const handleClearCart = () => {
    if (confirm("Are you sure you want to clear your cart?")) {
      clearCart();
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Navigate to checkout page
    window.location.href = "/shop/checkout";
  };

  if (cart.items.length === 0) {
    return (
      <section className="relative px-6 py-24 min-h-[60vh]">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[rgba(15,15,15,0.35)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] mb-6">
              <ShoppingBag size={32} className="text-[var(--text-muted)]" />
            </div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
              Your cart is empty
            </h1>
            <p className="text-[var(--text-secondary)] mb-8">
              Looks like you haven&apos;t added any products yet.
            </p>
            <Link href="/shop">
              <Button variant="primary" size="lg">
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
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors mb-4"
          >
            <ArrowLeft size={16} />
            Back to Shop
          </Link>
          <SectionHeader
            eyebrow="// cart"
            title="Shopping Cart"
            subtitle={`You have ${cart.itemCount} item${cart.itemCount !== 1 ? "s" : ""} in your cart`}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.product.id}
                className="card-base p-4 flex gap-4 items-start"
              >
                {/* Product Image */}
                {item.product.images[0] && (
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-[rgba(15,15,15,0.35)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)]">
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
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="min-w-0">
                      <Link
                        href={`/shop/${item.product.slug}`}
                        className="text-base font-semibold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors line-clamp-1"
                      >
                        {item.product.title}
                      </Link>
                      <p className="text-sm text-[var(--text-muted)] mt-1">
                        {item.product.category}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-lg font-semibold text-[var(--accent-primary)]">
                        ${item.product.price}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className={cn(
                          "w-8 h-8 rounded-md flex items-center justify-center transition-colors",
                          "border border-[rgba(255,255,255,0.08)] text-[var(--text-secondary)]",
                          "hover:border-[rgba(210,107,255,0.35)] hover:text-[var(--text-primary)]",
                          "disabled:opacity-50 disabled:cursor-not-allowed"
                        )}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-12 text-center font-mono text-sm text-[var(--text-primary)]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        className={cn(
                          "w-8 h-8 rounded-md flex items-center justify-center transition-colors",
                          "border border-[rgba(255,255,255,0.08)] text-[var(--text-secondary)]",
                          "hover:border-[rgba(210,107,255,0.35)] hover:text-[var(--text-primary)]"
                        )}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemove(item.product.id)}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors",
                        "text-[var(--text-muted)] hover:text-red-400",
                        "hover:bg-[rgba(239,68,68,0.1)]"
                      )}
                      aria-label={`Remove ${item.product.title} from cart`}
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear Cart Button */}
            <button
              onClick={handleClearCart}
              className="w-full py-3 text-sm text-[var(--text-muted)] hover:text-red-400 transition-colors"
            >
              Clear Cart
            </button>
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
                  <span className="text-[var(--text-secondary)]">Tax</span>
                  <span className="text-[var(--text-primary)] font-mono">
                    $0.00
                  </span>
                </div>
                <div className="h-px border-t border-[rgba(255,255,255,0.08)] my-4" />
                <div className="flex justify-between">
                  <span className="text-base font-semibold text-[var(--text-primary)]">
                    Total
                  </span>
                  <span className="text-xl font-bold text-[var(--accent-primary)] font-mono">
                    ${cart.total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Proceed to Checkout
                    <Check size={16} />
                  </span>
                )}
              </Button>

              <p className="text-xs text-[var(--text-muted)] text-center mt-4">
                Secure checkout powered by PayHero
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
