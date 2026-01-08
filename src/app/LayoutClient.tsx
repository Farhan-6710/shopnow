"use client";

import React, { useState } from "react";
import Header from "../components/headers/Header";
import AppProviders from "../providers/AppProviders";
import { Toaster } from "@/components/ui/sonner";
import ModeToggle from "@/components/shared/ModeToggle";
import FooterTwo from "@/components/footers/FooterTwo";
import ScrollToTop from "@/components/shared/ScrollToTop";
import Footer from "@/components/footers/Footer";

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
      {children}
      <Footer />
      <FooterTwo />
      <ScrollToTop />
      <Toaster position="top-center" />
    </AppProviders>
  );
}
