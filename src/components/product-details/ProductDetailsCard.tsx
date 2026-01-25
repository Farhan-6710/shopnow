"use client"; // Ensures this component is rendered on the client side

import React, { useMemo } from "react";
import ProductActions from "../shared/ProductActions";
import Rating from "../home/products-grid/Rating";
import { Button } from "../ui/button";
import { TransitionLink } from "@/components/shared/TransitionLink";
import { Product } from "@/types/product";
import { useCartManagement } from "@/hooks/useCartManagement";
import WishlistToggle from "../shared/WishlistToggle";
import { getProductTags } from "@/utils/products/products";
import { useTheme } from "next-themes";
import ProductDetailsCarousel from "./ProductDetailsCarousel";

interface ProductDetailsCardProps {
  item: Product;
  isHighlighted?: boolean;
  fetchImageWithTimeout: (url: string) => Promise<Blob | null>;
}

const ProductDetailsCard: React.FC<ProductDetailsCardProps> = ({ item }) => {
  const { theme } = useTheme();

  const {
    isInCart,
    quantity,
    currency,
    isAdding,
    isRemoving,
    isUpdating,
    handleAddToCart,
    handleRemoveFromCart,
    handleIncrementQuantity,
    handleDecrementQuantity,
  } = useCartManagement(item);

  // Get all applicable tags with memoization
  const tags = useMemo(() => {
    return getProductTags(item, isInCart, theme === "dark" ? "dark" : "light");
  }, [item, isInCart, theme]);

  // Display price based on selected currency
  const displayPrice = (currency: "USD" | "INR") => {
    const price = item.prices[currency];
    if (typeof price !== "number" || isNaN(price)) {
      return "0.00"; // Fallback value in case of invalid price
    }
    return price.toFixed(2); // Return price formatted to two decimal places
  };

  return (
    <div className="p-4 w-full">
      <div className="relative bg-card border rounded-lg">
        <WishlistToggle item={item} className="left-3 top-3 z-10" />

        <div className="flex flex-col lg:flex-row p-6 gap-6">
          {/* Product Carousel */}
          <div className="w-full lg:w-5/12">
            <ProductDetailsCarousel imgSrc={item.imgSource} alt={item.name} />
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-7/12 flex flex-col justify-center gap-4">
            {/* Title and Tags */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                {item.name}
              </h1>
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-foreground rounded-full py-1 px-2.5 text-xs whitespace-nowrap"
                      style={tag.style}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {item.description}
            </p>

            {/* Price and Rating */}
            <div className="flex flex-col gap-2">
              <p className="text-3xl lg:text-4xl font-bold text-foreground">
                {currency === "INR" ? "₹" : "$"}
                {displayPrice(currency)}
              </p>
              <Rating rating={item.rating ?? 0} totalStars={5} />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4">
              <ProductActions
                itemName={item.name}
                available={item.status === "available"}
                quantity={quantity}
                isInCart={isInCart}
                isAdding={isAdding}
                isRemoving={isRemoving}
                isUpdating={isUpdating}
                onAddToCart={handleAddToCart}
                onRemove={handleRemoveFromCart}
                onIncrement={handleIncrementQuantity}
                onDecrement={handleDecrementQuantity}
              />
              <TransitionLink href="/">
                <Button variant="outline" className="w-full sm:w-auto">
                  Back To Home
                </Button>
              </TransitionLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
