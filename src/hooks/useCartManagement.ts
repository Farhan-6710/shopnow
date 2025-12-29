"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from "@/redux/cart/cartSlice";
import { showToast } from "@/config/ToastConfig";
import { Product } from "@/types/product";

export const useCartManagement = (item: Product) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const currency = useSelector((state: RootState) => state.cart.currency);
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const cartItem = cartItems[item.id];
  const isInCart = !!cartItem;
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      dispatch(addToCart(item));
      showToast({
        type: "success",
        title: "Added to Cart",
        description: `${item.name} has been added to your cart`,
      });
      setIsAdding(false);
    }, 500);
  };

  const handleRemoveFromCart = () => {
    setIsRemoving(true);
    setTimeout(() => {
      dispatch(removeFromCart(item.id));
      showToast({
        type: "success",
        title: "Item Removed",
        description: `${item.name} removed from cart`,
      });
      setIsRemoving(false);
    }, 500);
  };

  const handleIncrementQuantity = () => {
    setIsUpdating(true);
    setTimeout(() => {
      dispatch(updateQuantity({ id: item.id, quantity: quantity + 1 }));
      showToast({
        type: "success",
        title: "Quantity Updated",
        description: `${item.name} quantity increased to ${quantity + 1}`,
      });
      setIsUpdating(false);
    }, 500);
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setIsUpdating(true);
      setTimeout(() => {
        dispatch(updateQuantity({ id: item.id, quantity: quantity - 1 }));
        showToast({
          type: "success",
          title: "Quantity Updated",
          description: `${item.name} quantity decreased to ${quantity - 1}`,
        });
        setIsUpdating(false);
      }, 500);
    }
  };

  return {
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
  };
};
