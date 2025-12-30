// src/redux/wishlist/wishlistSaga.ts
import { call, put, select, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";
import { showToast } from "@/config/ToastConfig";
import {
  fetchWishlistRequest,
  fetchWishlistSuccess,
  fetchWishlistFailure,
  addToWishlistRequest,
  addToWishlistSuccess,
  addToWishlistFailure,
  removeFromWishlistRequest,
  removeFromWishlistSuccess,
  toggleWishlistRequest,
  toggleWishlistSuccess,
  toggleWishlistFailure,
  selectIsInWishlist,
} from "./wishlistSlice";

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
      title: "Wishlist Error",
      description: message,
    });
  }
}

function* addToWishlistSaga(action: PayloadAction<Product>) {
  const product = action.payload;

  try {
    yield call(wishlistApi.addItem, product.id);
    yield put(addToWishlistSuccess({ productId: product.id }));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to add to wishlist";
    yield put(addToWishlistFailure(product));
    showToast({
      type: "error",
      title: "Wishlist Error",
      description: message,
    });
  }
}

function* removeFromWishlistSaga(action: PayloadAction<number>) {
  const productId = action.payload;

  try {
    yield call(wishlistApi.removeItem, productId);
    yield put(removeFromWishlistSuccess({ productId }));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to remove from wishlist";
    // Note: We can't restore the item here without the product data
    // This should be handled by the component passing full product data
    showToast({
      type: "error",
      title: "Wishlist Error",
      description: message,
    });
  }
}

function* toggleWishlistSaga(action: PayloadAction<Product>) {
  const product = action.payload;

  // Check if item WAS in wishlist BEFORE the optimistic toggle
  // Since the reducer already toggled, we need to check the opposite
  const isCurrentlyInWishlist: boolean = yield select(
    selectIsInWishlist(product.id)
  );
  const wasInWishlist = !isCurrentlyInWishlist; // Because we already toggled

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
    const message =
      error instanceof Error ? error.message : "Failed to update wishlist";
    yield put(toggleWishlistFailure({ product, wasInWishlist }));
    showToast({
      type: "error",
      title: "Wishlist Error",
      description: message,
    });
  }
}

// Watcher Saga
export function* watchWishlist() {
  yield takeEvery(fetchWishlistRequest.type, fetchWishlistSaga);
  yield takeEvery(addToWishlistRequest.type, addToWishlistSaga);
  yield takeEvery(removeFromWishlistRequest.type, removeFromWishlistSaga);
  yield takeEvery(toggleWishlistRequest.type, toggleWishlistSaga);
}

export default watchWishlist;
