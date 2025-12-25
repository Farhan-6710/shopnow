"use client";

import React, { useEffect, useState } from "react";
import ProductPageClient from "./ProductPageClient";
import { PRODUCTS_DATA } from "@/constants/products"; // Import the products data
import { notFound } from "next/navigation";
import ProductDetailsCardSkeleton from "@/components/productsSection/ProductDetailsCardSkeleton";

interface ProductPageProps {
  params: Promise<{ itemName: string }>;
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const [itemName, setItemName] = useState<string | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      // Unwrap the params Promise to get the itemName
      const unwrappedParams = await params;
      setItemName(unwrappedParams.itemName);
    };

    fetchParams();
  }, [params]);

  // Skeleton loading state (if itemName is not yet set)
  if (!itemName) {
    return (
      <main
        className="dark:bg-primaryDarkTwo"
        aria-label="Product details loading"
      >
        <div className="container mx-auto py-4">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 px-4">
            <ProductDetailsCardSkeleton />
          </div>
        </div>
      </main>
    ); // Render skeleton while data is being fetched
  }

  // Decode the product name from the URL
  const decodedItemName = decodeURIComponent(itemName);

  // Find the product based on the decoded name
  const item = PRODUCTS_DATA.find(
    (p) => p.name.toLowerCase() === decodedItemName.toLowerCase()
  );

  if (!item) {
    return notFound();
  }

  return (
    <main className="dark:bg-primaryDarkTwo">
      <div className="container mx-auto py-4">
        <section
          className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 px-4"
          aria-labelledby="product-name"
        >
          <ProductPageClient item={item} />
        </section>
      </div>
    </main>
  );
};

export default ProductPage;
