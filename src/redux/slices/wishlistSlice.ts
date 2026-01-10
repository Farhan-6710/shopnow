// src/redux/wishlist/wishlistSlice.ts
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { Product } from "@/types/product";
import { RemovedItemsMap } from "@/types/api";

export interface WishlistState {
  items: Record<number, Product>;
  removedItems: RemovedItemsMap;
  loading: boolean;
  syncing: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: {},
  removedItems: {},
  loading: false,
  syncing: false,
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
      state.syncing = false;
      state.items = {};
      action.payload.forEach((item) => {
        state.items[item.id] = item;
      });
    },
    fetchWishlistFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.syncing = false;
      state.error = action.payload;
    },

    // ========== Add to Wishlist (Optimistic) ==========
    addToWishlistRequest(state, action: PayloadAction<Product>) {
      const product = action.payload;
      if (!state.items[product.id]) {
        state.items[product.id] = product;
      }
      // Clear from removedItems if re-adding
      delete state.removedItems[product.id];
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addToWishlistSuccess(state, action: PayloadAction<{ productId: number }>) {
      // No-op: Optimistic update already applied in request
    },
    addToWishlistFailure(state, action: PayloadAction<Product>) {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeFromWishlistSuccess(
      state,
      action: PayloadAction<{ productId: number }>
    ) {
      // No-op: Optimistic update already applied in request
    },
    removeFromWishlistFailure(state, action: PayloadAction<Product>) {
      state.items[action.payload.id] = action.payload;
    },

    // ========== Toggle Wishlist (Optimistic) ==========
    toggleWishlistRequest(state, action: PayloadAction<Product>) {
      const product = action.payload;
      if (state.items[product.id]) {
        delete state.items[product.id];
      } else {
        state.items[product.id] = product;
        // Clear from removedItems if re-adding
        delete state.removedItems[product.id];
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toggleWishlistSuccess(
      state,
      action: PayloadAction<{ productId: number; action: "added" | "removed" }>
    ) {
      // No-op: Optimistic update already applied in request
    },
    toggleWishlistFailure(
      state,
      action: PayloadAction<{ product: Product; wasInWishlist: boolean }>
    ) {
      const { product, wasInWishlist } = action.payload;
      if (wasInWishlist) {
        state.items[product.id] = product;
      } else {
        delete state.items[product.id];
      }
    },

    // ========== Sync ==========
    wishlistSyncRequest(state) {
      state.syncing = true;
      state.error = null;
    },
    wishlistSyncSuccess(state) {
      // syncing flag is cleared by fetchWishlistSuccess after data is fetched
      state.removedItems = {};
    },
    wishlistSyncFailure(state, action: PayloadAction<string>) {
      state.syncing = false;
      state.error = action.payload;
    },

    // ========== Track Removed Items (Offline Sync) ==========
    trackRemovedWishlistItem(state, action: PayloadAction<number>) {
      state.removedItems[action.payload] = true;
    },

    // ========== Clear Wishlist (Optimistic) ==========
    clearWishlistRequest: {
      reducer(
        state,
        _action: PayloadAction<
          void,
          string,
          { previousItems?: Record<number, Product> }
        >
      ) {
        // Optimistically clear items immediately
        state.items = {};
        state.removedItems = {};
        state.error = null;
      },
      prepare(previousItems: Record<number, Product>) {
        return { payload: undefined, meta: { previousItems } };
      },
    },
    clearWishlistSuccess(_state, _action: PayloadAction<void>) {
      // No-op: Optimistic update already applied in request
    },
    clearWishlistFailure(
      state,
      action: PayloadAction<{
        error: string;
        previousItems: Record<number, Product>;
      }>
    ) {
      // Rollback: restore previous items on failure
      state.items = action.payload.previousItems;
      state.error = action.payload.error;
    },
  },
});

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
  trackRemovedWishlistItem,
  clearWishlistRequest,
  clearWishlistSuccess,
  clearWishlistFailure,
} = wishlistSlice.actions;

// ========== Selectors ==========
const selectWishlistState = (state: { wishlist: WishlistState }) =>
  state?.wishlist || {
    items: {},
    removedItems: {},
    loading: false,
    syncing: false,
    error: null,
  };
export const selectWishlistItemsDict = (state: { wishlist: WishlistState }) =>
  state?.wishlist?.items || {};

export const selectWishlistItems = createSelector(
  [selectWishlistItemsDict],
  (items) => Object.values(items || {})
);

export const selectWishlistCount = createSelector(
  [selectWishlistItemsDict],
  (items) => Object.keys(items || {}).length
);

export const selectIsInWishlist = (productId: number) =>
  createSelector(
    [selectWishlistItemsDict],
    (items) => !!(items || {})[productId]
  );

export const selectWishlistLoading = createSelector(
  [selectWishlistState],
  (state) => state.loading
);

export const selectWishlistSyncing = createSelector(
  [selectWishlistState],
  (state) => state.syncing
);

export const selectWishlistError = createSelector(
  [selectWishlistState],
  (state) => state.error
);

export const selectRemovedWishlistItems = createSelector(
  [selectWishlistState],
  (state) => state.removedItems
);

export default wishlistSlice.reducer;
