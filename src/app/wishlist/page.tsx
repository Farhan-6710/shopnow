// app/wishlist/page.tsx

import React from "react";
import WishlistSection from "@/components/wishlist/WishlistSection";

const WishlistPage: React.FC = () => {
  return (
    <main aria-label="Wishlist">
      <WishlistSection />
    </main>
  );
};

export default WishlistPage;
