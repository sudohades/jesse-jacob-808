/**
 * Payment checkout integration layer for PayHero.
 * 
 * This module handles checkout session creation and payment processing.
 * 
 * ENVIRONMENT VARIABLES REQUIRED FOR PRODUCTION:
 * - PAYHERO_API_KEY: Your PayHero API secret key
 * - PAYHERO_PUBLIC_KEY: Your PayHero publishable key
 * 
 * To enable production mode, set PAYHERO_API_KEY in your environment.
 * Without this variable, the system runs in mock mode for testing.
 */

import { type CartItem, type CheckoutSession, type CheckoutOptions } from "@/lib/products/product-types";

const PAYHERO_API_KEY = process.env.PAYHERO_API_KEY || "";
const PAYHERO_API_URL = process.env.PAYHERO_API_URL || "https://api.payhero.co/v1";

const isMockMode = !PAYHERO_API_KEY;

/**
 * Create a checkout session for the given cart items.
 * 
 * In mock mode (no API key): Returns a simulated session for testing.
 * In production mode: Calls PayHero API to create a real checkout session.
 * 
 * @param cartItems - Array of cart items to checkout
 * @param options - Optional checkout configuration (successUrl, cancelUrl, metadata)
 * @returns Promise resolving to a CheckoutSession
 */
export async function createCheckoutSession(
  cartItems: CartItem[],
  options: CheckoutOptions = {}
): Promise<CheckoutSession> {
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const currency = cartItems[0]?.product.currency || "USD";

  if (isMockMode) {
    console.log("[PayHero Mock Mode] Running in mock mode - set PAYHERO_API_KEY to enable production");
    return createMockSession(cartItems, total, currency);
  }

  try {
    // Production mode: Call PayHero API
    const response = await fetch(`${PAYHERO_API_URL}/checkout/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${PAYHERO_API_KEY}`,
      },
      body: JSON.stringify({
        amount: total,
        currency,
        items: cartItems.map(item => ({
          id: item.product.id,
          name: item.product.title,
          quantity: item.quantity,
          price: item.product.price,
        })),
        success_url: options.successUrl || `${process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}/shop/success`,
        cancel_url: options.cancelUrl || `${process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}/shop/cart`,
        metadata: options.metadata || {},
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create checkout session");
    }

    const session = await response.json();

    return {
      id: session.id,
      url: session.checkout_url,
      status: "pending",
      amount: total,
      currency,
      items: cartItems,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("[PayHero] Error creating checkout session:", error);
    throw error;
  }
}

/**
 * Create a mock checkout session for testing purposes.
 */
async function createMockSession(
  cartItems: CartItem[],
  total: number,
  currency: string
): Promise<CheckoutSession> {
  // Simulate API delay
  const delay = Math.random() * 500 + 300;
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockSession: CheckoutSession = {
        id: `mock_session_${Date.now()}`,
        url: undefined, // Mock mode doesn't redirect to payment provider
        status: "pending",
        amount: total,
        currency,
        items: cartItems,
        createdAt: new Date().toISOString(),
      };

      console.log("[PayHero Mock] Checkout session created:", mockSession);
      resolve(mockSession);
    }, delay);
  });
}

/**
 * Validate checkout session status.
 * 
 * This is a STUB implementation.
 * When PayHero is integrated, this will:
 * 1. Query PayHero API for session status
 * 2. Return actual payment status
 * 
 * @param sessionId - The checkout session ID
 * @returns Promise resolving to the session status
 */
export async function getCheckoutSessionStatus(sessionId: string): Promise<"pending" | "completed" | "failed"> {
  // STUB: Return mock status
  console.log("[PayHero Stub] Checking session status for:", sessionId);
  return "pending";
}

/**
 * Handle webhook events from payment provider.
 * 
 * This is a STUB implementation.
 * When PayHero is integrated, this will:
 * 1. Verify webhook signature
 * 2. Parse event data
 * 3. Update order status in database
 * 4. Trigger fulfillment (downloads, licenses, etc.)
 * 
 * @param event - Webhook event payload
 * @returns Promise resolving when event is processed
 */
export async function handlePaymentWebhook(event: unknown): Promise<void> {
  // STUB: Log webhook event
  console.log("[PayHero Stub] Webhook received:", event);
}

/**
 * Calculate fees for a transaction.
 * 
 * This is a STUB implementation.
 * When PayHero is integrated, this will:
 * 1. Apply PayHero fee structure
 * 2. Return accurate fee calculation
 * 
 * @param amount - Transaction amount
 * @param currency - Currency code
 * @returns Fee amount
 */
export function calculateTransactionFee(amount: number): number {
  // STUB: Mock fee calculation (2.9% + $0.30 typical Stripe-like fee)
  const percentageFee = amount * 0.029;
  const fixedFee = 0.30;
  return percentageFee + fixedFee;
}

/**
 * Format price for display with currency symbol.
 * 
 * @param amount - Price amount
 * @param currency - Currency code (USD, EUR, etc.)
 * @returns Formatted price string
 */
export function formatPrice(amount: number, currency: string = "USD"): string {
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  const symbol = symbols[currency] || currency;
  return `${symbol}${amount.toFixed(2)}`;
}

/**
 * Validate product availability before checkout.
 * 
 * This is a STUB implementation.
 * When PayHero is integrated, this will:
 * 1. Check inventory for physical products
 * 2. Verify download links for digital products
 * 3. Validate license availability
 * 
 * @param cartItems - Cart items to validate
 * @returns Object with validation result and errors
 */
export async function validateCartItems(): Promise<{
  valid: boolean;
  errors: string[];
}> {
  // STUB: All items are valid for now
  const errors: string[] = [];
  
  // Future: Add inventory checks for physical products
  // Future: Add download link validation for digital products
  
  return {
    valid: errors.length === 0,
    errors,
  };
}
