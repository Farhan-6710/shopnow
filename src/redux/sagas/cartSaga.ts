// src/redux/cart/cartSaga.ts
import { call, put, select, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";
import { CartItem } from "@/types/cartItems";
import { RemovedItemsMap } from "@/types/api";
import { cartApi } from "@/services/cartApi";
import { isAuthenticated } from "@/utils/auth";
import {
  getItemsToRemove,
  showErrorToast,
  showSuccessToast,
} from "@/utils/redux/sagaHelpers";
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
  syncCartRequest,
  syncCartSuccess,
  syncCartFailure,
  clearCartRequest,
  clearCartSuccess,
  clearCartFailure,
  selectCartItem,
  selectCartItems,
  selectRemovedItems,
  trackRemovedItem,
} from "@/redux/slices/cartSlice";

// ========== Fetch Cart ==========
function* fetchCartSaga() {
  try {
    const cartItems: CartItem[] = yield call(cartApi.fetch);
    yield put(fetchCartSuccess(cartItems));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch cart";
    yield put(fetchCartFailure(message));
    showErrorToast(
      "Failed to Load Cart",
      "Unable to load your cart. Please check your connection."
    );
  }
}

// ========== Add to Cart ==========
function* addToCartSaga(action: PayloadAction<Product>) {
  const product = action.payload;
  const currentItem: CartItem | undefined = yield select(
    selectCartItem(product.id)
  );
  const previousQuantity = currentItem ? currentItem.quantity - 1 : null;

  const isAuth: boolean = yield call(isAuthenticated);

  if (!isAuth) {
    yield put(addToCartSuccess({ productId: product.id }));
    return;
  }

  try {
    yield call(cartApi.addItem, product.id, 1);
    yield put(addToCartSuccess({ productId: product.id }));
  } catch {
    yield put(addToCartFailure({ product, previousQuantity }));
    showErrorToast("Add to Cart Failed", "Unable to add item to cart.");
  }
}

// ========== Remove from Cart ==========
function* removeFromCartSaga(
  action: PayloadAction<number, string, { removedItem?: CartItem }>
) {
  const productId = action.payload;
  const removedItem = action.meta?.removedItem;

  const isAuth: boolean = yield call(isAuthenticated);

  if (!isAuth) {
    yield put(removeFromCartSuccess({ productId }));
    yield put(trackRemovedItem(productId));
    return;
  }

  try {
    yield call(cartApi.removeItem, productId);
    yield put(removeFromCartSuccess({ productId }));
  } catch {
    if (removedItem) {
      yield put(removeFromCartFailure(removedItem));
    }
    showErrorToast("Remove Item Failed", "Unable to remove item from cart.");
  }
}

// ========== Update Quantity ==========
function* updateQuantitySaga(
  action: PayloadAction<{ id: number; quantity: number }>
) {
  const { id: productId, quantity } = action.payload;
  const currentItem: CartItem | undefined = yield select(
    selectCartItem(productId)
  );
  const previousQuantity = currentItem?.quantity;

  const isAuth: boolean = yield call(isAuthenticated);

  if (!isAuth) {
    yield put(updateQuantitySuccess({ productId, quantity }));
    return;
  }

  try {
    yield call(cartApi.updateQuantity, productId, quantity);
    yield put(updateQuantitySuccess({ productId, quantity }));
  } catch {
    if (previousQuantity !== undefined) {
      yield put(updateQuantityFailure({ productId, previousQuantity }));
    }
    showErrorToast("Update Failed", "Unable to update item quantity.");
  }
}

// ========== Sync Cart to Backend ==========
function* syncCartSaga() {
  try {
    const isAuth: boolean = yield call(isAuthenticated);

    if (!isAuth) {
      yield put(syncCartSuccess());
      return;
    }

    const localItems: CartItem[] = yield select(selectCartItems);
    const removedItems: RemovedItemsMap = yield select(selectRemovedItems);

    // Get items to remove (removed offline but not re-added)
    const currentIds = new Set(localItems.map((item) => item.id));
    const itemsToRemove = getItemsToRemove(removedItems, currentIds);

    // Remove items first
    if (itemsToRemove.length > 0) {
      yield call(cartApi.removeBulkItems, itemsToRemove);
    }

    // Add/update items
    if (localItems.length > 0) {
      const bulkItems = localItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));
      yield call(cartApi.addBulkItems, bulkItems);
    }

    // Fetch merged cart from backend
    yield call(fetchCartSaga);
    yield put(syncCartSuccess());
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to sync cart";
    yield put(syncCartFailure(message));
    yield call(fetchCartSaga);
    showErrorToast("Cart Sync Failed", "Unable to sync your cart.");
  }
}

// ========== Clear Cart ==========
function* clearCartSaga() {
  try {
    const isAuth: boolean = yield call(isAuthenticated);

    if (isAuth) {
      yield call(cartApi.clearAll);
    }

    yield put(clearCartSuccess());
    showSuccessToast("Cart Cleared", "All items removed from your cart.");
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to clear cart";
    yield put(clearCartFailure(message));
    showErrorToast("Clear Cart Failed", "Unable to clear your cart.");
  }
}

// ========== Watcher ==========
export function* watchCart() {
  yield takeEvery(fetchCartRequest.type, fetchCartSaga);
  yield takeEvery(addToCartRequest.type, addToCartSaga);
  yield takeEvery(removeFromCartRequest.type, removeFromCartSaga);
  yield takeEvery(updateQuantityRequest.type, updateQuantitySaga);
  yield takeEvery(syncCartRequest.type, syncCartSaga);
  yield takeEvery(clearCartRequest.type, clearCartSaga);
}

export default watchCart;
