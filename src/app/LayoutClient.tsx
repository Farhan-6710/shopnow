"use client";

import React, { useState, lazy, Suspense } from "react";
import Header from "../components/headers/Header";
import AppProviders from "../providers/AppProviders";
import { Toaster } from "@/components/ui/sonner";

// Lazy load heavy components that are not immediately visible
const Footer = lazy(() => import("@/components/footers/Footer"));
const FooterTwo = lazy(() => import("@/components/footers/FooterTwo"));
const ScrollToTop = lazy(() => import("@/components/extras/ScrollToTop"));
const ModeToggle = lazy(() => import("@/components/extras/ModeToggle"));

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AppProviders>
      <Header isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Suspense fallback={null}>
        <ModeToggle />
      </Suspense>
      {children}
      <Suspense fallback={<div className="h-32" />}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <FooterTwo />
      </Suspense>
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
      <Toaster position="top-center" />
    </AppProviders>
  );
}
