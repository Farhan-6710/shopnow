import React from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import type { CartItem as CartItemType } from "@/types/cartItems"; // Type-only import

interface CartItemProps {
  item: CartItemType;
  handleQuantityChange: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  currency: "USD" | "INR";
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  handleQuantityChange,
  removeFromCart,
  currency,
}) => {
  const handleQuantityUpdate = (quantity: number) => {
    if (quantity > 0) {
      handleQuantityChange(item.id, quantity);
    }
  };

  return (
    <div
      className={`flex flex-col xs:flex-row items-center justify-between px-4 py-4 ${
        item.quantity === 1
          ? "border border-gray-300 dark:border-gray-600"
          : "border-t border-l border-r border-gray-300 dark:border-gray-600"
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
        <div className="flex items-center custom-quantity-container">
          <button
            type="button"
            onClick={() => handleQuantityUpdate(Math.max(1, item.quantity - 1))}
            className={`custom-quantity-btn dark:text-gray-300 dark:bg-gray-700 ${
              item.quantity <= 1 ? "pointer-events-none opacity-50" : ""
            }`}
            aria-label="Decrease quantity"
            disabled={item.quantity <= 1}
          >
            -
          </button>

          <input
            type="number"
            id={`quantity-${item.id}`}
            value={item.quantity}
            onChange={(e) =>
              handleQuantityUpdate(parseInt(e.target.value, 10) || 1)
            }
            className="custom-quantity-input pointer-events-none dark:bg-gray-800 dark:text-gray-300"
            min="1"
            readOnly
          />

          <button
            type="button"
            onClick={() => handleQuantityUpdate(item.quantity + 1)}
            className="custom-quantity-btn dark:text-gray-300 dark:bg-gray-700"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 mt-5 xs:mt-0"
          aria-label={`Remove ${item.productName} from cart`}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
