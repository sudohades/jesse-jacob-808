"use client";

import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import Link from "next/link";
import { Check, ShoppingBag, Home, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/shop/cart-context";

export default function SuccessPage() {
  const { cart } = useCart();
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    // Get session ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session_id");

    // In a real implementation, you would fetch order details from your API
    // using the session ID. For now, we'll use the cart state that was just cleared.
    setOrderDetails({
      sessionId: sessionId || "mock-session",
      total: cart.total,
      itemCount: cart.itemCount,
    });
  }, [cart]);

  return (
    <section className="relative px-6 py-24 min-h-[60vh]">
      <div className="mx-auto max-w-2xl text-center">
        {/* Success Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[rgba(34,197,94,0.15)] backdrop-blur-xl border border-[rgba(34,197,94,0.3)] mb-8">
          <Check size={48} className="text-green-400" />
        </div>

        <SectionHeader
          eyebrow="// order confirmed"
          title="Purchase Successful!"
          subtitle="Thank you for your order. A confirmation email has been sent to your inbox."
        />

        {/* Order Details */}
        {orderDetails && (
          <div className="card-base p-6 mb-8 text-left">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
              Order Details
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Order ID</span>
                <span className="text-[var(--text-primary)] font-mono">
                  {orderDetails.sessionId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Items</span>
                <span className="text-[var(--text-primary)]">
                  {orderDetails.itemCount} item{orderDetails.itemCount !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Total</span>
                <span className="text-[var(--accent-primary)] font-semibold font-mono">
                  ${orderDetails.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="card-base p-6 mb-8 text-left">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
            What&apos;s Next?
          </h3>
          <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
            <li className="flex items-start gap-3">
              <Check size={16} className="text-[var(--accent-primary)] flex-shrink-0 mt-0.5" />
              <span>Check your email for download links and license keys</span>
            </li>
            <li className="flex items-start gap-3">
              <Check size={16} className="text-[var(--accent-primary)] flex-shrink-0 mt-0.5" />
              <span>Save your purchase confirmation for future reference</span>
            </li>
            <li className="flex items-start gap-3">
              <Check size={16} className="text-[var(--accent-primary)] flex-shrink-0 mt-0.5" />
              <span>Reach out if you need any help with your purchase</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              <ShoppingBag size={18} className="mr-2" />
              Continue Shopping
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="lg" className="w-full sm:w-auto">
              <Home size={18} className="mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Support Link */}
        <p className="text-sm text-[var(--text-muted)] mt-8">
          Questions?{" "}
          <Link href="/contact" className="text-[var(--accent-primary)] hover:underline inline-flex items-center gap-1">
            Contact Support
            <ArrowRight size={14} />
          </Link>
        </p>
      </div>
    </section>
  );
}
