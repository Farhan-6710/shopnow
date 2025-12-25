"use client";

import React from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

interface LogoProps {
  onMenuClick: () => void;
}

const Logo: React.FC<LogoProps> = ({ onMenuClick }) => {
  const router = useRouter();
  const pathname = usePathname();

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
        <div className="flex items-center logo-container relative">
          <Image
            src="/images/logo-light.png"
            alt="Logo"
            width={225}
            height={45}
            priority
            className="logo-image block dark:hidden"
          />
          <Image
            src="/images/logo-dark-v2.png"
            alt="Logo"
            width={225}
            height={45}
            priority
            className="logo-image hidden dark:block"
          />
        </div>
      </div>
      <div
        className="md:hidden flex items-center ring-2 ring-border rounded-md ml-8 p-2 cursor-pointer"
        onClick={onMenuClick}
      >
        <Menu className="text-muted-foreground text-lg" />
      </div>
    </div>
  );
};

export default Logo;
