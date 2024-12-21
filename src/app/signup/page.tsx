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
    <div className="auth-container bg-gray-100 dark:bg-gray-900 flex flex-col transition-all duration-500">
      <div className="flex-grow flex justify-center items-center">
        <SignUp />
      </div>
    </div>
  );
};

export default Page;
