import React from "react";
import HeaderOne from "./headerOne/HeaderOne";
import HeaderTwo from "./headerTwo/HeaderTwo";
import Sidebar from "./headerTwo/Sidebar";

interface HeaderProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, setSidebarOpen }) => {
  return (
    <>
      <header className="fixed z-50 w-full">
        <HeaderOne />
        <HeaderTwo
          onMenuClick={() => setSidebarOpen(true)}
          onSearchSelect={() => {}}
        />
      </header>
      <div className="header-placeholder"></div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div
        className={`fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      ></div>
    </>
  );
};

export default Header;
