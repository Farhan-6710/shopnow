// src/redux/wishlist/wishlistSaga.ts
import { call, put, select, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";
import { RemovedItemsMap } from "@/types/api";
import { wishlistApi } from "@/services/wishlistApi";
import { isAuthenticated } from "@/utils/auth";
import {
  getItemsToRemove,
  showErrorToast,
  showSuccessToast,
} from "@/utils/redux/sagaHelpers";
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
  wishlistSyncRequest,
  wishlistSyncSuccess,
  wishlistSyncFailure,
  clearWishlistRequest,
  clearWishlistSuccess,
  clearWishlistFailure,
  selectIsInWishlist,
  selectWishlistItems,
  selectRemovedWishlistItems,
  trackRemovedWishlistItem,
} from "@/redux/slices/wishlistSlice";

// ========== Fetch Wishlist ==========
function* fetchWishlistSaga() {
  try {
    const items: Product[] = yield call(wishlistApi.fetch);
    yield put(fetchWishlistSuccess(items));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch wishlist";
    yield put(fetchWishlistFailure(message));
    showErrorToast(
      "Failed to Load Wishlist",
      "Unable to load your wishlist. Please check your connection."
    );
  }
}

// ========== Add to Wishlist ==========
function* addToWishlistSaga(action: PayloadAction<Product>) {
  const product = action.payload;

  const isAuth: boolean = yield call(isAuthenticated);

  if (!isAuth) {
    yield put(addToWishlistSuccess({ productId: product.id }));
    return;
  }

  try {
    yield call(wishlistApi.addItem, product.id);
    yield put(addToWishlistSuccess({ productId: product.id }));
  } catch {
    yield put(addToWishlistFailure(product));
    showErrorToast(
      "Failed to Add to Wishlist",
      "Please check your network connection and retry."
    );
  }
}

// ========== Remove from Wishlist ==========
function* removeFromWishlistSaga(
  action: PayloadAction<number, string, { removedItem?: Product }>
) {
  const productId = action.payload;
  const removedItem = action.meta?.removedItem;

  const isAuth: boolean = yield call(isAuthenticated);

  if (!isAuth) {
    yield put(removeFromWishlistSuccess({ productId }));
    yield put(trackRemovedWishlistItem(productId));
    return;
  }

  try {
    yield call(wishlistApi.removeItem, productId);
    yield put(removeFromWishlistSuccess({ productId }));
  } catch {
    if (removedItem) {
      yield put(removeFromWishlistFailure(removedItem));
    }
    showErrorToast(
      "Failed to Remove Item",
      "Please check your network connection and retry."
    );
  }
}

// ========== Toggle Wishlist ==========
function* toggleWishlistSaga(action: PayloadAction<Product>) {
  const product = action.payload;

  // Check if item WAS in wishlist BEFORE the optimistic toggle
  const isCurrentlyInWishlist: boolean = yield select(
    selectIsInWishlist(product.id)
  );
  const wasInWishlist = !isCurrentlyInWishlist;

  const isAuth: boolean = yield call(isAuthenticated);

  if (!isAuth) {
    if (wasInWishlist) {
      yield put(trackRemovedWishlistItem(product.id));
    }
    yield put(
      toggleWishlistSuccess({
        productId: product.id,
        action: wasInWishlist ? "removed" : "added",
      })
    );
    return;
  }

  try {
    if (wasInWishlist) {
      yield call(wishlistApi.removeItem, product.id);
      yield put(
        toggleWishlistSuccess({ productId: product.id, action: "removed" })
      );
    } else {
      yield call(wishlistApi.addItem, product.id);
      yield put(
        toggleWishlistSuccess({ productId: product.id, action: "added" })
      );
    }
  } catch {
    yield put(toggleWishlistFailure({ product, wasInWishlist }));
    showErrorToast(
      "Failed to Update Wishlist",
      "Please check your network connection and retry."
    );
  }
}

// ========== Sync Wishlist to Backend ==========
function* syncWishlistSaga() {
  try {
    const isAuth: boolean = yield call(isAuthenticated);

    if (!isAuth) {
      yield put(wishlistSyncSuccess());
      return;
    }

    const localItems: Product[] = yield select(selectWishlistItems);
    const removedItems: RemovedItemsMap = yield select(
      selectRemovedWishlistItems
    );

    // Get items to remove (removed offline but not re-added)
    const currentIds = new Set(localItems.map((item) => item.id));
    const itemsToRemove = getItemsToRemove(removedItems, currentIds);

    // Remove items first
    if (itemsToRemove.length > 0) {
      yield call(wishlistApi.removeBulkItems, itemsToRemove);
    }

    // Add items
    if (localItems.length > 0) {
      const productIds = localItems.map((item) => item.id);
      yield call(wishlistApi.addBulkItems, productIds);
    }

    // Fetch merged wishlist from backend
    yield call(fetchWishlistSaga);
    yield put(wishlistSyncSuccess());
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to sync wishlist";
    yield put(wishlistSyncFailure(message));
    yield call(fetchWishlistSaga);
    showErrorToast(
      "Failed to Sync Wishlist",
      "Please check your network connection and retry."
    );
  }
}

// ========== Clear Wishlist ==========
function* clearWishlistSaga(
  action: PayloadAction<
    void,
    string,
    { previousItems: Record<number, Product> }
  >
) {
  // Get previousItems from action meta (passed before optimistic update)
  const previousItems = action.meta.previousItems;

  try {
    const isAuth: boolean = yield call(isAuthenticated);

    if (isAuth) {
      yield call(wishlistApi.clearAll);
    }

    yield put(clearWishlistSuccess());
    showSuccessToast(
      "Wishlist Cleared",
      "All items have been removed from your wishlist."
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to clear wishlist";
    yield put(clearWishlistFailure({ error: message, previousItems }));
    showErrorToast(
      "Failed to Clear Wishlist",
      "Please check your network connection and retry."
    );
  }
}

// ========== Watcher ==========
export function* watchWishlist() {
  yield takeEvery(fetchWishlistRequest.type, fetchWishlistSaga);
  yield takeEvery(addToWishlistRequest.type, addToWishlistSaga);
  yield takeEvery(removeFromWishlistRequest.type, removeFromWishlistSaga);
  yield takeEvery(toggleWishlistRequest.type, toggleWishlistSaga);
  yield takeEvery(wishlistSyncRequest.type, syncWishlistSaga);
  yield takeEvery(clearWishlistRequest.type, clearWishlistSaga);
}

export default watchWishlist;
