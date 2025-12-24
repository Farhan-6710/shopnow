"use client";

import React, { useState } from "react";
import Header from "../components/headers/Header";
import Footer from "@/components/footers/Footer";
import FooterTwo from "@/components/footers/FooterTwo";
import ScrollToTop from "@/components/extras/ScrollToTop";
import ModeToggle from "@/components/extras/ModeToggle";
import AppProviders from "../redux/AppProviders";
import { Toaster } from "@/components/ui/sonner";

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
      <Toaster position="bottom-center" />
    </AppProviders>
  );
}
