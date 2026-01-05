import React, { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { fetchImageWithTimeout } from "@/utils/fetchUtils";
import ProductDetailsCard from "@/components/product-details/ProductDetailsCard";
import ProductDetailsCardSkeleton from "@/components/product-details/ProductDetailsCardSkeleton";

interface ProductDetailsPageClientProps {
  item: Product;
}

const ProductDetailsPageClient: React.FC<ProductDetailsPageClientProps> = ({ item }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <ProductDetailsCardSkeleton />
      ) : (
        <ProductDetailsCard
          key={item.id}
          item={item}
          fetchImageWithTimeout={fetchImageWithTimeout}
        />
      )}
    </>
  );
};

export default ProductDetailsPageClient;
