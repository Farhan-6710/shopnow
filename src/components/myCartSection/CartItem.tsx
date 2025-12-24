import React, { useState } from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import type { CartItem as CartItemType } from "@/types/cartItems";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { showToast } from "@/config/ToastConfig";
import { ShoppingCart, Trash2 } from "lucide-react";
import ConfirmationModal from "@/components/atoms/ConfirmationModal";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "@/redux/cart/cartSlice";

interface CartItemProps {
  item: CartItemType;
  index: number;
  length: number;
  currency: "USD" | "INR";
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  index,
  length,
  currency,
}) => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;

    const quantityDiff = newQuantity - item.quantity;
    if (quantityDiff !== 0) {
      dispatch(addToCart({ ...item, quantity: quantityDiff }));
      showToast({
        type: "custom",
        title: "Quantity Updated",
        description: `${item.productName} quantity changed to ${newQuantity}`,
        icon: ShoppingCart,
      });
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
    showToast({
      type: "custom",
      title: "Item Removed",
      description: `${item.productName} removed from cart`,
      icon: Trash2,
    });
  };

  return (
    <>
      <Link
        href={`/products/${encodeURIComponent(item.productName)}`}
        className={`flex flex-col xs:flex-row items-center justify-between px-4 py-4 ${
          length > 1 && index === 0 ? "border-t border-x" : "border"
        }`}
      >
        <div className="relative flex justify-center items-center w-28 xs:w-24 h-24">
          <Image
            src={item.imgSource}
            alt={item.productName}
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
            {item.productName}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {currency === "USD"
              ? `$${(item.prices.USD * item.quantity).toFixed(2)}`
              : `₹${(item.prices.INR * item.quantity).toFixed(2)}`}
          </p>
        </div>
        <div className="flex flex-col xs:flex-row items-center xs:space-x-4 xs:w-auto mt-4 xs:mt-0">
          <div
            className="inline-flex rounded-md shadow-sm"
            role="group"
            aria-label={`Quantity controls for ${item.productName}`}
          >
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleQuantityChange(Math.max(1, item.quantity - 1));
              }}
              disabled={item.quantity <= 1}
              className="rounded-r-none border-r-0"
              aria-label={`Decrease quantity of ${item.productName}`}
            >
              -
            </Button>

            <div
              className="inline-flex items-center justify-center border-y bg-background px-4 min-w-12 text-sm font-semibold cursor-auto"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <span
                aria-live="polite"
                aria-label={`Quantity: ${item.quantity}`}
              >
                {item.quantity}
              </span>
            </div>

            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleQuantityChange(item.quantity + 1);
              }}
              className="rounded-l-none border-l-0"
              aria-label={`Increase quantity of ${item.productName}`}
            >
              +
            </Button>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowDeleteModal(true);
            }}
            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/20 mt-5 xs:mt-0"
            aria-label={`Remove ${item.productName} from cart`}
          >
            <FaTrash />
          </Button>
        </div>
      </Link>

      <ConfirmationModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        title="Remove Item"
        description={`Are you sure you want to remove "${item.productName}" from your cart?`}
        icon={Trash2}
        confirmLabel="Remove"
        cancelLabel="Cancel"
        onConfirm={handleRemove}
      />
    </>
  );
};

export default CartItem;
