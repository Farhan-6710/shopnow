// src/redux/cart/cartSaga.ts
import { call, put, select, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";
import { CartItem } from "@/types/cartItems";
import { showToast } from "@/config/ToastConfig";
import { createClient } from "@/utils/supabase/client";
import {
  addToCartRequest,
  addToCartSuccess,
  addToCartFailure,
  removeFromCartRequest,
  removeFromCartSuccess,
  removeFromCartFailure,
  updateQuantityRequest,
  updateQuantitySuccess,
  updateQuantityFailure,
  fetchCartRequest,
  fetchCartSuccess,
  fetchCartFailure,
  selectCartItem,
  selectCartItems,
  syncCartRequest,
  syncCartSuccess,
  syncCartFailure,
  clearCartRequest,
  clearCartSuccess,
  clearCartFailure,
} from "./cartSlice";

// Helper to check authentication
const isUserAuthenticated = async (): Promise<boolean> => {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return !!session;
};

// API functions
const cartApi = {
  fetchCart: async (): Promise<CartItem[]> => {
    const response = await fetch("/api/cart");
    const data = await response.json();
    if (!data.success) throw new Error(data.error || "Failed to fetch cart");
    return data.data;
  },
  addItem: async (productId: number, quantity: number = 1): Promise<void> => {
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error || "Failed to add to cart");
  },
  addBulkItems: async (
    items: { productId: number; quantity: number }[]
  ): Promise<void> => {
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(items),
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error || "Failed to sync cart");
  },
  removeItem: async (productId: number): Promise<void> => {
    const response = await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    const data = await response.json();
    if (!data.success)
      throw new Error(data.error || "Failed to remove from cart");
  },
  updateQuantity: async (
    productId: number,
    quantity: number
  ): Promise<void> => {
    const response = await fetch("/api/cart", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });
    const data = await response.json();
    if (!data.success)
      throw new Error(data.error || "Failed to update quantity");
  },
  clearAll: async (): Promise<void> => {
    const response = await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error || "Failed to clear cart");
  },
};

// Worker Sagas
function* fetchCartSaga() {
  try {
    const cartItems: CartItem[] = yield call(cartApi.fetchCart);
    yield put(fetchCartSuccess(cartItems));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch cart";
    yield put(fetchCartFailure(message));
    showToast({
      type: "error",
      title: "Failed to Load Cart",
      description:
        "Unable to load your cart. Please check your network connection and try again.",
    });
  }
}

function* addToCartSaga(action: PayloadAction<Product>) {
  const product = action.payload;

  // Get current cart state after optimistic update
  const currentItem: CartItem | undefined = yield select(
    selectCartItem(product.id)
  );
  const previousQuantity = currentItem ? currentItem.quantity - 1 : null;

  // Check if user is authenticated
  const isAuthenticated: boolean = yield call(isUserAuthenticated);

  // If not authenticated, allow local cart operation (no API call)
  if (!isAuthenticated) {
    yield put(addToCartSuccess({ productId: product.id }));
    return; // Skip API call, keep optimistic update
  }

  // User is authenticated - sync with backend
  try {
    yield call(cartApi.addItem, product.id, 1);
    yield put(addToCartSuccess({ productId: product.id }));
  } catch (error) {
    // Rollback: remove item if it was new, or revert quantity
    yield put(addToCartFailure({ product, previousQuantity }));

    showToast({
      type: "error",
      title: "Add to Cart Failed",
      description:
        "Unable to add item to cart. Please check your network connection and retry.",
    });
  }
}

function* removeFromCartSaga(
  action: PayloadAction<number, string, { removedItem?: CartItem }>
) {
  const productId = action.payload;
  const removedItem = action.meta?.removedItem;

  // Check if user is authenticated
  const isAuthenticated: boolean = yield call(isUserAuthenticated);

  // If not authenticated, allow local cart operation (no API call)
  if (!isAuthenticated) {
    yield put(removeFromCartSuccess({ productId }));
    return; // Skip API call, keep optimistic update
  }

  // User is authenticated - sync with backend
  try {
    yield call(cartApi.removeItem, productId);
    yield put(removeFromCartSuccess({ productId }));
  } catch (error) {
    // Rollback: restore the removed item if we have it
    if (removedItem) {
      yield put(removeFromCartFailure(removedItem));
    }

    showToast({
      type: "error",
      title: "Remove Item Failed",
      description:
        "Unable to remove item from cart. Please check your network connection and retry.",
    });
  }
}

