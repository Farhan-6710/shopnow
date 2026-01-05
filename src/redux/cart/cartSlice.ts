// src/redux/cart/cartSlice.ts
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { CartItem } from "@/types/cartItems";
import { Product } from "@/types/product";

// Define the currency type
type Currency = "USD" | "INR";

export interface CartState {
  cartItems: { [key: number]: CartItem };
  currency: Currency;
  loading: boolean;
  isSyncing: boolean;
  error: string | null;
}

// Initial state
const initialState: CartState = {
  cartItems: {},
  currency: "USD",
  loading: false,
  isSyncing: false,
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
      state.cartItems = {};
      action.payload.forEach((item) => {
        state.cartItems[item.id] = item;
      });
    },
    fetchCartFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // ========== Add to Cart (Optimistic) ==========
    addToCartRequest(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const existingProduct = state.cartItems[product.id];

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cartItems[product.id] = {
          ...product,
          quantity: 1,
          currency: state.currency,
        };
      }
    },
    addToCartSuccess(state, action: PayloadAction<{ productId: number }>) {
      // UI already updated optimistically - nothing to do
      void state;
      void action;
    },
    addToCartFailure(
      state,
      action: PayloadAction<{
        product: Product;
        previousQuantity: number | null;
      }>
    ) {
      const { product, previousQuantity } = action.payload;
      if (previousQuantity === null) {
        // Item was newly added, remove it
        delete state.cartItems[product.id];
      } else {
        // Item existed, revert quantity
        if (state.cartItems[product.id]) {
          state.cartItems[product.id].quantity = previousQuantity;
        }
      }
    },

    // ========== Remove from Cart (Optimistic) ==========
    removeFromCartRequest: {
      reducer(
        state,
        action: PayloadAction<number, string, { removedItem?: CartItem }>
      ) {
        delete state.cartItems[action.payload];
      },
      prepare(productId: number, meta?: { removedItem?: CartItem }) {
        return { payload: productId, meta: meta || {} };
      },
    },
    removeFromCartSuccess(state, action: PayloadAction<{ productId: number }>) {
      // UI already updated optimistically - nothing to do
      void state;
      void action;
    },
    removeFromCartFailure(state, action: PayloadAction<CartItem>) {
      // Restore the removed item
      state.cartItems[action.payload.id] = action.payload;
    },

    // ========== Update Quantity (Optimistic) ==========
    updateQuantityRequest(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const item = state.cartItems[action.payload.id];
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      }
    },
    updateQuantitySuccess(
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) {
      // UI already updated optimistically - nothing to do
      void state;
      void action;
    },
    updateQuantityFailure(
      state,
      action: PayloadAction<{ productId: number; previousQuantity: number }>
    ) {
      const { productId, previousQuantity } = action.payload;
      if (state.cartItems[productId]) {
        state.cartItems[productId].quantity = previousQuantity;
      }
    },

    // ========== Sync Status ==========
    syncCartRequest(state) {
      state.isSyncing = true;
      state.error = null;
    },
    syncCartSuccess(state) {
      state.isSyncing = false;
    },
    syncCartFailure(state, action: PayloadAction<string>) {
      state.isSyncing = false;
      state.error = action.payload;
    },

    // ========== Currency ==========
    setCurrency(state, action: PayloadAction<Currency>) {
      state.currency = action.payload;
    },

    // ========== Replace entire cart (for sync) ==========
    replaceCart(state, action: PayloadAction<CartState>) {
      return action.payload;
    },

    // ========== Clear Cart ==========
    clearCartRequest(state) {
      state.loading = true;
      state.error = null;
    },
    clearCartSuccess(state) {
      state.loading = false;
      state.cartItems = {};
    },
    clearCartFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export actions
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
  setCurrency,
  replaceCart,
  clearCartRequest,
  clearCartSuccess,
  clearCartFailure,
} = cartSlice.actions;

// Selectors
const selectCartState = (state: { cart: CartState }) => state.cart;

const selectCartItemsDict = (state: { cart: CartState }) =>
  state.cart.cartItems;

export const selectCartItems = createSelector([selectCartItemsDict], (items) =>
  Object.values(items)
);

export const selectCartCount = createSelector(
  [selectCartItemsDict],
  (items) => Object.keys(items).length
);

export const selectIsInCart = (productId: number) =>
  createSelector([selectCartItemsDict], (items) => !!items[productId]);

export const selectCartItem = (productId: number) =>
  createSelector([selectCartItemsDict], (items) => items[productId]);

export const selectCurrency = createSelector(
  [selectCartState],
  (state) => state.currency
);

export const selectCartLoading = createSelector(
  [selectCartState],
  (state) => state.loading
);

export const selectCartSyncing = createSelector(
  [selectCartState],
  (state) => state.isSyncing
);

export const selectCartError = createSelector(
  [selectCartState],
  (state) => state.error
);

// Export reducer
export default cartSlice.reducer;
