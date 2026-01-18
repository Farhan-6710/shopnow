"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearWishlistRequest,
  selectWishlistItems,
  selectWishlistItemsDict,
} from "@/redux/slices/wishlistSlice";
import WishlistEmpty from "./WishlistEmpty";
import WishlistItemList from "./WishlistItemList";
import WishlistHeader from "./WishlistHeader";
import WishlistSkeleton from "../skeletons/WishlistSkeleton";
import { selectWishlistSyncing } from "@/redux/wishlist/wishlistSlice";

const WishlistSection: React.FC = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);
  const wishlistItemsDict = useSelector(selectWishlistItemsDict);
  const isEmpty = wishlistItems.length === 0;
  const isWishlistSyncing = useSelector(selectWishlistSyncing);
  const [isLoading, setIsLoading] = useState(true);

  // Show skeleton for 300ms on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleClearAll = () => {
    dispatch(clearWishlistRequest(wishlistItemsDict));
  };

  // Show skeleton during loading
  if (isLoading || isWishlistSyncing) {
    return <WishlistSkeleton />;
  }

  return (
    <section
      className="bg-background transition-colors duration-300 min-h-[60vh]"
      aria-labelledby="wishlist-heading"
    >
      <div className="container mx-auto px-4 lg:px-20 py-8">
        <WishlistHeader
          itemCount={wishlistItems.length}
          onClearAll={handleClearAll}
          isEmpty={isEmpty}
        />

        {isEmpty ? (
          <WishlistEmpty />
        ) : (
          <WishlistItemList items={wishlistItems} />
        )}
      </div>
    </section>
  );
};

export default WishlistSection;
