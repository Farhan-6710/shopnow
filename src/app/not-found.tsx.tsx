// app/not-found.tsx

import React from "react";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const NotFound: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1 style={{ fontSize: "2rem", fontFamily: inter.style.fontFamily }}>
        404 - Page Not Found
      </h1>
      <p>Sorry, the page you’re looking for doesn’t exist.</p>
      <Link href="/">
        <a>Go back to Home</a>
      </Link>
    </div>
  );
};

export default NotFound;
