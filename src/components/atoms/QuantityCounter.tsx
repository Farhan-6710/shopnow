import { Button } from "@/components/ui/button";
import { Spinner } from "../ui/spinner";

interface QuantityCounterProps {
  quantity: number;
  itemName: string;
  loading?: boolean;
  disabled?: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
}

const QuantityCounter = ({
  quantity,
  itemName,
  loading,
  disabled,
  onIncrement,
  onDecrement,
}: QuantityCounterProps) => {
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
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            onDecrement();
          }}
          disabled={quantity <= 1 || loading || disabled}
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
            {loading ? <Spinner className="size-4" /> : quantity}
          </span>
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            onIncrement();
          }}
          disabled={loading || disabled}
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
