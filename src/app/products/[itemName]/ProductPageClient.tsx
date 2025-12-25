import React, { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { fetchImageWithTimeout } from "@/utils/fetchUtils";
import ProductDetailsCard from "@/components/productsSection/ProductDetailsCard";
import ProductDetailsCardSkeleton from "@/components/productsSection/ProductDetailsCardSkeleton";

interface ProductPageClientProps {
  item: Product;
}

const ProductPageClient: React.FC<ProductPageClientProps> = ({
  item,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);
  console.log("isLoading:", isLoading);

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

export default ProductPageClient;
