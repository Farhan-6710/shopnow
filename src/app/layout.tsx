"use client";

// app/layout.tsx or app/layout.js
import "./globals.css";
import { Inter, Cinzel } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from "react-redux";
import { store } from "@/src/redux/store";
import { ThemeProvider } from "@/src/components/extras/ThemeProvider";
import HeaderOne from "@/src/components/headers/headerOne/HeaderOne";
import HeaderTwo from "@/src/components/headers/headerTwo/HeaderTwo";
import Sidebar from "@/src/components/headers/headerTwo/Sidebar";
import Footer from "@/src/components/footers/Footer";
import FooterTwo from "@/src/components/footers/FooterTwo";
import ScrollToTop from "@/src/components/extras/ScrollToTop";
import ModeToggle from "@/src/components/extras/ModeToggle";
import React, { useState } from "react";
import Head from "next/head";
import ReduxProvider from "../redux/provider";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });
const cinzel = Cinzel({ weight: "400", style: "normal", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en" className={`${inter.className} ${cinzel.className}`}>
      <Head>
        <link rel="icon" href="/images/favicon.ico" />
        {/* Add other meta tags and link tags here */}
      </Head>
      <body>
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <header className="fixed z-50 w-full">
              <HeaderOne />
              <HeaderTwo
                onMenuClick={() => setSidebarOpen(true)}
                onSearchSelect={() => {}}
              />
            </header>
            <div className="header-placeholder"></div>
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
            <div
              className={`fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm transition-opacity duration-300 z-40 ${
                isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            ></div>
            <ModeToggle />
            <main>{children}</main>
            <Footer />
            <FooterTwo />
            <ScrollToTop />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
