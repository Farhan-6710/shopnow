import React from "react";
import HeaderOne from "./headerOne/HeaderOne";
import HeaderTwo from "./headerTwo/HeaderTwo";
import Sidebar from "./headerTwo/Sidebar";
import { motion } from "framer-motion";

interface HeaderProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}
const Header: React.FC<HeaderProps> = ({ isSidebarOpen, setSidebarOpen }) => {
  return (
    <>
      <header
        className="fixed z-30 w-screen"
      >
        <HeaderOne />
        <HeaderTwo onMenuClick={() => setSidebarOpen(true)} />
      </header>
      <div className="header-placeholder"></div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Header;
