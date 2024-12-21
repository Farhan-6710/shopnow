// app/error.tsx
"use client"

import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const ErrorPage: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1 style={{ fontSize: "2rem", fontFamily: inter.style.fontFamily }}>
        500 - Server Error
      </h1>
      <p>Sorry, something went wrong on our end.</p>
    </div>
  );
};

export default ErrorPage;
