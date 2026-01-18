"use client";

import React from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useNavigation } from "@/providers/NavigationProvider";

interface LogoProps {
  onMenuClick: () => void;
}

const Logo: React.FC<LogoProps> = ({ onMenuClick }) => {
  const { transitionTo } = useNavigation();
  const pathname = usePathname();

  const handleClick = () => {
    if (pathname === "/") {
      // If already on the home page, scroll to the top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Otherwise, navigate to the home page
      transitionTo("/");
    }
  };

  return (
    <div className="flex justify-between items-center gap-4 w-full">
      {/* Logo Button */}
      <button
        onClick={handleClick}
        className="inline-flex shrink-0 cursor-pointer transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
        aria-label="Go to homepage"
      >
        <Image
          src="/images/logo-light.png"
          alt="ShopNow"
          width={187}
          height={40}
          priority
          className="block dark:hidden h-10 w-auto"
        />
        <Image
          src="/images/logo-dark.png"
          alt="ShopNow"
          width={187}
          height={40}
          priority
          className="hidden dark:block h-10 w-auto"
        />
      </button>

      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className="md:hidden inline-flex items-center justify-center p-2 rounded-md border border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Open navigation menu"
        aria-expanded="false"
      >
        <Menu className="size-5" />
      </button>
    </div>
  );
};

export default Logo;
