"use client";

import React, { useState } from "react";
import { ShoppingCart, Heart, BotIcon, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Sheet from "@/components/atoms/Sheet";
import AiAssistant from "@/components/ai-assistant/AiAssistant";
import { useFilterProducts } from "@/hooks/useFilterProducts";
import { useTheme } from "next-themes";

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
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      {/* Theme Toggle */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      {/* Wishlist Button */}
      <Link href="/wishlist">
        <Button
          variant="outline"
          size="icon"
          className="relative rounded-lg"
          aria-label={`Wishlist with ${wishlistCount} items`}
        >
          <Heart className="size-4" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 bg-destructive text-white text-[12px] font-bold rounded-full">
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
          <ShoppingCart className="size-4" />
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
            aria-label="Open AI Assistant"
          >
            <BotIcon className="size-4 text-primary" />
            <span className="text-sm font-bold">AI Assistant</span>
          </Button>
        }
        side="right"
        className="w-full sm:max-w-md h-full p-0 outline-none"
        title="ShopNow AI Assistant"
        description="Chat with our AI to find products, get recommendations, and more."
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
