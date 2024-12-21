import React from "react";
import Rating from "./Rating";

interface ProductDetailsProps {
  productName: string;
  currency: "USD" | "INR";
  displayPrice: (currency: "USD" | "INR") => string;
  rating: number;
  isDarkMode: boolean;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  productName,
  currency,
  displayPrice,
  rating,
}) => (
  <div className="flex-grow">
    <h2 className="text-lg font-bold dark:text-white text-gray-900">
      {productName}
    </h2>
    <p className="dark:text-gray-400 text-gray-700">
      {currency === "INR" ? "₹" : "$"}
      {displayPrice(currency)}
    </p>
    <Rating rating={rating} totalStars={5} />
  </div>
);

export default ProductDetails;
