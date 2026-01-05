"use client";

import React from "react";

const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="main-content bg-background transition-colors duration-200">
      <div className="max-w-screen-3xl mx-auto pt-0">
        <div className="flex flex-col md:flex-row">{children}</div>
      </div>
    </main>
  );
};

export default ProductsLayout;
