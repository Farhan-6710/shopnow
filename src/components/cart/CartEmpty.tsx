"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CartEmpty: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 border bg-card">
      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
        <ShoppingCart className="size-12 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-2">
        Your cart is empty
      </h2>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        Explore our products and add items to your cart to get started with your
        shopping journey.
      </p>
      <Button asChild>
        <Link href="/">Continue Shopping</Link>
      </Button>
    </div>
  );
};

export default CartEmpty;
