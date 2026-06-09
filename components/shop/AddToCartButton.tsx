"use client";

import { Button } from "@/components/ui/Button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/shop/cart-context";
import { type Product } from "@/lib/products/product-types";

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <Button
      variant="primary"
      size="lg"
      className="flex-1"
      onClick={() => {
        addItem(product);
      }}
    >
      <ShoppingCart size={18} />
      Add to Cart
    </Button>
  );
}
