// src/redux/cart/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/types/cartItems";
import { Product } from "@/types/product";

// Define the currency type
type Currency = "USD" | "INR";

export interface CartState {
  cartItems: { [key: number]: CartItem };
  currency: Currency;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: CartState = {
  cartItems: {},
  currency: "USD",
  loading: false,
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
    removeFromCartRequest(state, action: PayloadAction<number>) {
      delete state.cartItems[action.payload];
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

    // ========== Currency ==========
    setCurrency(state, action: PayloadAction<Currency>) {
      state.currency = action.payload;
    },

    // ========== Replace entire cart (for sync) ==========
    replaceCart(state, action: PayloadAction<CartState>) {
      return action.payload;
    },

    // ========== Clear cart ==========
    clearCart(state) {
      state.cartItems = {};
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
  setCurrency,
  replaceCart,
  clearCart,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: CartState }) =>
  Object.values(state.cart.cartItems);

export const selectCartItemsDict = (state: { cart: CartState }) =>
  state.cart.cartItems;

export const selectCartCount = (state: { cart: CartState }) =>
  Object.keys(state.cart.cartItems).length;

export const selectIsInCart =
  (productId: number) => (state: { cart: CartState }) =>
    !!state.cart.cartItems[productId];

export const selectCartItem =
  (productId: number) => (state: { cart: CartState }) =>
    state.cart.cartItems[productId];

export const selectCurrency = (state: { cart: CartState }) =>
  state.cart.currency;

export const selectCartLoading = (state: { cart: CartState }) =>
  state.cart.loading;

export const selectCartError = (state: { cart: CartState }) => state.cart.error;

// Export reducer
export default cartSlice.reducer;
