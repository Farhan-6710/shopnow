"use client"; // Ensure this is a client component

import React, { useState } from "react";
import SignUp from "@/app/signup/SignUp"; // Adjust the path if necessary

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
      aria-label="Sign up page"
    >
      <div className="flex justify-center items-center">
        <SignUp />
      </div>
    </main>
  );
};

export default Page;
