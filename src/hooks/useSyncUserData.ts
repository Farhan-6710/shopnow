"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "@/providers/authContext";
import { fetchCartRequest } from "@/redux/cart/cartSlice";
import { fetchWishlistRequest } from "@/redux/wishlist/wishlistSlice";

/**
 * Hook to handle all initial data fetching.
 * - Fetches products on app mount (once).
 * - Syncs cart and wishlist data when user logs in.
 */
export const useSyncUserData = () => {
  const dispatch = useDispatch();
  const { user, loading } = useAuth();
  // 1. Fetch Products (Public Data) - Managed by TanStack Query now.

  // 2. Sync User Data (Private Data) - Run on Auth
  useEffect(() => {
    // Only sync when user is authenticated and not loading
    if (user && !loading) {
      dispatch(fetchCartRequest());
      dispatch(fetchWishlistRequest());
    }
  }, [user?.id, loading, dispatch]);
};

export default useSyncUserData;
