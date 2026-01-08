"use client";

import React from "react";
import { Product } from "@/types/product";
import { fetchImageWithTimeout } from "@/utils/fetchUtils";
import ProductDetailsCard from "@/components/product-details/ProductDetailsCard";

interface ProductDetailsPageClientProps {
  initialItem: Product;
}

const ProductDetailsPageClient: React.FC<ProductDetailsPageClientProps> = ({
  initialItem,
}) => {
  return (
    <ProductDetailsCard
      key={initialItem.id}
      item={initialItem}
      fetchImageWithTimeout={fetchImageWithTimeout}
    />
  );
};

export default ProductDetailsPageClient;
