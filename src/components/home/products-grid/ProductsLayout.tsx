"use client";

import React from "react";

interface ProductsLayoutProps {
  children: React.ReactNode;
}

const ProductsLayout = ({ children }: ProductsLayoutProps) => {
  return (
    <main className="main-content bg-background">
      <div className="flex flex-col md:flex-row">{children}</div>
    </main>
  );
};

export default ProductsLayout;
