import React, { useState } from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import type { CartItem as CartItemType } from "@/types/cartItems";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import ConfirmationModal from "@/components/atoms/ConfirmationModal";
import QuantityCounter from "@/components/atoms/QuantityCounter";
import { useCartManagement } from "@/hooks/useCartManagement";
import { Spinner } from "../ui/spinner";

interface CartItemProps {
  item: CartItemType;
  index: number;
  length: number;
  currency: "USD" | "INR";
}

const CartItem = ({ item, index, length, currency }: CartItemProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const {
    loading,
    handleIncrementQuantity,
    handleDecrementQuantity,
    handleRemoveFromCart,
  } = useCartManagement(item);

  return (
    <>
      <Link
        href={`/products/${encodeURIComponent(item.name)}`}
        className={`flex flex-col xs:flex-row items-center justify-between px-4 py-4 ${
          length > 1 && index === 0 ? "border-t border-x" : "border"
        }`}
      >
        <div className="relative flex justify-center items-center w-28 xs:w-24 h-24">
          <Image
            src={item.imgSource}
            alt={item.name}
            width={1000}
            height={800}
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded"
            priority
          />
        </div>
        <div className="flex flex-col justify-center items-center xs:items-start w-full xs:w-8/12 xs:pl-4 mt-4 xs:mt-0">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {item.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {currency === "USD"
              ? `$${(item.prices.USD * item.quantity).toFixed(2)}`
              : `₹${(item.prices.INR * item.quantity).toFixed(2)}`}
          </p>
        </div>
        <div className="flex flex-col xs:flex-row items-center xs:space-x-4 xs:w-auto mt-4 xs:mt-0">
          <QuantityCounter
            quantity={item.quantity}
            itemName={item.name}
            onIncrement={handleIncrementQuantity}
            onDecrement={handleDecrementQuantity}
          />

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowDeleteModal(true);
            }}
            disabled={loading}
            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/20 mt-5 xs:mt-0"
            aria-label={`Remove ${item.name} from cart`}
          >
            {loading ? <Spinner className="size-4" /> : <FaTrash />}
          </Button>
        </div>
      </Link>

      <ConfirmationModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        title="Remove Item"
        description={`Are you sure you want to remove "${item.name}" from your cart?`}
        icon={Trash2}
        confirmLabel="Remove"
        cancelLabel="Cancel"
        onConfirm={handleRemoveFromCart}
      />
    </>
  );
};

export default CartItem;
