"use client";

import React from "react";
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
  return (
    <AppProviders>
      <Header />
      <ModeToggle />
      {children}
      <Footer />
      <FooterTwo />
      <ScrollToTop />
      <Toaster position="top-center" />
    </AppProviders>
  );
}
