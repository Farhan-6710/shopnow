// src/features/cart/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/types/cartItems";
import { Product } from "@/types/product";

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
    addToCart(state, action: PayloadAction<Product & { quantity?: number }>) {
      const product = action.payload;
      const existingProduct = state.cartItems.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        // Increment by specified quantity or 1 if not provided
        existingProduct.quantity += product.quantity ?? 1;
      } else {
        // Add new item with quantity defaulting to 1 and currency from state
        state.cartItems.push({
          ...product,
          quantity: product.quantity ?? 1,
          currency: state.currency,
        });
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
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
export const { addToCart, removeFromCart, setCurrency, replace } =
  cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: CartState }) =>
  state.cart.cartItems;
export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.cartItems.length;
export const selectCurrency = (state: { cart: CartState }) =>
  state.cart.currency;

// Export reducer
export default cartSlice.reducer;
