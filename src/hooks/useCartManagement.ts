"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartRequest,
  removeFromCartRequest,
  selectCartItem,
  selectCurrency,
  updateQuantityRequest,
} from "@/redux/slices/cartSlice";
import { showToast } from "@/config/ToastConfig";
import { Product } from "@/types/product";

import { timeout } from "@/utils/timeout";

export const useCartManagement = (item: Product) => {
  const dispatch = useDispatch();
  const currency = useSelector(selectCurrency);
  const cartItem = useSelector(selectCartItem(item.id));
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const isInCart = !!cartItem;
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = async () => {
    setIsAdding(true);

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
    console.log("Removing item from cart:", item);
    setIsRemoving(true);

    // Dispatch optimistic update with item metadata for potential rollback
    dispatch(removeFromCartRequest(item.id, { removedItem: cartItem }));
    setIsRemoving(false);
    showToast({
      type: "success",
      title: "Item Removed",
      description: `${item.name} removed from cart`,
    });
  };

  const handleIncrementQuantity = async () => {
    setIsUpdating(true);

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
