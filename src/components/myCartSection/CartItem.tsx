import Image from "next/image";
import type { CartItem as CartItemType } from "@/types/cartItems";
import Link from "next/link";
import { useCartManagement } from "@/hooks/useCartManagement";
import ProductActions from "../productsSection/ProductActions";

interface CartItemProps {
  item: CartItemType;
  index: number;
  length: number;
  currency: "USD" | "INR";
}

const CartItem = ({ item, index, length, currency }: CartItemProps) => {
  const {
    isInCart,
    quantity,
    isAdding,
    isRemoving,
    isUpdating,
    handleAddToCart,
    handleRemoveFromCart,
    handleIncrementQuantity,
    handleDecrementQuantity,
  } = useCartManagement(item);

  return (
    <>
      <Link
        href={`/products/${encodeURIComponent(item.name)}`}
        className={`flex flex-col xs:flex-row items-center justify-between px-4 md:px-8 py-4 h-fit ${
          length > 1 && index === 0 ? "border-t border-x" : "border"
        }`}
        aria-label={`View details for ${item.name}`}
      >
        <div className="relative flex justify-center items-center w-28 xs:w-24 h-24">
          <Image
            src={item.imgSource}
            alt={item.name}
            width={1000}
            height={800}
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded"
            priority
          />
        </div>
        <div className="flex flex-col justify-center items-center xs:items-start w-full xs:w-8/12 xs:pl-4 mt-4 xs:mt-0">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {item.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {currency === "USD"
              ? `$${(item.prices.USD * item.quantity).toFixed(2)}`
              : `₹${(item.prices.INR * item.quantity).toFixed(2)}`}
          </p>
        </div>
        <div className="flex flex-col xs:flex-row items-center xs:space-x-4 xs:w-auto mt-4 xs:mt-0">
          <ProductActions
            itemName={item.name}
            quantity={quantity}
            isInCart={isInCart}
            isAdding={isAdding}
            isRemoving={isRemoving}
            isUpdating={isUpdating}
            onAddToCart={handleAddToCart}
            onRemove={handleRemoveFromCart}
            onIncrement={handleIncrementQuantity}
            onDecrement={handleDecrementQuantity}
          />
        </div>
      </Link>
    </>
  );
};

export default CartItem;
