"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store"; // Adjust if necessary
import { useTheme } from "next-themes";

interface CartButtonProps {
  cartCount: number;
}

const CartButton: React.FC<CartButtonProps> = ({ cartCount }) => {
  const router = useRouter();
  const { theme } = useTheme(); // Get the current theme (light or dark)

  const handleClick = () => {
    router.push("/cart");
  };

  const strokeWidth = theme === "dark" ? 3 : 2.5;

  return (
    <div className="CartButton hidden md:flex flex-col justify-center items-center text-center md:text-right md:w-3/12">
      <div className="relative">
        <button
          onClick={handleClick}
          className="flex items-center bg-primary text-white font-bold text-2xl border-none rounded-none px-5 py-3 dark:bg-secondary dark:text-primary transition-colors duration-200"
        >
          <div className="relative">
            <ShoppingCart
              className="text-white dark:text-primary"
              size={30}
              strokeWidth={strokeWidth}
            />
            {cartCount > 0 && (
              <span className="absolute top-1 -right-5 flex items-center justify-center w-6 h-6 bg-red-600 text-white text-sm font-bold rounded-full border-2 border-white -translate-x-1/2 -translate-y-1/2 dark:bg-red-600 dark:border-none">
                {cartCount}
              </span>
            )}
          </div>
          <span className="ml-4 text-white dark:text-primary dark:font-extrabold">
            My Cart
          </span>
        </button>
      </div>
    </div>
  );
};

export default CartButton;
