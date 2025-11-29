"use client";

import React, { useState } from "react";
import Header from "../components/headers/Header";
import Footer from "@/src/components/footers/Footer";
import FooterTwo from "@/src/components/footers/FooterTwo";
import ScrollToTop from "@/src/components/extras/ScrollToTop";
import ModeToggle from "@/src/components/extras/ModeToggle";
import AppProviders from "../redux/AppProviders";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AppProviders>
      <Header isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <ModeToggle />
      <main>{children}</main>
      <Footer />
      <FooterTwo />
      <ScrollToTop />
    </AppProviders>
  );
}
