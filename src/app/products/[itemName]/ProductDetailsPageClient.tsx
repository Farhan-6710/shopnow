"use client";

import React from "react";
import { Product } from "@/types/product";
import { fetchImageWithTimeout } from "@/utils/fetchUtils";
import ProductDetailsCard from "@/components/product-details/ProductDetailsCard";

interface ProductDetailsPageClientProps {
  initialItem: Product;
}

const ProductDetailsPageClient = ({
  initialItem,
}: ProductDetailsPageClientProps) => {
  return (
    <ProductDetailsCard
      key={initialItem.id}
      item={initialItem}
      fetchImageWithTimeout={fetchImageWithTimeout}
    />
  );
};

export default ProductDetailsPageClient;
