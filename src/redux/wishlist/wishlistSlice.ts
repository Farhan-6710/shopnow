// src/redux/wishlist/wishlistSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

export interface WishlistState {
  items: { [key: number]: Product };
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: {},
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // ========== Fetch Wishlist ==========
    fetchWishlistRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchWishlistSuccess(state, action: PayloadAction<Product[]>) {
      state.loading = false;
      state.items = {};
      action.payload.forEach((item) => {
        state.items[item.id] = item;
      });
    },
    fetchWishlistFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // ========== Add to Wishlist (Optimistic) ==========
    addToWishlistRequest(state, action: PayloadAction<Product>) {
      const product = action.payload;
      if (!state.items[product.id]) {
        state.items[product.id] = product;
      }
    },
    addToWishlistSuccess(state, action: PayloadAction<{ productId: number }>) {
      // UI already updated optimistically - nothing to do
      void state;
      void action;
    },
    addToWishlistFailure(state, action: PayloadAction<Product>) {
      // Revert: Remove the optimistically added item
      delete state.items[action.payload.id];
    },

    // ========== Remove from Wishlist (Optimistic) ==========
    removeFromWishlistRequest(state, action: PayloadAction<number>) {
      delete state.items[action.payload];
    },
    removeFromWishlistSuccess(
      state,
      action: PayloadAction<{ productId: number }>
    ) {
      // UI already updated optimistically - nothing to do
      void state;
      void action;
    },
    removeFromWishlistFailure(state, action: PayloadAction<Product>) {
      // Revert: Restore the removed item
      state.items[action.payload.id] = action.payload;
    },

    // ========== Toggle Wishlist (Optimistic) ==========
    toggleWishlistRequest(state, action: PayloadAction<Product>) {
      const product = action.payload;
      if (state.items[product.id]) {
        delete state.items[product.id];
      } else {
        state.items[product.id] = product;
      }
    },
    toggleWishlistSuccess(
      state,
      action: PayloadAction<{ productId: number; action: "added" | "removed" }>
    ) {
      // UI already updated optimistically - nothing to do
      void state;
      void action;
    },
    toggleWishlistFailure(
      state,
      action: PayloadAction<{ product: Product; wasInWishlist: boolean }>
    ) {
      const { product, wasInWishlist } = action.payload;
      if (wasInWishlist) {
        // Was in wishlist, we removed it, now restore it
        state.items[product.id] = product;
      } else {
        // Was not in wishlist, we added it, now remove it
        delete state.items[product.id];
      }
    },

    // ========== Clear Wishlist ==========
    clearWishlist(state) {
      state.items = {};
    },

    // ========== Replace entire wishlist (for sync) ==========
    replaceWishlist(state, action: PayloadAction<WishlistState>) {
      return action.payload;
    },
  },
});

// Export actions
export const {
  fetchWishlistRequest,
  fetchWishlistSuccess,
  fetchWishlistFailure,
  addToWishlistRequest,
  addToWishlistSuccess,
  addToWishlistFailure,
  removeFromWishlistRequest,
  removeFromWishlistSuccess,
  removeFromWishlistFailure,
  toggleWishlistRequest,
  toggleWishlistSuccess,
  toggleWishlistFailure,
  clearWishlist,
  replaceWishlist,
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

export const selectWishlistLoading = (state: { wishlist: WishlistState }) =>
  state.wishlist.loading;

export const selectWishlistError = (state: { wishlist: WishlistState }) =>
  state.wishlist.error;

// Export reducer
export default wishlistSlice.reducer;
