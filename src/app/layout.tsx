"use client";

import React, { useState, useEffect, useRef } from "react";
import { Inter } from "next/font/google";
import HeaderOne from "@/src/components/headers/headerOne/HeaderOne";
import HeaderTwo from "@/src/components/headers/headerTwo/HeaderTwo";
import Sidebar from "@/src/components/headers/headerTwo/Sidebar";
import Footer from "@/src/components/footers/Footer";
import FooterTwo from "@/src/components/footers/FooterTwo";
import ScrollToTop from "@/src/components/extras/ScrollToTop"; // Import ScrollToTop component
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Provider } from "react-redux";
import ModeToggle from "@/src/components/extras/ModeToggle";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { store } from "@/src/store";
import Head from "next/head"; // Import Head from next/head
import { Cinzel } from "next/font/google";
import { ThemeProvider } from "../components/extras/ThemeProvider";

// Configure Font Awesome to prevent automatic CSS injection
config.autoAddCss = false;

// Initialize the Inter font
const inter = Inter({ subsets: ["latin"] });

const cinzel = Cinzel({ weight: "400", style: "normal", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <Provider store={store}>
      <html lang="en" suppressHydrationWarning>
        <Head>
          <link rel="icon" href="/images/favicon.ico" />
          {/* Add other meta tags and link tags here */}
        </Head>
        <body className={`${inter.className} ${cinzel.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <header className="fixed z-50 w-full">
              <HeaderOne />
              <HeaderTwo
                onMenuClick={openSidebar}
                onSearchSelect={(productName: string) => {
                  // Implement search selection handling here if needed
                }}
              />
            </header>
            <div className="header-placeholder">

            </div>
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
            <div
              className={`fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm transition-opacity duration-300 z-40 ${
                isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              onClick={closeSidebar}
              aria-hidden="true"
            ></div>
            <ModeToggle /> {/* Place ModeToggle after Sidebar */}
            <main>{children}</main>
            <Footer />
            <FooterTwo />
            <ScrollToTop /> {/* Add ScrollToTop component here */}
          </ThemeProvider>
        </body>
      </html>
    </Provider>
  );
}
