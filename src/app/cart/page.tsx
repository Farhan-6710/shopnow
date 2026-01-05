// app/cart/page.tsx

import React from "react";
import MyCartSection from "@/components/cart/MyCartSection"; // Adjust the path if necessary

const MyCartPage: React.FC = () => {
  return (
    <main aria-label="Shopping cart">
      <MyCartSection />
    </main>
  );
};

export default MyCartPage;
