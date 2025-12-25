"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CartButtonProps {
  cartCount: number;
}

const CartButton: React.FC<CartButtonProps> = ({ cartCount }) => {
  return (
    <div className="hidden md:flex flex-col justify-center items-center md:text-right md:w-3/12">
      <Link href="/cart" className="...">
        <Button
          size="default"
          className="bg-primary text-primary-foreground rounded-md px-3 py-2 gap-2"
        >
          <div className="relative">
            <ShoppingCart className="size-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 bg-red-500 text-destructive-foreground text-[8px] font-bold rounded-full">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-sm font-bold">My Cart</span>
        </Button>
      </Link>
    </div>
  );
};

export default CartButton;
