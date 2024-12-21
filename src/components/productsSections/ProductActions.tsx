import React from "react";
import { X } from "lucide-react";

interface ProductActionsProps {
  isInCartState: boolean;
  addToCart?: () => void;
  removeFromCart?: () => void;
  handleAddToCart: () => void;
  handleRemoveFromCart: () => void;
  isDarkMode: boolean;
  productName: string;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  isInCartState,
  addToCart,
  removeFromCart,
  handleAddToCart,
  handleRemoveFromCart,
  isDarkMode,
  productName,
}) => (
  <div className="flex items-center justify-center space-x-2 mt-4">
    {!isInCartState && addToCart && (
      <button
        onClick={handleAddToCart}
        aria-label={`Add ${productName} to cart`}
        className={`px-4 py-2 h-10 rounded transition-all duration-200 ${
          isDarkMode
            ? "border-for-dark bg-gray-700 text-white"
            : "bg-primary text-white"
        }`}
      >
        Add to Cart
      </button>
    )}
    {isInCartState && removeFromCart && (
      <div className="flex items-center space-x-2">
        <span
          className={`px-4 py-2 h-10 rounded bg-secondary text-primary font-bold transition-all duration-200 ${
            isDarkMode ? "dark:text-primaryDark" : ""
          }`}
        >
          Added to Cart
        </span>
        <button
          onClick={handleRemoveFromCart}
          aria-label={`Remove ${productName} from cart`}
          className="p-2 h-10 w-10 rounded bg-red-600 text-white transition-all duration-200 flex items-center justify-center dark:bg-red-600"
        >
          <X size={20} />
        </button>
      </div>
    )}
  </div>
);

export default ProductActions;
