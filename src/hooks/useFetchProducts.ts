import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/types/product";

export const useFetchProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("/api/products");
      const { data } = await response.json();
      return data as Product[];
    },
  });
};
