// app/wishlist/page.tsx

import React from "react";
import Wishlist from "@/components/wishlist/Wishlist";

const WishlistPage: React.FC = () => {
  return (
    <main aria-label="Wishlist">
      <Wishlist />
    </main>
  );
};

export default WishlistPage;
