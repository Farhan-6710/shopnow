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
          size="lg"
          className="bg-primary text-primary-foreground rounded-lg px-4 py-4 gap-3"
        >
          <div className="relative">
            <ShoppingCart className="size-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-red-500 text-destructive-foreground text-[10px] font-bold rounded-full">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-lg font-bold">My Cart</span>
        </Button>
      </Link>
    </div>
  );
};

export default CartButton;
