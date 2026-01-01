"use client";

import React, { memo, useMemo } from "react";
import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";
import ProductActions from "./ProductActions";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Product } from "@/types/product";
import { useCartManagement } from "@/hooks/useCartManagement";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { getProductTag } from "@/utils/products/products";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleWishlistRequest,
  selectIsInWishlist,
} from "@/redux/wishlist/wishlistSlice";
import { showToast } from "@/config/ToastConfig";

/* ✅ Memoized child components */
const MemoProductImage = memo(ProductImage);
const MemoProductDetails = memo(ProductDetails);

interface ProductCardProps {
  index?: number;
  item: Product;
  fetchImageWithTimeout: (url: string) => Promise<Blob | null>;
}

const ProductCard = ({
  index = 0,
  item,
  fetchImageWithTimeout,
}: ProductCardProps) => {
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const isWishlisted = useSelector(selectIsInWishlist(item.id));

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    showToast({
      type: isWishlisted ? "info" : "success",
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: isWishlisted
        ? `${item.name} has been removed from your wishlist`
        : `${item.name} has been added to your wishlist`,
    });

    dispatch(toggleWishlistRequest(item));
  };

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
    return getProductTag(item, isInCart, theme === "dark" ? "dark" : "light");
  }, [item, isInCart, theme]);

  return (
    <motion.article
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.3,
        delay: index * 0.075,
        ease: "easeOut",
      }}
      className="px-4 md:px-2 p-2 w-full flex flex-col h-full"
    >
      <div className="product-card relative border bg-card text-center h-full pt-0 pb-6 rounded-lg transition-all duration-300">
        {/* Wishlist */}
        <motion.button
          className="absolute left-2 top-2 z-10 h-10 w-10 rounded-lg bg-card shadow-md flex items-center justify-center border cursor-pointer"
          whileTap={{ scale: 0.9 }}
          onClick={handleToggleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <FontAwesomeIcon
            icon={isWishlisted ? faHeartSolid : faHeartRegular}
            className={`text-lg ${
              isWishlisted ? "text-destructive" : "text-gray-400"
            }`}
          />
        </motion.button>

        {/* Tag */}
        {item.tags && item.tags?.length > 0 && (
          <div
            className="absolute -right-2 -top-2 text-[10px] px-2 py-1 rounded-bl-lg rounded-tr-lg"
            style={tag?.style}
          >
            <p>{tag?.label}</p>
          </div>
        )}

        <Link
          href={`/products/${encodeURIComponent(item.name)}`}
          className="flex flex-col items-center"
          aria-label={`View details for ${item.name}`}
        >
          {/* ✅ Will NOT re-render on quantity change */}
          <MemoProductImage
            imgSource={item.imgSource}
            alt={item.name}
            fetchImageWithTimeout={fetchImageWithTimeout}
          />

          <MemoProductDetails
            name={item.name}
            currency={currency}
            displayPrice={() => displayPrice}
            rating={item.rating ?? 0}
          />
        </Link>

        {/* ✅ This WILL re-render (expected) */}
        <div className="mt-4">
          <ProductActions
            itemName={item.name}
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
};

export default ProductCard;
