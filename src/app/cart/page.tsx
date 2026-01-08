// app/cart/page.tsx

import React from "react";
import CartSection from "@/components/cart/CartSection"; // Adjust the path if necessary

const MyCartPage: React.FC = () => {
  return (
    <main aria-label="Shopping cart">
      <CartSection />
    </main>
  );
};

export default MyCartPage;
