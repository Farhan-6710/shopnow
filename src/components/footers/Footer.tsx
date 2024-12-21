"use client";

import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import Image from "next/image";
import { useRouter , usePathname } from "next/navigation";


const Footer: React.FC = () => {
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
    <footer className="bg-primary dark:bg-primaryDark dark:border-t-2 dark:border-gray-800 text-white py-8 lg:py-14 transition-colors duration-200">
      <div className="container mx-auto flex flex-wrap">
        {/* First Column: Logo and Description */}
        <div className="w-full lg:w-4/12 flex flex-col justify-between md:justify-normal px-4 cursor-pointer">
          <Image
            src="/images/Logo.jpg"
            alt="Logo"
            width={256}
            height={64}
            className="logo-image"
            onClick={handleClick}
            priority
          />
          <p className="text-sm mt-6 mb-4">
            At SHOPNOW, we offer an extensive selection of branded clothing,
            bags, shoes, accessories, purses, and sandals. Whether you&apos;re
            looking for the latest fashion trends or timeless classics,
          </p>
        </div>

        {/* Third Column: Newsletter */}
        <div className="w-full lg:w-4/12 flex flex-col justify-between md:justify-normal px-4">
          <h3 className="text-lg font-bold mb-3">About Us</h3>
          <p className="text-sm mb-4">
            our curated collections are designed to cater to every style. We
            pride ourselves on delivering high-quality products paired with
            exceptional customer service. Discover your next favorite piece with
            us and elevate your wardrobe today! Join our community of fashion
            enthusiasts and stay ahead of the trends with SHOPNOW.
          </p>
        </div>

        {/* Second Column: Contact Information */}
        <div className="w-full lg:w-4/12 flex flex-col justify-between md:justify-normal px-4 lg:pl-20">
          <h3 className="text-lg font-bold mb-4">Contact Information</h3>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              <span>123 Street, Trend City, TX</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-2" />
              <span>contact@shopnow.com</span>
            </div>
            <div className="flex items-center">
              <FaPhone className="mr-2" />
              <span>+1 (123) 456-7890</span>
            </div>
            <div className="flex space-x-4 pt-4 mb-5">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary p-2"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary p-2"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary p-2"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary p-2"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
