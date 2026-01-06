// src/redux/wishlist/wishlistSaga.ts
import { call, put, select, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";
import { showToast } from "@/config/ToastConfig";
import { createClient } from "@/utils/supabase/client";
import {
  fetchWishlistRequest,
  fetchWishlistSuccess,
  fetchWishlistFailure,
  addToWishlistRequest,
  addToWishlistSuccess,
  addToWishlistFailure,
  removeFromWishlistRequest,
  removeFromWishlistSuccess,
  removeFromWishlistFailure,
  toggleWishlistRequest,
  toggleWishlistSuccess,
  toggleWishlistFailure,
  selectIsInWishlist,
  selectWishlistItems,
  wishlistSyncRequest,
  wishlistSyncSuccess,
  wishlistSyncFailure,
  clearWishlistRequest,
  clearWishlistSuccess,
  clearWishlistFailure,
} from "./wishlistSlice";

// Helper to check authentication
const isUserAuthenticated = async (): Promise<boolean> => {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return !!session;
};

// API functions
const wishlistApi = {
  fetchWishlist: async (): Promise<Product[]> => {
    const response = await fetch("/api/wishlist");
    const data = await response.json();
    if (!data.success)
      throw new Error(data.error || "Failed to fetch wishlist");
    return data.data;
  },
  addItem: async (productId: number): Promise<void> => {
    const response = await fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    const data = await response.json();
    if (!data.success && response.status !== 409) {
      throw new Error(data.error || "Failed to add to wishlist");
    }
  },
  addBulkItems: async (productIds: number[]): Promise<void> => {
    const response = await fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productIds.map((id) => ({ productId: id }))),
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || "Failed to sync wishlist");
    }
  },
  removeItem: async (productId: number): Promise<void> => {
    const response = await fetch("/api/wishlist", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    const data = await response.json();
    if (!data.success)
      throw new Error(data.error || "Failed to remove from wishlist");
  },
  clearAll: async (): Promise<void> => {
    const response = await fetch("/api/wishlist", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (!data.success)
      throw new Error(data.error || "Failed to clear wishlist");
  },
};

// Worker Sagas
function* fetchWishlistSaga() {
  try {
    const wishlistItems: Product[] = yield call(wishlistApi.fetchWishlist);
    yield put(fetchWishlistSuccess(wishlistItems));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch wishlist";
    yield put(fetchWishlistFailure(message));
    showToast({
      type: "error",
      title: "Failed to Load Wishlist",
      description:
        "Unable to load your wishlist. Please check your network connection and try again.",
    });
  }
}

function* addToWishlistSaga(action: PayloadAction<Product>) {
  const product = action.payload;

  // Check if user is authenticated
  const isAuthenticated: boolean = yield call(isUserAuthenticated);

  // If not authenticated, allow local wishlist operation (no API call)
  if (!isAuthenticated) {
    yield put(addToWishlistSuccess({ productId: product.id }));
    return; // Skip API call, keep optimistic update
  }

  // User is authenticated - sync with backend
  try {
    yield call(wishlistApi.addItem, product.id);
    yield put(addToWishlistSuccess({ productId: product.id }));
  } catch (error) {
    // Rollback: remove the optimistically added item
    yield put(addToWishlistFailure(product));

    showToast({
      type: "error",
      title: "Add to Wishlist Failed",
      description:
        "Unable to add item to wishlist. Please check your network connection and retry.",
    });
  }
}

function* removeFromWishlistSaga(
  action: PayloadAction<number, string, { removedItem?: Product }>
) {
  const productId = action.payload;
  const removedItem = action.meta?.removedItem;

  // Check if user is authenticated
  const isAuthenticated: boolean = yield call(isUserAuthenticated);

  // If not authenticated, allow local wishlist operation (no API call)
  if (!isAuthenticated) {
    yield put(removeFromWishlistSuccess({ productId }));
    return; // Skip API call, keep optimistic update
  }

  // User is authenticated - sync with backend
  try {
    yield call(wishlistApi.removeItem, productId);
    yield put(removeFromWishlistSuccess({ productId }));
  } catch (error) {
    // Rollback: restore the removed item if we have it
    if (removedItem) {
      yield put(removeFromWishlistFailure(removedItem));
    }

    showToast({
      type: "error",
      title: "Remove Item Failed",
      description:
        "Unable to remove item from wishlist. Please check your network connection and retry.",
    });
  }
}

function* toggleWishlistSaga(action: PayloadAction<Product>) {
  const product = action.payload;

  // Check if item WAS in wishlist BEFORE the optimistic toggle
  const isCurrentlyInWishlist: boolean = yield select(
    selectIsInWishlist(product.id)
  );
  const wasInWishlist = !isCurrentlyInWishlist; // Because reducer already toggled

  // Check if user is authenticated
  const isAuthenticated: boolean = yield call(isUserAuthenticated);

  // If not authenticated, allow local wishlist operation (no API call)
  if (!isAuthenticated) {
    const actionType = wasInWishlist ? "removed" : "added";
    yield put(
      toggleWishlistSuccess({ productId: product.id, action: actionType })
    );
    return; // Skip API call, keep optimistic update
  }

  // User is authenticated - sync with backend
  try {
    if (wasInWishlist) {
      // Was in wishlist, now removed, so we call remove API
      yield call(wishlistApi.removeItem, product.id);
      yield put(
        toggleWishlistSuccess({ productId: product.id, action: "removed" })
      );
    } else {
      // Was not in wishlist, now added, so we call add API
      yield call(wishlistApi.addItem, product.id);
      yield put(
        toggleWishlistSuccess({ productId: product.id, action: "added" })
      );
    }
  } catch (error) {
    // Rollback: toggle back to original state
    yield put(toggleWishlistFailure({ product, wasInWishlist }));

    showToast({
      type: "error",
      title: "Update Wishlist Failed",
      description:
        "Unable to update your wishlist. Please check your network connection and retry.",
    });
  }
}

// Sync local wishlist to backend on login
function* syncWishlistToBackendSaga() {
  try {
    // Check if user is authenticated
    const isAuthenticated: boolean = yield call(isUserAuthenticated);

    if (!isAuthenticated) {
      console.log("User not authenticated, skipping wishlist sync");
      yield put(wishlistSyncSuccess());
      return;
    }

    // Get all local wishlist items
    const localWishlistItems: Product[] = yield select(selectWishlistItems);

    if (localWishlistItems.length === 0) {
      // Still fetch backend wishlist in case user has items there
      yield call(fetchWishlistSaga);
      yield put(wishlistSyncSuccess());
      return;
    }

    // Prepare product IDs for bulk sync
    const productIds = localWishlistItems.map((item) => item.id);

    // Send local wishlist to backend
    yield call(wishlistApi.addBulkItems, productIds);
    // Fetch merged wishlist from backend and wait for completion
    yield call(fetchWishlistSaga);

    // Mark sync as completed only after fetch completes
    yield put(wishlistSyncSuccess());
  } catch (error) {
    console.error("Wishlist sync error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to sync wishlist";
    yield put(wishlistSyncFailure(message));

    // Still try to fetch backend wishlist
    yield call(fetchWishlistSaga);

    showToast({
      type: "error",
      title: "Wishlist Sync Failed",
      description:
        "Unable to sync your wishlist. Please check your network connection and try again.",
    });
  }
}

// Clear all wishlist items
function* clearWishlistSaga() {
  try {
    // Check if user is authenticated
    const isAuthenticated: boolean = yield call(isUserAuthenticated);

    // If authenticated, call API to clear backend
    if (isAuthenticated) {
      yield call(wishlistApi.clearAll);
    }

    // Clear local state
    yield put(clearWishlistSuccess());

    showToast({
      type: "success",
      title: "Wishlist Cleared",
      description: "All items have been removed from your wishlist",
    });
  } catch (error) {
    console.error("Clear wishlist error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to clear wishlist";
    yield put(clearWishlistFailure(message));

    showToast({
      type: "error",
      title: "Clear Wishlist Failed",
      description:
        "Unable to clear your wishlist. Please check your network connection and retry.",
    });
  }
}

// Watcher Saga
export function* watchWishlist() {
  yield takeEvery(fetchWishlistRequest.type, fetchWishlistSaga);
  yield takeEvery(addToWishlistRequest.type, addToWishlistSaga);
  yield takeEvery(removeFromWishlistRequest.type, removeFromWishlistSaga);
  yield takeEvery(toggleWishlistRequest.type, toggleWishlistSaga);
  yield takeEvery(wishlistSyncRequest.type, syncWishlistToBackendSaga);
  yield takeEvery(clearWishlistRequest.type, clearWishlistSaga);
}

export default watchWishlist;
