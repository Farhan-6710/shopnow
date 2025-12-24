import React, { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { fetchImageWithTimeout } from "@/utils/fetchUtils";
import ProductDetailsCard from "@/components/productsSection/ProductDetailsCard";
import ProductDetailsCardSkeleton from "@/components/productsSection/ProductDetailsCardSkeleton";

interface ProductPageClientProps {
  product: Product;
  currency: "USD" | "INR";
}

const ProductPageClient: React.FC<ProductPageClientProps> = ({
  product,
  currency,
}) => {
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
          key={product.id}
          product={product}
          currency={currency}
          fetchImageWithTimeout={fetchImageWithTimeout}
        />
      )}
    </>
  );
};

export default ProductPageClient;
