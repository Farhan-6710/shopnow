"use client"; // Ensures this component is rendered on the client side

import React, { useState, useMemo } from "react";
import ProductImage from "../shared/ProductImage";
import ProductActions from "../shared/ProductActions";
import Rating from "../home/products-grid/Rating";
import { Button } from "../ui/button";
import Link from "next/link";
import { Product } from "@/types/product";
import { useCartManagement } from "@/hooks/useCartManagement";
import ConfirmationModal from "../modals/ConfirmationModal";
import { Trash2 } from "lucide-react";
import WishlistToggle from "../shared/WishlistToggle";
import { getProductTags } from "@/utils/products/products";
import { useTheme } from "next-themes";

interface ProductDetailsCardProps {
  item: Product;
  isHighlighted?: boolean;
  fetchImageWithTimeout: (url: string) => Promise<Blob | null>;
}

const ProductDetailsCard: React.FC<ProductDetailsCardProps> = ({ item }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
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

  console.log(item);

  return (
    <div className="px-4 md:px-2 p-2 w-full flex flex-col md:flex-row h-full">
      <div className="relative product-card transition-all duration-200 bg-card border w-full">
        <WishlistToggle item={item} className="left-3 top-3" />
        <div className="flex flex-col md:flex-row justify-center items-center text-center md:text-left h-full pt-4 pb-8 overflow-hidden transition-all duration-300 dark:border-slate-700 border-gray-200">
          {/* Product Image on the Left */}
          <div className="w-full md:w-1/3 md:mb-4 flex justify-center">
            <ProductImage
              imgSource={item.imgSource}
              alt={item.name}
              priority={true}
            />
          </div>

          {/* Item Info and Actions on the Right */}
          <div className="w-full md:w-2/3 flex flex-col justify-between items-start p-4 pt-0 md:pt-4 md:pr-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-2">
              <h2 className="text-xl 2xl:text-2xl font-bold dark:text-white text-primaryDarkTwo">
                {item.name}
              </h2>
              <div className="flex flex-wrap gap-2">
                {tags?.map((tag, idx) => {
                  return (
                    <div key={idx}>
                      <p
                        className="text-foreground rounded-full py-1 px-2.5 text-xs whitespace-nowrap"
                        style={tag.style}
                      >
                        {tag.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <p className="text-sm text-start text-gray-600 dark:text-gray-300 mt-4">
              {item.description}
            </p>
            <div className="flex flex-col justify-center items-start mt-4">
              <p className="text-3xl font-bold dark:text-gray-300 text-gray-700 mb-2">
                {currency === "INR" ? "₹" : "$"}
                {displayPrice(currency)}
              </p>
              <Rating rating={item.rating ?? 0} totalStars={5} />
            </div>
            <div className="flex flex-row justify-center items-center mt-4 gap-2 w-full">
              <ProductActions
                itemName={item.name}
                quantity={quantity}
                isInCart={isInCart}
                isAdding={isAdding}
                isRemoving={isRemoving}
                isUpdating={isUpdating}
                onAddToCart={handleAddToCart}
                onRemove={() => setIsModalVisible(true)}
                onIncrement={handleIncrementQuantity}
                onDecrement={handleDecrementQuantity}
              />
              <Link href="/" className="ml-auto">
                <Button variant="outline">Back To Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ConfirmationModal
        open={isModalVisible}
        onOpenChange={setIsModalVisible}
        title="Remove Item"
        description={`Are you sure you want to remove "${item.name}" from your cart?`}
        icon={Trash2}
        confirmLabel="Remove"
        cancelLabel="Cancel"
        onConfirm={handleRemoveFromCart}
        onCancel={() => setIsModalVisible(false)}
      />
    </div>
  );
};

export default ProductDetailsCard;
