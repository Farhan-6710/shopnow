import React from "react";
import Rating from "./Rating";

interface ProductDetailsProps {
  name: string;
  currency: "USD" | "INR";
  displayPrice: (currency: "USD" | "INR") => string;
  rating: number;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  name,
  currency,
  displayPrice,
  rating,
}) => (
  <div className="flex flex-col gap-1 justify-center items-center">
    <h2 className="text-sm font-bold dark:text-white text-primaryDarkTwo">
      {name}
    </h2>
    <p className="dark:text-gray-200 text-gray-800">
      {currency === "INR" ? "₹" : "$"}
      {displayPrice(currency)}
    </p>
    <Rating rating={rating} totalStars={5} />
  </div>
);

export default ProductDetails;
