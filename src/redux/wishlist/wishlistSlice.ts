// src/redux/wishlist/wishlistSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

interface WishlistState {
  items: { [key: number]: Product };
}

const initialState: WishlistState = {
  items: {},
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist(state, action: PayloadAction<Product>) {
      const product = action.payload;

      if (state.items[product.id]) {
        // Remove from wishlist
        delete state.items[product.id];
      } else {
        // Add to wishlist
        state.items[product.id] = product;
      }
    },
    addToWishlist(state, action: PayloadAction<Product>) {
      const product = action.payload;
      if (!state.items[product.id]) {
        state.items[product.id] = product;
      }
    },
    removeFromWishlist(state, action: PayloadAction<number>) {
      delete state.items[action.payload];
    },
    clearWishlist(state) {
      state.items = {};
    },
  },
});

// Export actions
export const {
  toggleWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistSlice.actions;

// Selectors
export const selectWishlistItems = (state: { wishlist: WishlistState }) =>
  Object.values(state.wishlist.items);

export const selectWishlistItemsDict = (state: { wishlist: WishlistState }) =>
  state.wishlist.items;

export const selectWishlistCount = (state: { wishlist: WishlistState }) =>
  Object.keys(state.wishlist.items).length;

export const selectIsInWishlist =
  (productId: number) => (state: { wishlist: WishlistState }) =>
    !!state.wishlist.items[productId];

// Export reducer
export default wishlistSlice.reducer;
