"use client";

import React from "react";
import { Product } from "@/types/product";
import WishlistItem from "./WishlistItem";

interface WishlistItemListProps {
  items: Product[];
}

const WishlistItemList: React.FC<WishlistItemListProps> = ({
  items,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item) => (
        <WishlistItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default WishlistItemList;
