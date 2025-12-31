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

  // Fetch ONCE on mount
  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  return {
    data: products as Product[],
    isLoading,
    error: error ? new Error(error) : null,
    refetch: () => dispatch(fetchProductsRequest()),
  };
};
