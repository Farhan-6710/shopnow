import React, { useState } from "react";
import NotificationPopup from "../extras/NotificationPopup";
import CartItemList from "./CartItemList";
import { CartItem } from "@/types/cartItems";

interface CartItemsContainerProps {
  cartItems: CartItem[];
  handleQuantityChange: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  isEmptyCart: boolean;
  currency: "USD" | "INR";
}

const CartItemsContainer: React.FC<CartItemsContainerProps> = ({
  cartItems,
  handleQuantityChange,
  removeFromCart,
  isEmptyCart,
  currency,
}) => {
  const [notification, setNotification] = useState<{
    message: string;
    visible: boolean;
  }>({ message: "", visible: false });

  const showNotification = (productName: string, quantity: number) => {
    setNotification({
      message: `The quantity of '${productName}' changed to ${quantity}`,
      visible: true,
    });
  };

  const handleQuantityUpdate = (id: number, quantity: number) => {
    const product = cartItems.find((item) => item.id === id);
    if (product) {
      if (quantity > 0) {
        handleQuantityChange(id, quantity);
        showNotification(product.productName, quantity);
      }
    }
  };

  return (
    <div
      className={`w-full bg-white dark:bg-gray-800 h-fit ${
        isEmptyCart ? "md:w-full pb-10 py-6" : "md:w-8/12 rounded-lg"
      } ${
        cartItems.length === 0
          ? "border border-gray-300 dark:border-gray-600"
          : ""
      }`}
    >
      {notification.visible && (
        <NotificationPopup
          message={notification.message}
          onClose={() =>
            setNotification((prev) => ({ ...prev, visible: false }))
          }
        />
      )}
      {cartItems.length > 0 ? (
        <CartItemList
          cartItems={cartItems}
          handleQuantityChange={handleQuantityUpdate}
          removeFromCart={removeFromCart}
          currency={currency}
        />
      ) : (
        <div className="pt-4 text-2xl xs:text-3xl md:text-5xl font-bold flex items-center justify-center h-full text-primary dark:text-primaryLight">
          Your cart is empty
        </div>
      )}
    </div>
  );
};

export default CartItemsContainer;
