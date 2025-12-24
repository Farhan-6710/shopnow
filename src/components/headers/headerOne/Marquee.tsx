"use client";

import React, { useState, useEffect } from "react";

const Marquee: React.FC = () => {
  const [isMarqueeVisible, setMarqueeVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMarqueeVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="marquee-container hidden lg:flex items-center flex-1 justify-center">
      <div
        className={`marquee ${
          isMarqueeVisible ? "opacity-100" : "opacity-0"
        } transition-opacity duration-1000`}
      >
        <p className="text-xl px-4 py-2 font-semibold text-foreground">
          Grab the instant 10% off on coupon code &apos;SHOPNOW10&apos;
        </p>
      </div>
    </div>
  );
};

export default Marquee;
