import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Oval } from "react-loader-spinner"; // Import the Oval loader from react-loader-spinner

interface ProductActionsProps {
  isInCartState: boolean;
  addToCart?: () => void;
  removeFromCart?: () => void;
  handleAddToCart: () => void;
  handleRemoveFromCart: () => void;
  productName: string;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  isInCartState,
  addToCart,
  removeFromCart,
  handleAddToCart,
  handleRemoveFromCart,
  productName,
}) => {
  const [loading, setLoading] = useState(false);

  // Simulate loading timeout logic
  const simulateAction = (action: "add" | "remove") => {
    setLoading(true);
    setTimeout(() => {
      if (action === "add") {
        handleAddToCart();
      } else if (action === "remove") {
        handleRemoveFromCart();
      }
      setLoading(false);
    }, 300); // 300 millisecond timeout
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      {/* Add to Cart Button */}
      {!isInCartState && addToCart && (
        <button
          onClick={() => simulateAction("add")}
          aria-label={`Add ${productName} to cart`}
          className="px-4 py-2 h-10 min-w-[150px] rounded transition-all duration-200 dark:border-for-dark dark:bg-gray-700 dark:text-white bg-primary text-white flex items-center justify-center"
        >
          {loading ? (
            <Oval
              height={20}
              width={20}
              color="#ffffff"
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#ffffff"
              strokeWidth={6}
              strokeWidthSecondary={6}
            />
          ) : (
            "Add to Cart"
          )}
        </button>
      )}

      {/* Added to Cart Button with Remove */}
      {isInCartState && removeFromCart && (
        <div className="flex items-center space-x-2">
          <span className="px-4 py-2 h-10 min-w-[160px] rounded bg-secondary text-primary font-bold transition-all duration-200 dark:text-primaryDark flex items-center justify-center">
            {loading ? (
              <Oval
                height={20}
                width={20}
                color="#ffffff"
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#000"
                strokeWidth={7}
                strokeWidthSecondary={7}
              />
            ) : (
              "Added to Cart"
            )}
          </span>

          <button
            onClick={() => simulateAction("remove")}
            aria-label={`Remove ${productName} from cart`}
            className="p-2 h-10 w-10 rounded bg-red-600 text-white transition-all duration-200 flex items-center justify-center dark:bg-red-600"
          >
              <X size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductActions;
