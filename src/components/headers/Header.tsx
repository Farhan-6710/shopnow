import { useRef, FC, useLayoutEffect } from "react";
import HeaderOne from "./headerOne/HeaderOne";
import HeaderTwo from "./headerTwo/HeaderTwo";
import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import("./headerTwo/Sidebar"), {
  ssr: false,
});
import { motion } from "framer-motion";

interface HeaderProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}
const Header: FC<HeaderProps> = ({ isSidebarOpen, setSidebarOpen }) => {
  const headerRef = useRef<HTMLElement | null>(null);
  const headerPlaceholderRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!headerRef.current || !headerPlaceholderRef.current) return;

    const headerHeight = headerRef.current.offsetHeight;
    headerPlaceholderRef.current.style.height = `${headerHeight}px`;

    // Set CSS variable for use in other components
    document.documentElement.style.setProperty(
      "--header-height",
      `${headerHeight}px`,
    );
  }, []);

  return (
    <>
      <motion.header
        ref={headerRef}
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
      <div ref={headerPlaceholderRef}></div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Header;
