import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import QuantityCounter from "@/components/atoms/QuantityCounter";

interface ProductActionsProps {
  itemName: string;
  quantity: number;
  isInCart: boolean;
  isAdding: boolean;
  isRemoving: boolean;
  isUpdating: boolean;
  onAddToCart: () => void;
  onRemove: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

const ProductActions = ({
  itemName,
  quantity,
  isInCart,
  isAdding,
  isRemoving,
  isUpdating,
  onAddToCart,
  onRemove,
  onIncrement,
  onDecrement,
}: ProductActionsProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {!isInCart ? (
        <Button
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            onAddToCart();
          }}
          disabled={isAdding || isRemoving || isUpdating}
          className="min-w-30 rounded-lg text-[14px] bg-primary text-primary-foreground transition-all duration-200"
          aria-label={`Add ${itemName} to cart`}
        >
          {isAdding ? <Spinner className="size-4" /> : "Add to Cart"}
        </Button>
      ) : (
        <>
          <QuantityCounter
            quantity={quantity}
            itemName={itemName}
            loading={isUpdating}
            disabled={isUpdating || isRemoving}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />
          <Button
            type="button"
            variant="destructive"
            size="icon-sm"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove();
            }}
            disabled={isRemoving || isUpdating}
            className="rounded-lg"
            aria-label={`Remove ${itemName} from cart`}
          >
            {isRemoving ? <Spinner className="size-4" /> : <Trash2 size={16} />}
          </Button>
        </>
      )}
    </div>
  );
};

export default ProductActions;
