"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes"; // Import useTheme hook

interface LogoProps {
  onMenuClick: () => void;
}

const Logo: React.FC<LogoProps> = ({ onMenuClick }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { theme } = useTheme(); // Get the current theme (dark or light)
  const [logoSrc, setLogoSrc] = useState<string>("/images/Logo.jpg");

  useEffect(() => {
    // Update the logo source based on the theme
    setLogoSrc(theme === "dark" ? "/images/Logo-dark.png" : "/images/Logo.jpg");
  }, [theme]);

  const handleClick = () => {
    if (pathname === "/") {
      // If already on the home page, scroll to the top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Otherwise, navigate to the home page
      router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-between md:w-3/12">
      <div
        onClick={handleClick}
        className="flex title-font font-medium items-center text-primary dark:text-gray-100 my-2 md:my-1 cursor-pointer"
      >
        <div className="flex items-center logo-container">
          <Image
            src={logoSrc}
            alt="Logo"
            width={225}
            height={45} // Fixed height value
            priority
            className="logo-image"
          />
        </div>
      </div>
      <div
        className="md:hidden flex items-center ring-2 ring-gray-300 dark:ring-gray-600 rounded-md ml-8 p-2 cursor-pointer"
        onClick={onMenuClick}
      >
        <Menu className="text-white dark:text-white text-lg" />
      </div>
    </div>
  );
};

export default Logo;
