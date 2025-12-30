// src/hooks/useSyncUserData.ts
"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "@/providers/authContext";
import { fetchCartRequest } from "@/redux/cart/cartSlice";
import { fetchWishlistRequest } from "@/redux/wishlist/wishlistSlice";

/**
 * Hook to sync cart and wishlist data when user logs in.
 * Fetches data from the backend when user is authenticated.
 */
export const useSyncUserData = () => {
  const dispatch = useDispatch();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Only sync when user is authenticated and not loading
    if (user && !loading) {
      // Fetch cart and wishlist from backend
      dispatch(fetchCartRequest());
      dispatch(fetchWishlistRequest());
    }
  }, [user, loading, dispatch]);
};

export default useSyncUserData;
