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
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
        className="fixed z-30 w-screen"
      >
        <HeaderOne />
        <HeaderTwo onMenuClick={() => setSidebarOpen(true)} />
      </motion.header>
      <div className="header-placeholder"></div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Header;
