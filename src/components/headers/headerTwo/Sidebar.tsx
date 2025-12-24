"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  MapPin,
  Mail,
  Phone,
  Linkedin,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { useTheme } from "next-themes";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use theme for accurate theme detection
  const logoSrc =
    mounted && theme === "dark"
      ? "/images/logo-dark.png"
      : "/images/logo-light.png";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        (event.target as HTMLElement).closest(".sidebar") ||
        (event.target as HTMLElement).closest(".menu-icon")
      ) {
        return;
      }
      onClose();
    };

    const handleScrollLock = () => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    handleScrollLock();

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <div>
      {/* sidebar content */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-background text-primaryDarkTwo text-foreground transform transition-transform duration-300 ease-in-out border-r ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sidebar z-50 overflow-y-auto`}
      >
        <div className="flex items-center justify-center bg-background py-10 px-3">
          <Image
            key={logoSrc}
            src={logoSrc}
            alt="Logo"
            width={220}
            height={100}
            style={{ width: "auto", height: "auto" }} // Ensure aspect ratio is maintained
            priority
          />
        </div>
        <hr className="border mb-2" />
        <div className="p-4 px-6 mb-4">
          <h2 className="text-lg font-semibold">About SHOPNOW</h2>
          <p className="mt-2 text-xs">
            SHOPNOW offers a wide range of branded t-shirts, shoes, and more.
            Our mission is to provide high-quality products with exceptional
            customer service. Explore our collection and find your style today!
          </p>
        </div>
        <hr className="border mb-2" />
        <div className="p-4 px-6 mb-4">
          <h2 className="text-lg font-semibold">Contact Us</h2>
          <ul className="mt-2 space-y-2">
            <li className="flex items-center space-x-2">
              <MapPin
                className="text-primaryDarkTwo dark:text-gray-200"
                size={16}
              />
              <span className="text-sm">123 Street, Trend City, TX</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail
                className="text-primaryDarkTwo dark:text-gray-200"
                size={16}
              />
              <a
                href="mailto:contact@shopnow.com"
                className="text-sm hover:underline"
              >
                contact@shopnow.com
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <Phone
                className="text-primaryDarkTwo dark:text-gray-200"
                size={16}
              />
              <span className="text-sm">+1 (123) 456-7890</span>
            </li>
          </ul>
        </div>
        <hr className="border mb-1" />
        <div className="flex justify-center space-x-4 p-4">
          <a
            href="#"
            className="text-primaryDarkTwo dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <FaFacebookF size={24} />
          </a>
          <a
            href="#"
            className="text-primaryDarkTwo dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="#"
            className="text-primaryDarkTwo dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="#"
            className="text-primaryDarkTwo dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <Linkedin size={24} />
          </a>
        </div>
      </div>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => onClose()}
        aria-hidden="true"
      ></div>
    </div>
  );
};

export default Sidebar;
