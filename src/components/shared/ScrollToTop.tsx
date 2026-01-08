"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`border border-foreground/40 fixed bottom-4 right-4 md:bottom-8 md:right-8 p-3 rounded-full bg-card hover:bg-background text-foreground shadow-lg transition-opacity duration-300 ease-in-out cursor-pointer ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-label="Scroll to Top"
    >
      <ArrowUp size={24} aria-hidden="true" />
    </button>
  );
};

export default ScrollToTop;
