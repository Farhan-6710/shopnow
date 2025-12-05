"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductPageClient from "./ProductPageClient";
import { PRODUCTS_DATA } from "@/src/constants/products"; // Import the products data
import { notFound } from "next/navigation";
import { selectCurrency } from "@/src/redux/cart/cartSlice"; // Import the Redux selector
import ProductDetailsCardSkeleton from "@/src/components/productsSection/ProductDetailsCardSkeleton";

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
      <div className="dark:bg-primaryDarkTwo">
        <div className="container mx-auto py-4">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 px-4">
            <ProductDetailsCardSkeleton />
          </div>
        </div>
      </div>
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
    <div className="dark:bg-primaryDarkTwo">
      <div className="container mx-auto py-4">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 px-4">
          <ProductPageClient
            id={product.id} // Pass the product ID
            productName={product.productName}
            imgSource={product.imgSource || "/default-image.png"}
            prices={product.prices}
            rating={product.rating}
            currency={currency} // Pass currency prop from Redux store
            description={product.description} // Pass description to ProductPageClient
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
