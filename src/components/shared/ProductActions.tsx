import React, { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import QuantityCounter from "@/components/shared/QuantityCounter";
import ConfirmationModal from "@/components/modals/ConfirmationModal";

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
  showRemoveConfirmation?: boolean;
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
  showRemoveConfirmation = true,
}: ProductActionsProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleRemoveClick = () => {
    if (showRemoveConfirmation) {
      setShowDeleteModal(true);
    } else {
      onRemove();
    }
  };

  const handleConfirmRemove = () => {
    onRemove();
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="flex items-center justify-center gap-2">
        {!isInCart || isAdding ? (
          <Button
            onClick={onAddToCart}
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
              onClick={handleRemoveClick}
              disabled={isRemoving || isUpdating}
              className="rounded-lg"
              aria-label={`Remove ${itemName} from cart`}
            >
              {isRemoving ? (
                <Spinner className="size-4" />
              ) : (
                <Trash2 size={16} />
              )}
            </Button>
          </>
        )}
      </div>

      {showRemoveConfirmation && (
        <ConfirmationModal
          open={showDeleteModal}
          onOpenChange={setShowDeleteModal}
          title="Remove Item"
          description={`Are you sure you want to remove "${itemName}" from your cart?`}
          icon={Trash2}
          confirmLabel="Remove"
          cancelLabel="Cancel"
          onConfirm={handleConfirmRemove}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
};

export default ProductActions;
