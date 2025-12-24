"use client"; // Ensures this component is rendered on the client side

import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";
import ProductActions from "./ProductActions";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Product } from "@/types/product";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addToCart, removeFromCart } from "@/redux/cart/cartSlice";
import { showToast } from "@/config/ToastConfig";
import { ShoppingCart, Trash2 } from "lucide-react";

interface ProductCardProps {
  product: Product;
  fetchImageWithTimeout: (url: string) => Promise<Blob | null>;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  fetchImageWithTimeout,
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const currency = useSelector((state: RootState) => state.cart.currency);
  const isInCart = cartItems.some((item) => item.id === product.id); // Check if the product is in the cart

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch(addToCart(product));
      showToast({
        type: "custom",
        title: "Added to Cart",
        description: `${product.productName} has been added to your cart`,
        icon: ShoppingCart,
      });
    }
  };

  const handleRemoveFromCart = () => {
    if (isInCart) {
      dispatch(removeFromCart(product.id));
      showToast({
        type: "custom",
        title: "Item Removed",
        description: `${product.productName} removed from cart`,
        icon: Trash2,
      });
    }
  };

  // Display price based on selected currency
  const displayPrice = (currency: "USD" | "INR") => {
    const price = product.prices[currency];
    if (typeof price !== "number" || isNaN(price)) {
      return "0.00"; // Fallback value in case of invalid price
    }
    return price.toFixed(2); // Return price formatted to two decimal places
  };

  const { theme } = useTheme();

  return (
    <article
      className="px-4 md:px-2 p-2 w-full flex flex-col h-full"
      aria-label={`${product.productName} product card`}
    >
      <div className="transition-all duration-200 border-border">
        <div
          className={`product-card border bg-card text-center h-full pt-4 pb-8 overflow-hidden transition-all duration-300 rounded-lg ${
            theme === "dark" ? "shadow-for-dark" : "shadow-for-light"
          }`}
        >
          <Link
            href={`/products/${encodeURIComponent(product.productName)}`}
            className="flex flex-col justify-center items-center "
            aria-label={`View details for ${product.productName}`}
          >
            <ProductImage
              imgSource={product.imgSource}
              alt={product.productName}
              fetchImageWithTimeout={fetchImageWithTimeout}
            />
            <ProductDetails
              productName={product.productName}
              currency={currency}
              displayPrice={displayPrice}
              rating={product.rating ?? 0} // Fallback to 0 if rating is undefined
            />
          </Link>
          <div className="mt-4">
            <ProductActions
              productName={product.productName}
              handleAddToCart={handleAddToCart}
              handleRemoveFromCart={handleRemoveFromCart}
              isInCart={isInCart}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
