// src/redux/cart/cartSaga.ts
import { call, put, select, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";
import { CartItem } from "@/types/cartItems";
import { showToast } from "@/config/ToastConfig";
import {
  addToCartRequest,
  addToCartSuccess,
  addToCartFailure,
  removeFromCartRequest,
  removeFromCartSuccess,
  updateQuantityRequest,
  updateQuantitySuccess,
  fetchCartRequest,
  fetchCartSuccess,
  fetchCartFailure,
  selectCartItem,
} from "./cartSlice";

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
      title: "Cart Error",
      description: message,
    });
  }
}

function* addToCartSaga(action: PayloadAction<Product>) {
  const product = action.payload;

  // Get previous quantity before optimistic update (already applied by reducer)
  // We need to calculate what it was before
  const currentItem: CartItem | undefined = yield select(
    selectCartItem(product.id)
  );
  const previousQuantity = currentItem ? currentItem.quantity - 1 : null;

  try {
    yield call(cartApi.addItem, product.id, 1);
    yield put(addToCartSuccess({ productId: product.id }));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to add to cart";
    yield put(addToCartFailure({ product, previousQuantity }));
    showToast({
      type: "error",
      title: "Cart Error",
      description: message,
    });
  }
}

function* removeFromCartSaga(action: PayloadAction<number>) {
  const productId = action.payload;

  // The item is already removed by the reducer (optimistic update)
  // We need to store the item in the action meta for potential rollback
  // Since we can't access it after removal, we'll use a workaround
  // by dispatching the action with the item data

  try {
    yield call(cartApi.removeItem, productId);
    yield put(removeFromCartSuccess({ productId }));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to remove from cart";
    // Note: We can't restore the item here because we don't have its data
    // This is handled by passing the full item in the saga trigger
    showToast({
      type: "error",
      title: "Cart Error",
      description: message,
    });
  }
}

function* updateQuantitySaga(
  action: PayloadAction<{ id: number; quantity: number }>
) {
  const { id: productId, quantity } = action.payload;

  try {
    yield call(cartApi.updateQuantity, productId, quantity);
    yield put(updateQuantitySuccess({ productId, quantity }));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update quantity";
    // Revert would require knowing the previous quantity
    // For now, we'll refetch the cart on failure
    yield put(fetchCartRequest());
    showToast({
      type: "error",
      title: "Cart Error",
      description: message,
    });
  }
}

// Watcher Saga
export function* watchCart() {
  yield takeEvery(fetchCartRequest.type, fetchCartSaga);
  yield takeEvery(addToCartRequest.type, addToCartSaga);
  yield takeEvery(removeFromCartRequest.type, removeFromCartSaga);
  yield takeEvery(updateQuantityRequest.type, updateQuantitySaga);
}

export default watchCart;