function* updateQuantitySaga(
  action: PayloadAction<{ id: number; quantity: number }>
) {
  const { id: productId, quantity } = action.payload;

  // Get previous quantity before optimistic update for potential rollback
  const currentItem: CartItem | undefined = yield select(
    selectCartItem(productId)
  );
  const previousQuantity = currentItem?.quantity;

  // Check if user is authenticated
  const isAuthenticated: boolean = yield call(isUserAuthenticated);

  // If not authenticated, allow local cart operation (no API call)
  if (!isAuthenticated) {
    yield put(updateQuantitySuccess({ productId, quantity }));
    return; // Skip API call, keep optimistic update
  }

  // User is authenticated - sync with backend
  try {
    yield call(cartApi.updateQuantity, productId, quantity);
    yield put(updateQuantitySuccess({ productId, quantity }));
  } catch (error) {
    // Rollback: revert to previous quantity
    if (previousQuantity !== undefined) {
      yield put(updateQuantityFailure({ productId, previousQuantity }));

      // If rolled back to 0, remove the item completely
      if (previousQuantity === 0 && currentItem) {
        yield put(
          removeFromCartRequest(productId, { removedItem: currentItem })
        );
      }
    }

    showToast({
      type: "error",
      title: "Update Quantity Failed",
      description:
        "Unable to update item quantity. Please check your network connection and retry.",
    });
  }
}

// Sync local cart to backend on login
function* syncCartToBackendSaga() {
  try {
    // Check if user is authenticated
    const isAuthenticated: boolean = yield call(isUserAuthenticated);

    if (!isAuthenticated) {
      console.log("User not authenticated, skipping cart sync");
      yield put(syncCartSuccess());
      return;
    }

    // Get all local cart items
    const localCartItems: CartItem[] = yield select(selectCartItems);

    if (localCartItems.length === 0) {
      console.log("No local cart items to sync");
      // Still fetch backend cart in case user has items there
      yield put(fetchCartRequest());
      yield put(syncCartSuccess());
      return;
    }

    // Prepare bulk items for API
    const bulkItems = localCartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    // Send local cart to backend
    yield call(cartApi.addBulkItems, bulkItems);

    // Fetch merged cart from backend
    yield put(fetchCartRequest());

    // Mark sync as completed
    yield put(syncCartSuccess());
  } catch (error) {
    console.error("Cart sync error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to sync cart";
    yield put(syncCartFailure(message));

    // Still try to fetch backend cart
    yield put(fetchCartRequest());

    showToast({
      type: "error",
      title: "Cart Sync Failed",
      description:
        "Unable to sync your cart. Please check your network connection and try again.",
    });
  }
}

// Clear all cart items
function* clearCartSaga() {
  try {
    // Check if user is authenticated
    const isAuthenticated: boolean = yield call(isUserAuthenticated);

    // If authenticated, call API to clear backend
    if (isAuthenticated) {
      yield call(cartApi.clearAll);
    }

    // Clear local state
    yield put(clearCartSuccess());

    showToast({
      type: "success",
      title: "Cart Cleared",
      description: "All items have been removed from your cart",
    });
  } catch (error) {
    console.error("Clear cart error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to clear cart";
    yield put(clearCartFailure(message));

    showToast({
      type: "error",
      title: "Clear Cart Failed",
      description:
        "Unable to clear your cart. Please check your network connection and retry.",
    });
  }
}

// Watcher Saga
export function* watchCart() {
  yield takeEvery(fetchCartRequest.type, fetchCartSaga);
  yield takeEvery(addToCartRequest.type, addToCartSaga);
  yield takeEvery(removeFromCartRequest.type, removeFromCartSaga);
  yield takeEvery(updateQuantityRequest.type, updateQuantitySaga);
  yield takeEvery(syncCartRequest.type, syncCartToBackendSaga);
  yield takeEvery(clearCartRequest.type, clearCartSaga);
}

export default watchCart;
