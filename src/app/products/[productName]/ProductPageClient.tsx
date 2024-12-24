import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/src/store";
import { addToCart, removeFromCart } from "@/src/features/cart/cartSlice";
import { Product } from "@/types/product";
import { fetchImageWithTimeout } from "@/utils/fetchUtils";
import ProductDetailsCard from "@/src/components/productsSections/ProductDetailsCard";
import ProductDetailsCardSkeleton from "@/src/components/productsSections/ProductDetailsCardSkeleton";

interface ProductPageClientProps {
  id: number;
  productName: string;
  imgSource: string;
  prices: {
    USD: number;
    INR: number;
  };
  rating?: number;
  description: string; // Add description prop
  currency: "USD" | "INR";
}

const ProductPageClient: React.FC<ProductPageClientProps> = ({
  id,
  productName,
  imgSource,
  prices,
  rating = 0,
  description,
  currency,
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  // Construct the product object with the updated type
  const product: Product = {
    id,
    productName,
    imgSource,
    prices,
    rating,
    description, // Pass description to the product object
  };

  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantity: 1, // Default quantity
        currency,
      })
    );
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
  };

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
          productName={product.productName}
          imgSource={product.imgSource}
          prices={product.prices}
          rating={product.rating}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          isInCart={isInCart}
          currency={currency}
          fetchImageWithTimeout={fetchImageWithTimeout}
          description={product.description} // Pass description to ProductCard
        />
      )}
    </>
  );
};


export default ProductPageClient;
