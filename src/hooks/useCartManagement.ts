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
import { ShoppingCart, Trash2 } from "lucide-react";
import { Product } from "@/types/product";

export const useCartManagement = (item: Product) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const currency = useSelector((state: RootState) => state.cart.currency);
  const [loading, setLoading] = useState(false);

  const cartItem = cartItems.find((ci) => ci.id === item.id);
  const isInCart = !!cartItem;
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(addToCart(item));
      showToast({
        type: "custom",
        title: "Added to Cart",
        description: `${item.name} has been added to your cart`,
        icon: ShoppingCart,
      });
      setLoading(false);
    }, 300);
  };

  const handleRemoveFromCart = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(removeFromCart(item.id));
      showToast({
        type: "custom",
        title: "Item Removed",
        description: `${item.name} removed from cart`,
        icon: Trash2,
      });
      setLoading(false);
    }, 300);
  };

  const handleIncrementQuantity = () => {
    dispatch(updateQuantity({ id: item.id, quantity: quantity + 1 }));
    showToast({
      type: "custom",
      title: "Quantity Updated",
      description: `${item.name} quantity increased to ${quantity + 1}`,
      icon: ShoppingCart,
    });
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: quantity - 1 }));
      showToast({
        type: "custom",
        title: "Quantity Updated",
        description: `${item.name} quantity decreased to ${
          quantity - 1
        }`,
        icon: ShoppingCart,
      });
    }
  };

  return {
    isInCart,
    quantity,
    currency,
    loading,
    handleAddToCart,
    handleRemoveFromCart,
    handleIncrementQuantity,
    handleDecrementQuantity,
  };
};
