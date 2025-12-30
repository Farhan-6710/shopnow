"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  addToCartRequest,
  removeFromCartRequest,
  updateQuantityRequest,
} from "@/redux/cart/cartSlice";
import { showToast } from "@/config/ToastConfig";
import { Product } from "@/types/product";

import { timeout } from "@/utils/timeout";

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

  const handleAddToCart = async () => {
    setIsAdding(true);
    await timeout(400);

    // Dispatch optimistic update after 400ms - saga handles API call
    dispatch(addToCartRequest(item));
    setIsAdding(false);
    showToast({
      type: "success",
      title: "Added to Cart",
      description: `${item.name} has been added to your cart`,
    });
  };

  const handleRemoveFromCart = async () => {
    setIsRemoving(true);
    await timeout(400);

    // Dispatch optimistic update after 400ms - saga handles API call
    dispatch(removeFromCartRequest(item.id));
    setIsRemoving(false);
    showToast({
      type: "success",
      title: "Item Removed",
      description: `${item.name} removed from cart`,
    });
  };

  const handleIncrementQuantity = async () => {
    setIsUpdating(true);
    await timeout(400);

    // Dispatch optimistic update after 400ms - saga handles API call
    dispatch(updateQuantityRequest({ id: item.id, quantity: quantity + 1 }));
    setIsUpdating(false);
    showToast({
      type: "success",
      title: "Quantity Updated",
      description: `${item.name} quantity increased to ${quantity + 1}`,
    });
  };

  const handleDecrementQuantity = async () => {
    if (quantity > 1) {
      setIsUpdating(true);
      await timeout(400);

      // Dispatch optimistic update after 400ms - saga handles API call
      dispatch(updateQuantityRequest({ id: item.id, quantity: quantity - 1 }));
      setIsUpdating(false);
      showToast({
        type: "success",
        title: "Quantity Updated",
        description: `${item.name} quantity decreased to ${quantity - 1}`,
      });
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
