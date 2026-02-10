"use client";

import { Product } from "@/types/product";
import WishlistItem from "./WishlistItem";

interface WishlistItemListProps {
  items: Product[];
}

import { motion } from "framer-motion";

const WishlistItemList = ({ items }: WishlistItemListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2, delay: index * 0.1, ease: "easeOut" }}
          className="h-full"
        >
          <WishlistItem item={item} priority={index < 8} />
        </motion.div>
      ))}
    </div>
  );
};

export default WishlistItemList;
