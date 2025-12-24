"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductPageClient from "./ProductPageClient";
import { PRODUCTS_DATA } from "@/constants/products"; // Import the products data
import { notFound } from "next/navigation";
import { selectCurrency } from "@/redux/cart/cartSlice"; // Import the Redux selector
import ProductDetailsCardSkeleton from "@/components/productsSection/ProductDetailsCardSkeleton";

interface ProductPageProps {
  params: Promise<{ productName: string }>;
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const [productName, setProductName] = useState<string | null>(null);
  const currency = useSelector(selectCurrency); // Fetch currency from Redux store

  useEffect(() => {
    const fetchParams = async () => {
      // Unwrap the params Promise to get the productName
      const unwrappedParams = await params;
      setProductName(unwrappedParams.productName);
    };

    fetchParams();
  }, [params]);

  // Skeleton loading state (if productName is not yet set)
  if (!productName) {
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
  const decodedProductName = decodeURIComponent(productName);

  // Find the product based on the decoded name
  const product = PRODUCTS_DATA.find(
    (p) => p.productName.toLowerCase() === decodedProductName.toLowerCase()
  );

  if (!product) {
    return notFound();
  }

  return (
    <main className="dark:bg-primaryDarkTwo">
      <div className="container mx-auto py-4">
        <section
          className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 px-4"
          aria-labelledby="product-name"
        >
          <ProductPageClient
            product={product}
            currency={currency} // Pass currency prop from Redux store
          />
        </section>
      </div>
    </main>
  );
};

export default ProductPage;
