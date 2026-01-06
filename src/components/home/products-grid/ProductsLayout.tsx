"use client";

import React from "react";

const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="main-content bg-background">
      <div className="flex flex-col md:flex-row">{children}</div>
    </main>
  );
};

export default ProductsLayout;
