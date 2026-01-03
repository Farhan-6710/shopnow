import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/product";
import { timeout } from "@/utils/timeout";

const fetchProductsApi = async (): Promise<Product[]> => {
  const response = await fetch("/api/products");
  const data = await response.json();
  if (!data.success) throw new Error(data.error || "Failed to fetch products");
  return data.data;
};

export const useFetchProducts = () => {
  const { data, isLoading, isFetching, error, refetch } = useQuery<
    Product[],
    Error
  >({
    queryKey: ["products"],
    queryFn: fetchProductsApi,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  return {
    data: data || [],
    isLoading,
    isFetching,
    error,
    refetch,
  };
};
