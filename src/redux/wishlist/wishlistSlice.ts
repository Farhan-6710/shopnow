// src/redux/wishlist/wishlistSlice.ts
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

export interface WishlistState {
  items: { [key: number]: Product };
  loading: boolean;
  isWishlistSyncing: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: {},
  loading: false,
  isWishlistSyncing: false,
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
    removeFromWishlistRequest: {
      reducer(
        state,
        action: PayloadAction<number, string, { removedItem?: Product }>
      ) {
        delete state.items[action.payload];
      },
      prepare(productId: number, meta?: { removedItem?: Product }) {
        return { payload: productId, meta: meta || {} };
      },
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

    // ========== Sync Status ==========
    wishlistSyncRequest(state) {
      state.isWishlistSyncing = true;
      state.error = null;
    },
    wishlistSyncSuccess(state) {
      state.isWishlistSyncing = false;
    },
    wishlistSyncFailure(state, action: PayloadAction<string>) {
      state.isWishlistSyncing = false;
      state.error = action.payload;
    },

    // ========== Replace entire wishlist (for sync) ==========
    replaceWishlist(state, action: PayloadAction<WishlistState>) {
      return action.payload;
    },

    // ========== Clear Wishlist ==========
    clearWishlistRequest(state) {
      state.loading = true;
      state.error = null;
    },
    clearWishlistSuccess(state) {
      state.loading = false;
      state.items = {};
    },
    clearWishlistFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
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
  wishlistSyncRequest,
  wishlistSyncSuccess,
  wishlistSyncFailure,
  replaceWishlist,
  clearWishlistRequest,
  clearWishlistSuccess,
  clearWishlistFailure,
} = wishlistSlice.actions;

// Selectors
const selectWishlistState = (state: { wishlist: WishlistState }) =>
  state.wishlist;

const selectWishlistItemsDict = (state: { wishlist: WishlistState }) =>
  state.wishlist.items;

export const selectWishlistItems = createSelector(
  [selectWishlistItemsDict],
  (items) => Object.values(items)
);

export const selectWishlistCount = createSelector(
  [selectWishlistItemsDict],
  (items) => Object.keys(items).length
);

export const selectIsInWishlist = (productId: number) =>
  createSelector([selectWishlistItemsDict], (items) => !!items[productId]);

export const selectWishlistLoading = createSelector(
  [selectWishlistState],
  (state) => state.loading
);

export const selectWishlistSyncing = createSelector(
  [selectWishlistState],
  (state) => state.isWishlistSyncing
);

export const selectWishlistError = createSelector(
  [selectWishlistState],
  (state) => state.error
);

// Export reducer
export default wishlistSlice.reducer;
