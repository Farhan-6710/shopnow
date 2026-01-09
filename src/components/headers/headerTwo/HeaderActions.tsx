"use client";

import React, { useState } from "react";
import { ShoppingCart, Heart, BotIcon, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sheet from "@/components/shared/Sheet";
import { useProductsQuery } from "@/hooks/useProductsQuery";
import { useTheme } from "next-themes";
import { showToast } from "@/config/ToastConfig";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import dynamic from "next/dynamic";
import AiAssistantSkeleton from "@/components/skeletons/AiAssistantSkeleton";
import { useSelector } from "react-redux";
import { selectCartSyncing } from "@/redux";
import { selectWishlistSyncing } from "@/redux/wishlist/wishlistSlice";
import { Spinner } from "@/components/ui/spinner";

const AiAssistant = dynamic(
  () => import("@/components/ai-assistant/AiAssistant"),
  {
    ssr: false,
    loading: () => <AiAssistantSkeleton />,
  }
);

interface HeaderActionsProps {
  cartCount: number;
  wishlistCount: number;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({
  cartCount,
  wishlistCount,
}) => {
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);

  const isCartSyncing = useSelector(selectCartSyncing);
  const isWishlistSyncing = useSelector(selectWishlistSyncing);

  const { products: productsFromApiRes } = useProductsQuery();
  const { setTheme, theme } = useTheme();

  const pathname = usePathname();
  const router = useRouter();

  /* ---------------- Generic route handler ---------------- */
  const handleRouteClick = (route: { PATHNAME: string; LABEL: string }) => {
    if (pathname === route.PATHNAME) {
      showToast({
        title: `Already in ${route.LABEL} Screen`,
        description: "Please click a different route to navigate",
      });
      return;
    }

    router.push(route.PATHNAME);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Home Button */}
      <Button
        onClick={() => handleRouteClick(ROUTES.HOME)}
        variant="outline"
        size="icon"
        className="rounded-lg"
        aria-label="Home"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </Button>

      {/* Wishlist Button */}
      <Button
        onClick={() => handleRouteClick(ROUTES.WISHLIST)}
        variant="outline"
        size="icon"
        className="relative rounded-lg"
        aria-label={`Wishlist with ${wishlistCount} items`}
      >
        {isWishlistSyncing ? (
          <Spinner className="size-4" />
        ) : (
          <Heart className="size-4" />
        )}
        {wishlistCount > 0 && !isWishlistSyncing && (
          <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 bg-destructive text-white text-[12px] font-bold rounded-full">
            {wishlistCount > 99 ? "99+" : wishlistCount}
          </span>
        )}
      </Button>

      {/* Cart Button */}
      <Button
        onClick={() => handleRouteClick(ROUTES.CART)}
        variant="outline"
        size="icon"
        className="relative rounded-lg"
        aria-label={`Cart with ${cartCount} items`}
      >
        {isCartSyncing ? (
          <Spinner className="size-4" />
        ) : (
          <ShoppingCart className="size-4" />
        )}
        {cartCount > 0 && !isCartSyncing && (
          <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 bg-primary text-primary-foreground text-[12px] font-bold rounded-full">
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}
      </Button>

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

      {/* AI Assistant */}
      <Sheet
        open={isAiAssistantOpen}
        onOpenChange={setIsAiAssistantOpen}
        trigger={
          <Button
            variant="outline"
            size="default"
            className="basis-full sm:basis-auto rounded-md px-3 py-4.5! gap-2"
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
