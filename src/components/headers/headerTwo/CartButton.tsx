"use client";

import React, { useState } from "react";
import { ShoppingCart, BotIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Sheet from "@/components/atoms/Sheet";
import AiAssistant from "@/components/ai-assistant/AiAssistant";
import { useFilterProducts } from "@/hooks/useFilterProducts";

interface CartButtonProps {
  cartCount: number;
}

const CartButton: React.FC<CartButtonProps> = ({ cartCount }) => {
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const { productsFromApiRes } = useFilterProducts();

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 w-full">
      <Link href="/cart" className="w-full md:w-fit">
        <Button
          size="default"
          className="w-full bg-primary text-primary-foreground rounded-md px-3 py-2 gap-2"
        >
          <div className="relative">
            <ShoppingCart className="size-4 font-bold" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 bg-red-500 text-destructive-foreground text-[8px] font-bold rounded-full">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-sm font-bold">My Cart</span>
        </Button>
      </Link>

      <Sheet
        open={isAiAssistantOpen}
        onOpenChange={setIsAiAssistantOpen}
        trigger={
          <Button
            variant="outline"
            size="default"
            className="w-full md:w-auto rounded-md px-3 py-2 gap-2"
          >
            <BotIcon className="size-4" />
            <span className="text-sm font-bold">AI Assistant</span>
          </Button>
        }
        side="right"
        className="w-full sm:max-w-md h-full p-0 outline-none"
      >
        <AiAssistant
          className="h-full border-0 rounded-none shadow-none"
          title="ShopNow Assistant"
          placeholder="Ask about products, orders, or anything..."
          context={productsFromApiRes}
        />
      </Sheet>
    </div>
  );
};

export default CartButton;
