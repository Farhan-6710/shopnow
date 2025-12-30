// src/redux/products/productsSaga.ts
import { call, put, takeEvery } from "redux-saga/effects";
import { Product } from "@/types/product";
import { showToast } from "@/config/ToastConfig";
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "./productsSlice";

// API functions
const productsApi = {
  fetchProducts: async (): Promise<Product[]> => {
    const response = await fetch("/api/products");
    const data = await response.json();
    if (!data.success)
      throw new Error(data.error || "Failed to fetch products");
    return data.data;
  },
};

// Worker Saga
function* fetchProductsSaga() {
  try {
    const products: Product[] = yield call(productsApi.fetchProducts);
    yield put(fetchProductsSuccess(products));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch products";
    yield put(fetchProductsFailure(message));
    showToast({
      type: "error",
      title: "Products Error",
      description: message,
    });
  }
}

// Watcher Saga
export function* watchProducts() {
  yield takeEvery(fetchProductsRequest.type, fetchProductsSaga);
}

export default watchProducts;
