// app/cart/page.tsx

import React from "react";
import MyCart from "@/components/myCartSection/MyCart"; // Adjust the path if necessary

const MyCartPage: React.FC = () => {
  return (
    <main aria-label="Shopping cart">
      <MyCart />
    </main>
  );
};

export default MyCartPage;
