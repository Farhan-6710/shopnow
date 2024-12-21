import React from "react";
import CartItem from "./CartItem";
import { CartItem as CartItemType } from "@/types/cartItems";

interface CartItemListProps {
  cartItems: CartItemType[];
  handleQuantityChange: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  currency: "USD" | "INR";
}

const CartItemList: React.FC<CartItemListProps> = ({
  cartItems,
  handleQuantityChange,
  removeFromCart,
  currency,
}) => {
  return (
    <>
      {cartItems.map((item, index) => (
        <CartItem
          key={item.id}
          item={item}
          handleQuantityChange={handleQuantityChange}
          removeFromCart={removeFromCart}
          currency={currency}
        />
      ))}
    </>
  );
};

export default CartItemList;
