// src/redux/products/productsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // ========== Fetch Products ==========
    fetchProductsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess(state, action: PayloadAction<Product[]>) {
      state.loading = false;
      state.items = action.payload;
    },
    fetchProductsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export actions
export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
} = productsSlice.actions;

// Selectors
export const selectProducts = (state: { products: ProductsState }) =>
  state.products.items;

export const selectProductsLoading = (state: { products: ProductsState }) =>
  state.products.loading;

export const selectProductsError = (state: { products: ProductsState }) =>
  state.products.error;

// Export reducer
export default productsSlice.reducer;
