// app/auth/page.tsx
"use client"; // Ensure this is a client component

import React, { useState } from "react";
import Login from "@/app/login/Login"; // Adjust the path if necessary

const Page: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <main
      className="auth-container bg-background flex flex-col transition-all duration-500"
      aria-label="Login page"
    >
      <div className="flex-grow flex justify-center items-center">
        <Login />
      </div>
    </main>
  );
};

export default Page;
