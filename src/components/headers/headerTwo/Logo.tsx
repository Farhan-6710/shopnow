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
      <button
        onClick={handleClick}
        className="flex items-center relative my-1.5 md:my-0.5 cursor-pointer"
        aria-label="Go to homepage"
      >
        <Image
          src="/images/logo-light.png"
          alt="Logo"
          width={200}
          height={30}
          priority
          className="block dark:hidden"
        />
        <Image
          src="/images/logo-dark.png"
          alt="Logo"
          width={200}
          height={30}
          priority
          className="hidden dark:block"
        />
      </button>
      <button
        className="md:hidden flex items-center ring-2 ring-border rounded-md ml-6 p-1.5 cursor-pointer"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu className="text-muted-foreground" size={18} />
      </button>
    </div>
  );
};

export default Logo;
