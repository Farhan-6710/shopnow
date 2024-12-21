"use client";

import React, { useState, useEffect, useRef } from "react";
import { Inter } from "next/font/google";
import HeaderOne from "@/src/components/headers/headerOne/HeaderOne";
import HeaderTwo from "@/src/components/headers/headerTwo/HeaderTwo";
import Sidebar from "@/src/components/headers/headerTwo/Sidebar";
import Footer from "@/src/components/footers/Footer"; // Import the Footer component
import FooterTwo from "@/src/components/footers/FooterTwo";
import ScrollToTop from "@/src/components/extras/ScrollToTop"; // Import the ScrollToTop component
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Provider, useSelector } from "react-redux";
import ModeToggle from "@/src/components/extras/ModeToggle"; // Adjust the import path as necessary
import "@fortawesome/fontawesome-free/css/all.min.css";
import { RootState, store } from "@/src/store"; // Import RootState and store
import Head from 'next/head'; // Import Head from next/head
import { Cinzel } from "next/font/google"; // Import the Cinzel font

// Configure Font Awesome to prevent automatic CSS injection
config.autoAddCss = false;

// Initialize the Inter font
const inter = Inter({ subsets: ["latin"] });

const cinzel = Cinzel({weight:"400", style:"normal", subsets: ["latin"] });

// Component to apply theme class based on Redux state
const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <>{children}</>;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    const debounce = (func: Function, delay: number) => {
      let timer: NodeJS.Timeout;
      return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func();
        }, delay);
      };
    };

    const handleScroll = debounce(() => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 150) {
        setIsSticky(true);
      } else if (scrollPosition === 0) {
        setIsSticky(false);
      }
    }, 10);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Provider store={store}>
      <html lang="en">
        <Head>
          <link rel="icon" href="/images/favicon.ico" />
          {/* Add any other head tags here */}
        </Head>
        <body className={`${inter.className} ${cinzel.className}`}>
          <ThemeWrapper>
            <div className="dark:bg-gray-900">
              <header
                className={`header ${isSticky ? "sticky" : ""}`}
                ref={headerRef}
              >
                <HeaderOne />
                <HeaderTwo
                  onMenuClick={openSidebar}
                  onSearchSelect={(productName: string) => {
                    // Implement search selection handling here if needed
                  }}
                />
              </header>
              <div
                className={`header-placeholder ${
                  isSticky ? "visible" : "hidden"
                }`}
              ></div>
              <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
              <div
                className={`fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm transition-opacity duration-300 z-40 ${
                  isSidebarOpen
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
                onClick={closeSidebar}
                aria-hidden="true"
              ></div>
              <ModeToggle /> {/* Place ModeToggle after Sidebar */}
              <main>{children}</main>
              <Footer />
              <FooterTwo />
              <ScrollToTop /> {/* Add the ScrollToTop component here */}
            </div>
          </ThemeWrapper>
        </body>
      </html>
    </Provider>
  );
}
