import CartItem from "./CartItem";
import { CartItem as CartItemType } from "@/types/cartItems";

interface CartItemListProps {
  cartItems: CartItemType[];
  currency: "USD" | "INR";
}

import { motion } from "framer-motion";

const CartItemList = ({ cartItems, currency }: CartItemListProps) => {
  return (
    <>
      {cartItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: index * 0.1, ease: "easeOut" }}
        >
          <CartItem
            index={index}
            length={cartItems.length}
            item={item}
            currency={currency}
          />
        </motion.div>
      ))}
    </>
  );
};

export default CartItemList;
