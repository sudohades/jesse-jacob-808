"use client";

import { useCart } from "@/lib/shop/cart-context";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Lock, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useState } from "react";
import { createCheckoutSession } from "@/lib/payments/checkout";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const handleCheckout = async () => {
    if (cart.items.length === 0) {
      setError("Your cart is empty");
      return;
    }

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Create checkout session
      const session = await createCheckoutSession(cart.items, {
        successUrl: `${window.location.origin}/shop/success?session_id={session.id}`,
        cancelUrl: `${window.location.origin}/shop/cart`,
        metadata: {
          email,
        },
      });

      // Redirect to payment provider
      if (session.url) {
        window.location.href = session.url;
      } else {
        // For stub implementation, simulate success
        clearCart();
        window.location.href = "/shop/success";
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to initiate checkout");
      setIsProcessing(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <section className="relative px-6 py-24 min-h-[60vh]">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[rgba(15,15,15,0.35)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] mb-6">
              <AlertCircle size={32} className="text-[var(--text-muted)]" />
            </div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
              Your cart is empty
            </h1>
            <p className="text-[var(--text-secondary)] mb-8">
              Add products to your cart before checking out.
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
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/shop/cart"
            className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors mb-4"
          >
            <ArrowLeft size={16} />
            Back to Cart
          </Link>
          <SectionHeader
            eyebrow="// checkout"
            title="Complete Your Purchase"
            subtitle="Secure checkout powered by PayHero"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-3 space-y-6">
            {/* Email Form */}
            <div className="card-base p-6">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <Lock size={18} className="text-[var(--accent-primary)]" />
                Contact Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={cn(
                      "w-full px-4 py-3 rounded-md bg-[rgba(15,15,15,0.35)] backdrop-blur-xl",
                      "border border-[rgba(255,255,255,0.08)] text-[var(--text-primary)]",
                      "placeholder:text-[var(--text-muted)]",
                      "focus:border-[rgba(210,107,255,0.35)] focus:outline-none",
                      "transition-colors"
                    )}
                    disabled={isProcessing}
                  />
                  <p className="text-xs text-[var(--text-muted)] mt-2">
                    We&apos;ll send your purchase confirmation and download links to this email.
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="card-base p-6">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                Order Items
              </h2>

              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 items-start">
                    {item.product.images[0] && (
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-[rgba(15,15,15,0.35)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)]">
                        <Image
                          src={item.product.images[0].url}
                          alt={item.product.images[0].alt}
                          fill
                          className="object-contain"
                          sizes="64px"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/shop/${item.product.slug}`}
                        className="text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors line-clamp-1"
                      >
                        {item.product.title}
                      </Link>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-[var(--text-muted)]">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-sm font-semibold text-[var(--accent-primary)]">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="card-base p-4 border border-red-500/30 bg-red-500/10">
                <div className="flex items-start gap-3">
                  <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Lock size={16} />
                  Pay ${cart.total.toFixed(2)}
                </span>
              )}
            </Button>

            <p className="text-xs text-[var(--text-muted)] text-center">
              By completing this purchase, you agree to our Terms of Service.
            </p>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
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

              {/* Security Badges */}
              <div className="space-y-3 pt-4 border-t border-[rgba(255,255,255,0.08)]">
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <Check size={14} className="text-[var(--accent-primary)]" />
                  <span>Secure SSL encryption</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <Check size={14} className="text-[var(--accent-primary)]" />
                  <span>Instant digital delivery</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <Check size={14} className="text-[var(--accent-primary)]" />
                  <span>Lifetime access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
