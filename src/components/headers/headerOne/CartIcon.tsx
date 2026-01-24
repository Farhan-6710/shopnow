import { ShoppingCart } from "lucide-react";
import { TransitionLink } from "@/components/shared/TransitionLink";
import { useSelector } from "react-redux";
import { selectCartCount } from "@/redux/cart/cartSlice";

const CartIcon = () => {
  const cartCount = useSelector(selectCartCount);
  return (
    <TransitionLink
      href="/cart"
      aria-label={`Shopping cart with ${cartCount} items`}
    >
      <ShoppingCart
        className="text-primary dark:text-gray-200 transition-all duration-200"
        size={20}
        strokeWidth={2.5}
        aria-hidden="true"
      />
      {cartCount > 0 && (
        <span
          className="absolute top-0 -right-5 flex items-center justify-center w-5 h-5 bg-red-600 text-white text-[10px] font-medium rounded-full border-2 border-white -translate-x-1/2 -translate-y-1/2"
          aria-label="Cart item count"
        >
          {cartCount}
        </span>
      )}
    </TransitionLink>
  );
};

export default CartIcon;
