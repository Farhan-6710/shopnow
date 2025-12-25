import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import QuantityCounter from "@/components/atoms/QuantityCounter";

interface ProductActionsProps {
  itemName: string;
  quantity: number;
  isInCart: boolean;
  loading: boolean;
  onAddToCart: () => void;
  onRemove: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

const ProductActions = ({
  itemName,
  quantity,
  isInCart,
  loading,
  onAddToCart,
  onRemove,
  onIncrement,
  onDecrement,
}: ProductActionsProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {!isInCart ? (
        <Button
          onClick={onAddToCart}
          disabled={loading}
          className="min-w-30 rounded-lg text-[14px] bg-primary text-primary-foreground transition-all duration-200"
          aria-label={`Add ${itemName} to cart`}
        >
          {loading ? <Spinner className="size-4" /> : "Add to Cart"}
        </Button>
      ) : (
        <>
          <QuantityCounter
            quantity={quantity}
            itemName={itemName}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />
          <Button
            type="button"
            variant="destructive"
            size="icon-sm"
            onClick={onRemove}
            disabled={loading}
            className="rounded-lg"
            aria-label={`Remove ${itemName} from cart`}
          >
            {loading ? <Spinner className="size-4" /> : <Trash2 size={16} />}
          </Button>
        </>
      )}
    </div>
  );
};

export default ProductActions;
