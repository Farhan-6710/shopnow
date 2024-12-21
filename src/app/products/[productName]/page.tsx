"use client";

import React from "react";
import { useSelector } from "react-redux";
import ProductPageClient from "./ProductPageClient";
import { productsData } from "@/src/data/productsData"; // Import the products data
import { notFound } from "next/navigation";
import { selectCurrency } from "@/src/features/cart/cartSlice"; // Import the Redux selector

interface Product {
  id: number;
  productName: string;
  imgSource?: string;
  prices: {
    USD: number;
    INR: number;
  };
  rating?: number;
}

interface ProductPageProps {
  params: { productName: string };
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const { productName } = params;
  const currency = useSelector(selectCurrency); // Fetch currency from Redux store

  // Decode the product name from the URL
  const decodedProductName = decodeURIComponent(productName);

  // Find the product based on the decoded name
  const product = productsData.find(
    (p) => p.productName.toLowerCase() === decodedProductName.toLowerCase()
  );

  if (!product) {
    return notFound();
  }

  return (
    <div className="dark:bg-gray-900">
      <div className="container mx-auto py-8">
        <ProductPageClient
          id={product.id} // Pass the product ID
          productName={product.productName}
          imgSource={product.imgSource || "/default-image.png"}
          prices={product.prices}
          rating={product.rating}
          currency={currency} // Pass currency prop from Redux store
        />
      </div>
    </div>
  );
};

export default ProductPage;
