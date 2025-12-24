"use client";

import React, { useEffect, useState } from "react";
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
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";

const Footer: React.FC = () => {
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
    <footer
      className="bg-card border-t text-foregorund py-8 lg:py-14 transition-colors duration-200"
      role="contentinfo"
    >
      <div className="container mx-auto flex flex-wrap">
        {/* First Column: Logo and Description */}
        <section
          className="w-full lg:w-4/12 flex flex-col justify-between md:justify-normal px-4 cursor-pointer"
          aria-label="Brand information"
        >
          <Image
            key={logoSrc}
            src={logoSrc}
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
        </section>

        {/* Third Column: Newsletter */}
        <section
          className="w-full lg:w-4/12 flex flex-col justify-between md:justify-normal px-4"
          aria-labelledby="about-heading"
        >
          <h3 id="about-heading" className="text-lg font-bold mb-3">
            About Us
          </h3>
          <p className="text-sm mb-4">
            our curated collections are designed to cater to every style. We
            pride ourselves on delivering high-quality products paired with
            exceptional customer service. Discover your next favorite piece with
            us and elevate your wardrobe today! Join our community of fashion
            enthusiasts and stay ahead of the trends with SHOPNOW.
          </p>
        </section>

        {/* Second Column: Contact Information */}
        <section
          className="w-full lg:w-4/12 flex flex-col justify-between md:justify-normal px-4 lg:pl-20"
          aria-labelledby="contact-heading"
        >
          <h3 id="contact-heading" className="text-lg font-bold mb-4">
            Contact Information
          </h3>
          <address className="flex flex-col space-y-2 not-italic">
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
            <nav
              className="flex space-x-4 pt-4 mb-5"
              aria-label="Social media links"
            >
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary text-primary hover:bg-primary hover:text-secondary p-2 duration-200 border border-primary"
                aria-label="Visit our Facebook page"
              >
                <FaFacebookF aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary text-primary hover:bg-primary hover:text-secondary p-2 duration-200 border border-primary"
                aria-label="Visit our Instagram page"
              >
                <FaInstagram aria-hidden="true" />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary text-primary hover:bg-primary hover:text-secondary p-2 duration-200 border border-primary"
                aria-label="Visit our Twitter page"
              >
                <FaTwitter aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary text-primary hover:bg-primary hover:text-secondary p-2 duration-200 border border-primary"
                aria-label="Visit our LinkedIn page"
              >
                <FaLinkedinIn aria-hidden="true" />
              </a>
            </nav>
          </address>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
