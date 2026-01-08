"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { ShoppingCart, Trash2, X } from "lucide-react";
import { Product } from "@/types/product";
import { removeFromWishlistRequest } from "@/redux/wishlist/wishlistSlice";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import Rating from "@/components/home/products-grid/Rating";
import ProductActions from "../shared/ProductActions";
import { useCartManagement } from "@/hooks/useCartManagement";

import { showToast } from "@/config/ToastConfig";

interface WishlistItemProps {
  item: Product;
  priority?: boolean;
}

const WishlistItem: React.FC<WishlistItemProps> = ({
  item,
  priority = false,
}) => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [imageError, setImageError] = useState(false);

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

  const handleRemove = () => {
    // Dispatch optimistic update with item metadata for potential rollback
    dispatch(removeFromWishlistRequest(item.id, { removedItem: item }));
    setShowDeleteModal(false);
    showToast({
      type: "success",
      title: "Removed from Wishlist",
      description: `${item.name} has been removed from your wishlist`,
    });
  };

  const displayPrice =
    currency === "USD"
      ? `$${item.prices.USD.toFixed(2)}`
      : `₹${item.prices.INR.toFixed(2)}`;

  return (
    <>
      <article className="group relative bg-card border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md">
        {/* Remove Button */}
        <button
          onClick={() => setShowDeleteModal(true)}
          className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-background/80 backdrop-blur-sm border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
          aria-label={`Remove ${item.name} from wishlist`}
        >
          <X className="size-4" />
        </button>

        {/* Product Image */}
        <Link
          href={`/products/${encodeURIComponent(item.name)}`}
          className="flex items-center justify-center py-4 bg-background border-b"
          aria-label={`View details for ${item.name}`}
        >
          <div className="relative w-2/3 aspect-square">
            {!imageError ? (
              <Image
                src={item.imgSource}
                alt={item.name}
                fill
                className="object-contain transition-transform duration-200 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                onError={() => setImageError(true)}
                priority={priority}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <ShoppingCart className="size-12" />
              </div>
            )}
          </div>
        </Link>

        {/* Product Details */}
        <div className="p-4">
          <Link
            href={`/products/${encodeURIComponent(item.name)}`}
            aria-label={`View details for ${item.name}`}
          >
            <h2 className="font-medium text-foreground line-clamp-1 hover:text-primary transition-colors">
              {item.name}
            </h2>
          </Link>
          {item.brand && (
            <p className="text-xs text-muted-foreground mt-0.5">{item.brand}</p>
          )}

          <div className="flex items-center justify-between mt-2">
            <span className="font-semibold text-foreground">
              {displayPrice}
            </span>
            {item.rating && <Rating rating={item.rating} totalStars={5} />}
          </div>

          {/* Actions */}
          <div className="mt-4 w-fit ml-auto">
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
            />
          </div>
        </div>
      </article>
      <ConfirmationModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        title="Remove from Wishlist"
        description={`Are you sure you want to remove "${item.name}" from your wishlist?`}
        icon={Trash2}
        confirmLabel="Remove"
        cancelLabel="Cancel"
        onConfirm={handleRemove}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
};

export default WishlistItem;
