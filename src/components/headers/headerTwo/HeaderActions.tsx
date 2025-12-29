"use client";

import React, { useState } from "react";
import { ShoppingCart, Heart, BotIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Sheet from "@/components/atoms/Sheet";
import AiAssistant from "@/components/ai-assistant/AiAssistant";
import { useFilterProducts } from "@/hooks/useFilterProducts";

interface HeaderActionsProps {
  cartCount: number;
  wishlistCount: number;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({
  cartCount,
  wishlistCount,
}) => {
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const { productsFromApiRes } = useFilterProducts();

  return (
    <div className="flex items-center gap-2">
      {/* Wishlist Button */}
      <Link href="/wishlist">
        <Button
          variant="outline"
          size="icon"
          className="relative rounded-lg"
          aria-label={`Wishlist with ${wishlistCount} items`}
        >
          <Heart className="size-5" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-[12px] font-bold rounded-full">
              {wishlistCount > 99 ? "99+" : wishlistCount}
            </span>
          )}
        </Button>
      </Link>

      {/* Cart Button */}
      <Link href="/cart">
        <Button
          variant="outline"
          size="icon"
          className="relative rounded-lg"
          aria-label={`Cart with ${cartCount} items`}
        >
          <ShoppingCart className="size-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 bg-primary text-primary-foreground text-[12px] font-bold rounded-full">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </Button>
      </Link>

      {/* AI Assistant Button */}
      <Sheet
        open={isAiAssistantOpen}
        onOpenChange={setIsAiAssistantOpen}
        trigger={
          <Button
            variant="outline"
            size="default"
            className="w-full md:w-auto rounded-md px-3 py-2 gap-2 ml-3 text-foreground transition-all"
          >
            <BotIcon className="size-4 text-cyan-400" />
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

export default HeaderActions;
