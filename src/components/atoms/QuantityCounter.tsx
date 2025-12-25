import { Button } from "@/components/ui/button";

interface QuantityCounterProps {
  quantity: number;
  itemName: string;
  onIncrement: () => void;
  onDecrement: () => void;
}

const QuantityCounter = ({
  quantity,
  itemName,
  onIncrement,
  onDecrement,
}: QuantityCounterProps) => {
  const handleDecrease = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (quantity > 1) {
      onDecrement();
    }
  };

  const handleIncrease = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onIncrement();
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className="inline-flex rounded-md shadow-sm"
        role="group"
        aria-label={`Quantity controls for ${itemName}`}
      >
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={handleDecrease}
          disabled={quantity <= 1}
          className="rounded-r-none border-r-0 bg-card"
          aria-label={`Decrease quantity of ${itemName}`}
        >
          -
        </Button>

        <div
          className="inline-flex items-center justify-center border-y bg-background px-4 min-w-12 text-sm font-semibold cursor-auto border-x"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <span aria-live="polite" aria-label={`Quantity: ${quantity}`}>
            {quantity}
          </span>
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={handleIncrease}
          className="rounded-l-none border-l-0 bg-card"
          aria-label={`Increase quantity of ${itemName}`}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default QuantityCounter;
