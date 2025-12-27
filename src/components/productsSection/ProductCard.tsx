"use client";

import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";
import ProductActions from "./ProductActions";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Product } from "@/types/product";
import { useCartManagement } from "@/hooks/useCartManagement";
import ConfirmationModal from "../atoms/ConfirmationModal";
import { useState } from "react";
import { Trash2 } from "lucide-react";

interface ProductCardProps {
  item: Product;
  fetchImageWithTimeout: (url: string) => Promise<Blob | null>;
}

const ProductCard = ({ item, fetchImageWithTimeout }: ProductCardProps) => {
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

  const displayPrice = (currency: "USD" | "INR") => {
    const price = item.prices[currency];
    if (typeof price !== "number" || isNaN(price)) {
      return "0.00";
    }
    return price.toFixed(2);
  };

  const { theme } = useTheme();

  return (
    <article
      className="px-4 md:px-2 p-2 w-full flex flex-col h-full"
      aria-label={`${item.name} item card`}
    >
      <div className="transition-all duration-200">
        <div
          className={`product-card relative border bg-card text-center h-full pt-0 pb-8 transition-all duration-300 rounded-lg ${
            theme === "dark" ? "shadow-for-dark" : "shadow-for-light"
          }`}
        >
          {/* tags  */}
          {isInCart ? (
            <div className="absolute -right-2 -top-2 bg-emerald-900 text-green-100 text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg">
              <p>Added To Cart</p>
            </div>
          ) : (
            <div className="absolute -right-2 -top-2 bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg">
              <p>{item.brand}</p>
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
              onRemove={() => setIsModalVisible(true)}
              onIncrement={handleIncrementQuantity}
              onDecrement={handleDecrementQuantity}
            />
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
    </article>
  );
};

export default ProductCard;
