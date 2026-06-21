"use client";

import dynamic from "next/dynamic";

const CartProvider = dynamic(
  () => import("@/lib/shop/cart-context").then(m => m.CartProvider),
  { ssr: false }
);

export function SafeCartProvider({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
