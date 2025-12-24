import React from "react";
import CartItem from "./CartItem";
import { CartItem as CartItemType } from "@/types/cartItems";

interface CartItemListProps {
  cartItems: CartItemType[];
  currency: "USD" | "INR";
}

const CartItemList: React.FC<CartItemListProps> = ({ cartItems, currency }) => {
  return (
    <>
      {cartItems.map((item, index) => (
        <CartItem
          key={item.id}
          index={index}
          length={cartItems.length}
          item={item}
          currency={currency}
        />
      ))}
    </>
  );
};

export default CartItemList;
