"use client";

import React, { memo, useMemo } from "react";
import ProductDetails from "../../product-details/ProductDetails";
import ProductActions from "../../shared/ProductActions";
import { useTheme } from "next-themes";
import { TransitionLink } from "@/components/shared/TransitionLink";
import { Product } from "@/types/product";
import { useCartManagement } from "@/hooks/useCartManagement";
import { motion } from "framer-motion";
import { getProductTags } from "@/utils/products/products";
import WishlistToggle from "../../shared/WishlistToggle";
import ProductImage from "../../shared/ProductImage";

/* ✅ Memoized child components */
const MemoProductImage = memo(ProductImage);
const MemoProductDetails = memo(ProductDetails);

interface ProductCardProps {
  index?: number;
  item: Product;
  itemsPerRow?: number;
  style?: React.CSSProperties;
  priority?: boolean;
}

const ProductCard = React.forwardRef<HTMLElement, ProductCardProps>(
  ({ index = 0, item, itemsPerRow = 5, style, priority = false }, ref) => {
    const { theme } = useTheme();

    // Calculate relative position within the current row for stagger animation
    // This ensures each new row's animation starts from 0, not accumulating delay
    const relativeIndex = index % itemsPerRow;

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

    /* ✅ Memoized derived values */
    const displayPrice = useMemo(() => {
      const price = item.prices[currency];
      if (typeof price !== "number" || isNaN(price)) return "0.00";
      return price.toFixed(2);
    }, [item.prices, currency]);

    const tag = useMemo(() => {
      const tags = getProductTags(
        item,
        isInCart,
        theme === "dark" ? "dark" : "light",
        1
      );
      return tags[0] || null;
    }, [item, isInCart, theme]);

    return (
      <motion.article
        ref={ref}
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.3,
          delay: relativeIndex * 0.075,
          ease: "easeOut",
        }}
        className="w-full flex flex-col h-full"
        style={style}
      >
        <div className="product-card group relative border bg-card text-center h-full pt-0 pb-6 rounded-lg transition-all duration-300">
          {/* Wishlist */}
          <WishlistToggle item={item} />

          {/* Tag */}
          {tag && (
            <div
              className="absolute -right-2 -top-2 z-1 text-[10px] px-2 py-1 rounded-bl-lg rounded-tr-lg"
              style={tag?.style}
            >
              <p>{tag?.label}</p>
            </div>
          )}

          <TransitionLink
            href={`/products/${encodeURIComponent(item.name)}`}
            className="group flex flex-col items-center"
            aria-label={`View details for ${item.name}`}
          >
            {/* ✅ Will NOT re-render on quantity change */}
            <MemoProductImage
              imgSource={item.imgSource}
              available={item.status === "available"}
              alt={item.name}
              priority={priority}
            />

            <MemoProductDetails
              name={item.name}
              currency={currency}
              displayPrice={displayPrice}
              rating={item.rating ?? 0}
            />
          </TransitionLink>

          {/* ✅ This WILL re-render (expected) */}
          <div className="mt-4">
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
              showRemoveConfirmation
            />
          </div>
        </div>
      </motion.article>
    );
  }
);

ProductCard.displayName = "ProductCard";

export default ProductCard;
