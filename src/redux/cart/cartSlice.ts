// src/features/cart/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/types/cartItems";

// Define the currency type
type Currency = "USD" | "INR";

interface CartState {
  cartItems: CartItem[];
  currency: Currency;
}

// Initial state
const initialState: CartState = {
  cartItems: [],
  currency: "USD",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const product = action.payload;
      const existingProduct = state.cartItems.find(
        (item) => item.id === product.id
      );
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        state.cartItems.push(product);
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      if (quantity <= 0) return; // Prevent quantity from being zero or negative
      const item = state.cartItems.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
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
  state.cart.cartItems;
export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.cartItems.length;
export const selectCurrency = (state: { cart: CartState }) =>
  state.cart.currency;

// Export reducer
export default cartSlice.reducer;
