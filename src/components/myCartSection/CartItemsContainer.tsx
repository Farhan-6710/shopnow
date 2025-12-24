import React from "react";
import CartItemList from "./CartItemList";
import { CartItem } from "@/types/cartItems";

interface CartItemsContainerProps {
  cartItems: CartItem[];
  isEmptyCart: boolean;
  currency: "USD" | "INR";
}

const CartItemsContainer: React.FC<CartItemsContainerProps> = ({
  cartItems,
  isEmptyCart,
  currency,
}) => {
  return (
    <section
      className={`w-full bg-card h-fit ${
        isEmptyCart ? "md:w-full pb-10 py-6" : "md:w-8/12 rounded-lg"
      } ${cartItems.length === 0 ? "border" : ""}`}
      aria-label="Shopping cart items"
    >
      {cartItems.length > 0 ? (
        <CartItemList cartItems={cartItems} currency={currency} />
      ) : (
        <div
          className="pt-4 text-2xl xs:text-3xl md:text-5xl font-bold flex items-center justify-center h-full text-foreground"
          role="status"
          aria-live="polite"
        >
          Your cart is empty
        </div>
      )}
    </section>
  );
};

export default CartItemsContainer;
