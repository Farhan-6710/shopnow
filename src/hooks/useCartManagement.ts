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

export const useCartManagement = (item: Product) => {
  const dispatch = useDispatch();
  const currency = useSelector(selectCurrency);
  const cartItem = useSelector(selectCartItem(item.id));
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const isInCart = !!cartItem;
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    setIsAdding(true);

    // await timeout(400); // Simulate delay for optimistic update
    dispatch(addToCartRequest(item));
    setIsAdding(false);
    showToast({
      type: "success",
      title: "Added to Cart",
      description: `${item.name} has been added to your cart`,
    });
  };

  const handleRemoveFromCart = () => {
    console.log("Removing item from cart:", item);
    setIsRemoving(true);

    // await timeout(400); // Simulate delay for optimistic update
    // Dispatch optimistic update with item metadata for potential rollback
    dispatch(removeFromCartRequest(item.id, { removedItem: cartItem }));
    setIsRemoving(false);
    showToast({
      type: "success",
      title: "Item Removed",
      description: `${item.name} removed from cart`,
    });
  };

  const handleIncrementQuantity = () => {
    setIsUpdating(true);

    // Reducer calculates quantity from current state (no stale closure)
    dispatch(updateQuantityRequest({ id: item.id, updateMode: "increment" }));
    setIsUpdating(false);
    showToast({
      type: "success",
      title: "Quantity Updated",
      description: `${item.name} quantity increased`,
    });
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setIsUpdating(true);

      // Reducer calculates quantity from current state (no stale closure)
      dispatch(updateQuantityRequest({ id: item.id, updateMode: "decrement" }));
      setIsUpdating(false);
      showToast({
        type: "success",
        title: "Quantity Updated",
        description: `${item.name} quantity decreased`,
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
