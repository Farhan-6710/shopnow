"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "@/providers/authContext";

/**
 * Hook to handle all initial data syncing.
 * - Syncs local cart/wishlist to backend on login
 * - Then fetches merged data from backend
 */
export const useSyncUserData = () => {
  const dispatch = useDispatch();
  const { user, loading } = useAuth();
  const hasSynced = useRef(false);

  // Sync User Data on Authentication
  useEffect(() => {
    // Only sync when user is authenticated and not loading
    if (user && !loading && !hasSynced.current) {
      hasSynced.current = true;

      // Sync local cart and wishlist to backend
      // These sagas will:
      // 1. Check if user is authenticated
      // 2. Get local items from Redux state
      // 3. Send bulk items to backend
      // 4. Fetch merged data from backend
      dispatch({ type: "cart/syncToBackend" });
      dispatch({ type: "wishlist/syncToBackend" });
    }

    // Reset sync flag when user logs out
    if (!user && !loading) {
      hasSynced.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, loading, dispatch]);
};

export default useSyncUserData;
