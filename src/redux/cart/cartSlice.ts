// src/redux/cart/cartSlice.ts
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { CartItem } from "@/types/cartItems";
import { Product } from "@/types/product";
import { RemovedItemsMap } from "@/types/api";

type Currency = "USD" | "INR";

export interface CartState {
  items: Record<number, CartItem>;
  removedItems: RemovedItemsMap;
  currency: Currency;
  loading: boolean;
  syncing: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: {},
  removedItems: {},
  currency: "USD",
  loading: false,
  syncing: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ========== Fetch Cart ==========
    fetchCartRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCartSuccess(state, action: PayloadAction<CartItem[]>) {
      state.loading = false;
      state.items = {};
      action.payload.forEach((item) => {
        state.items[item.id] = item;
      });
    },
    fetchCartFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // ========== Add to Cart (Optimistic) ==========
    addToCartRequest(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const existing = state.items[product.id];
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items[product.id] = {
          ...product,
          quantity: 1,
          currency: state.currency,
        };
      }
      // Clear from removedItems if re-adding
      delete state.removedItems[product.id];
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addToCartSuccess(state, action: PayloadAction<{ productId: number }>) {
      // No-op: Optimistic update already applied in request
    },
    addToCartFailure(
      state,
      action: PayloadAction<{
        product: Product;
        previousQuantity: number | null;
      }>,
    ) {
      const { product, previousQuantity } = action.payload;
      if (previousQuantity === null) {
        delete state.items[product.id];
      } else if (state.items[product.id]) {
        state.items[product.id].quantity = previousQuantity;
      }
    },

    // ========== Remove from Cart (Optimistic) ==========
    removeFromCartRequest: {
      reducer(
        state,
        action: PayloadAction<number, string, { removedItem?: CartItem }>,
      ) {
        delete state.items[action.payload];
      },
      prepare(productId: number, meta?: { removedItem?: CartItem }) {
        return { payload: productId, meta: meta || {} };
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeFromCartSuccess(state, action: PayloadAction<{ productId: number }>) {
      // No-op: Optimistic update already applied in request
    },
    removeFromCartFailure(state, action: PayloadAction<CartItem>) {
      state.items[action.payload.id] = action.payload;
    },

    // ========== Update Quantity (Optimistic) ==========
    updateQuantityRequest(
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) {
      const { id, quantity } = action.payload;
      if (state.items[id] && quantity > 0) {
        state.items[id].quantity = quantity;
      }
    },
    updateQuantitySuccess() {
      // No-op: Optimistic update already applied in request
    },
    updateQuantityFailure(
      state,
      action: PayloadAction<{ productId: number; previousQuantity: number }>,
    ) {
      const { productId, previousQuantity } = action.payload;
      if (state.items[productId]) {
        state.items[productId].quantity = previousQuantity;
      }
    },

    // ========== Sync ==========
    syncCartRequest(state) {
      state.syncing = true;
      state.error = null;
    },
    syncCartSuccess(state) {
      state.syncing = false;
      state.removedItems = {};
    },
    syncCartFailure(state, action: PayloadAction<string>) {
      state.syncing = false;
      state.error = action.payload;
    },

    // ========== Track Removed Items (Offline Sync) ==========
    trackRemovedItem(state, action: PayloadAction<number>) {
      state.removedItems[action.payload] = true;
    },

    // ========== Clear Cart ==========
    clearCartRequest(state) {
      state.loading = true;
      state.error = null;
    },
    clearCartSuccess(state) {
      state.loading = false;
      state.items = {};
      state.removedItems = {};
    },
    clearCartFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // ========== Currency ==========
    setCurrency(state, action: PayloadAction<Currency>) {
      state.currency = action.payload;
    },
  },
});

export const {
  fetchCartRequest,
  fetchCartSuccess,
  fetchCartFailure,
  addToCartRequest,
  addToCartSuccess,
  addToCartFailure,
  removeFromCartRequest,
  removeFromCartSuccess,
  removeFromCartFailure,
  updateQuantityRequest,
  updateQuantitySuccess,
  updateQuantityFailure,
  syncCartRequest,
  syncCartSuccess,
  syncCartFailure,
  trackRemovedItem,
  clearCartRequest,
  clearCartSuccess,
  clearCartFailure,
  setCurrency,
} = cartSlice.actions;

// ========== Selectors ==========
const selectCartState = (state: { cart: CartState }) => state.cart;
const selectCartItemsDict = (state: { cart: CartState }) => state.cart.items;

export const selectCartItems = createSelector([selectCartItemsDict], (items) =>
  Object.values(items),
);

export const selectCartCount = createSelector(
  [selectCartItemsDict],
  (items) => Object.keys(items).length,
);

export const selectIsInCart = (productId: number) =>
  createSelector([selectCartItemsDict], (items) => !!items[productId]);

export const selectCartItem = (productId: number) =>
  createSelector([selectCartItemsDict], (items) => items[productId]);

export const selectCurrency = createSelector(
  [selectCartState],
  (state) => state.currency,
);

export const selectCartLoading = createSelector(
  [selectCartState],
  (state) => state.loading,
);

export const selectCartSyncing = createSelector(
  [selectCartState],
  (state) => state.syncing,
);

export const selectCartError = createSelector(
  [selectCartState],
  (state) => state.error,
);

export const selectRemovedItems = createSelector(
  [selectCartState],
  (state) => state.removedItems,
);

export default cartSlice.reducer;
