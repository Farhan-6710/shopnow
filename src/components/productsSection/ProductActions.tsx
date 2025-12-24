import React, { useState } from "react";
import { X, Trash2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { showToast } from "@/config/ToastConfig";

interface ProductActionsProps {
  productName: string;
  handleAddToCart: () => void;
  handleRemoveFromCart: () => void;
  isInCart: boolean;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  handleAddToCart,
  handleRemoveFromCart,
  productName,
  isInCart,
}) => {
  const [loading, setLoading] = useState(false);

  const simulateAction = (action: "add" | "remove") => {
    setLoading(true);
    setTimeout(() => {
      if (action === "add") {
        handleAddToCart();
      } else if (action === "remove") {
        handleRemoveFromCart();
        showToast({
          type: "custom",
          title: "Item Removed",
          description: `${productName} removed from cart`,
          icon: Trash2,
        });
      }
      setLoading(false);
    }, 300);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {!isInCart ? (
        <Button
          onClick={() => simulateAction("add")}
          disabled={loading}
          className="min-w-[150px] rounded-lg bg-primary text-primary-foreground transition-all duration-200"
          aria-label={`Add ${productName} to cart`}
        >
          {loading ? <Spinner className="size-4" /> : "Add to Cart"}
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            className="min-w-[160px] rounded-lg font-bold opacity-100 cursor-default"
          >
            {loading ? <Spinner className="size-4" /> : "Added to Cart"}
          </Button>

          <Button
            variant="destructive"
            size="icon"
            onClick={() => simulateAction("remove")}
            disabled={loading}
            className="rounded-lg h-9 w-9 flex items-center justify-center transition-all duration-200"
            aria-label={`Remove ${productName} from cart`}
          >
            <X size={20} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductActions;
