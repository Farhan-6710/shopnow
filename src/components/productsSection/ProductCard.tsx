"use client";

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
  toggleWishlist,
  selectIsInWishlist,
} from "@/redux/wishlist/wishlistSlice";
import { showToast } from "@/config/ToastConfig";

interface ProductCardProps {
  item: Product;
  fetchImageWithTimeout: (url: string) => Promise<Blob | null>;
}

const ProductCard = ({ item, fetchImageWithTimeout }: ProductCardProps) => {
  const dispatch = useDispatch();

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
    dispatch(toggleWishlist(item));
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

  const displayPrice = (currency: "USD" | "INR") => {
    const price = item.prices[currency];
    if (typeof price !== "number" || isNaN(price)) {
      return "0.00";
    }
    return price.toFixed(2);
  };

  const { theme } = useTheme();

  const tag = getProductTag(
    item,
    isInCart,
    theme === "dark" ? "dark" : "light"
  );

  return (
    <article
      className="px-4 md:px-2 p-2 w-full flex flex-col h-full"
      aria-label={`${item.name} item card`}
    >
      <div className="transition-all duration-200">
        <div
          className={`product-card relative border bg-card text-center h-full pt-0 pb-6 transition-all duration-300 rounded-lg ${
            theme === "dark" ? "shadow-for-dark" : "shadow-for-light"
          }`}
        >
          {/* add to wish list */}
          <motion.button
            className="absolute left-2 top-2 z-10 h-9 w-9 rounded-lg bg-card shadow-md flex items-center justify-center hover:scale-105 transition-all duration-200 border cursor-pointer"
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleWishlist}
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            <FontAwesomeIcon
              icon={isWishlisted ? faHeartSolid : faHeartRegular}
              className={`text-lg transition-colors duration-200 ${
                isWishlisted
                  ? "text-destructive"
                  : "text-gray-400 hover:text-red-500"
              }`}
            />
          </motion.button>

          {/* product tag */}
          {item.tags && item.tags.length > 0 && (
            <div
              className="absolute -right-2 -top-2 text-[10px] px-2 py-1 rounded-bl-lg rounded-tr-lg font-medium tracking-wide"
              style={tag?.style}
            >
              <p>{tag?.label}</p>
            </div>
          )}

          <Link
            href={`/products/${encodeURIComponent(item.name)}`}
            className="flex flex-col justify-center items-center"
            aria-label={`View details for ${item.name}`}
          >
            <ProductImage
              imgSource={item.imgSource}
              alt={item.name}
              fetchImageWithTimeout={fetchImageWithTimeout}
            />
            <ProductDetails
              name={item.name}
              currency={currency}
              displayPrice={displayPrice}
              rating={item.rating ?? 0}
            />
          </Link>
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
              showRemoveConfirmation={true}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
