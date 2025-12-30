import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { Product } from "@/types/product";
import {
  fetchProductsRequest,
  selectProducts,
  selectProductsLoading,
  selectProductsError,
} from "@/redux/products/productsSlice";

export const useFetchProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const isLoading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  useEffect(() => {
    // Only fetch if we don't have products yet
    if (products.length === 0 && !isLoading && !error) {
      dispatch(fetchProductsRequest());
    }
  }, [dispatch, products.length, isLoading, error]);

  return {
    data: products as Product[],
    isLoading,
    error: error ? new Error(error) : null,
    refetch: () => dispatch(fetchProductsRequest()),
  };
};
