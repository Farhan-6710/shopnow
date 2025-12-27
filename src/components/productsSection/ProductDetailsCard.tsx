"use client"; // Ensures this component is rendered on the client side

import React, { useState } from "react";
import ProductImage from "./ProductImage";
import ProductActions from "./ProductActions";
import Rating from "./Rating";
import { Button } from "../ui/button";
import Link from "next/link";
import { Product } from "@/types/product";
import { useCartManagement } from "@/hooks/useCartManagement";
import ConfirmationModal from "../atoms/ConfirmationModal";
import { Trash2 } from "lucide-react";

interface ProductDetailsCardProps {
  item: Product;
  isHighlighted?: boolean;
  fetchImageWithTimeout: (url: string) => Promise<Blob | null>;
}

const ProductDetailsCard: React.FC<ProductDetailsCardProps> = ({
  item,
  fetchImageWithTimeout,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  // Display price based on selected currency
  const displayPrice = (currency: "USD" | "INR") => {
    const price = item.prices[currency];
    if (typeof price !== "number" || isNaN(price)) {
      return "0.00"; // Fallback value in case of invalid price
    }
    return price.toFixed(2); // Return price formatted to two decimal places
  };

  return (
    <div className="px-4 md:px-2 p-2 w-full flex flex-col md:flex-row h-full">
      <div className="product-card transition-all duration-200 bg-card border w-full">
        <div className="flex flex-col md:flex-row justify-center items-center text-center md:text-left h-full pt-4 pb-8 overflow-hidden transition-all duration-300 dark:border-slate-700 border-gray-200">
          {/* Product Image on the Left */}
          <div className="w-full md:w-1/3 md:mb-4 flex justify-center">
            <ProductImage
              imgSource={item.imgSource}
              alt={item.name}
              fetchImageWithTimeout={fetchImageWithTimeout}
            />
          </div>

          {/* Item Info and Actions on the Right */}
          <div className="w-full md:w-2/3 flex flex-col justify-between items-start p-4 pt-0 md:pt-4 md:pr-10">
            <h2 className="text-lg 2xl:text-lg font-bold dark:text-white text-primaryDarkTwo">
              {item.name}
            </h2>
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
            <div className="flex flex-col sm:flex-row justify-center items-center mt-4 gap-2 w-full">
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
