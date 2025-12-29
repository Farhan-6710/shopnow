// src/features/cart/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/types/cartItems";
import { Product } from "@/types/product";

// Define the currency type
type Currency = "USD" | "INR";

interface CartState {
  cartItems: { [key: number]: CartItem };
  currency: Currency;
}

// Initial state
const initialState: CartState = {
  cartItems: {},
  currency: "USD",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
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
    removeFromCart(state, action: PayloadAction<number>) {
      delete state.cartItems[action.payload];
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const item = state.cartItems[action.payload.id];
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      }
    },
    setCurrency(state, action: PayloadAction<Currency>) {
      state.currency = action.payload;
    },
    replace(state, action: PayloadAction<CartState>) {
      return action.payload;
    },
  },
});

// Export actions
export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  setCurrency,
  replace,
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

// Export reducer
export default cartSlice.reducer;
