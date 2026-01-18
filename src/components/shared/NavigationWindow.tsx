"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { NAVIGATION_WINDOW_ANIMATION as ANIM } from "@/constants/animations";

interface NavigationWindowProps {
  isNavigating: boolean;
}

export const NavigationWindow = ({ isNavigating }: NavigationWindowProps) => {
  const [openShutters, setOpenShutters] = useState(false);
  const [isFinished, setIsFinished] = useState(true);

  useEffect(() => {
    if (isNavigating) {
      setIsFinished(false);
      setOpenShutters(false);
    } else {
      if (!isFinished) {
        const shutterTimer = setTimeout(
          () => setOpenShutters(true),
          ANIM.SHUTTER_OPEN_DELAY_MS
        );
        const cleanupTimer = setTimeout(
          () => setIsFinished(true),
          ANIM.CLEANUP_DELAY_MS
        );

        return () => {
          clearTimeout(shutterTimer);
          clearTimeout(cleanupTimer);
        };
      }
    }
  }, [isNavigating, isFinished]);

  if (isFinished && !isNavigating) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col pointer-events-none">
      {/* Upper Shutter - Slides down from top */}
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: openShutters ? "-100%" : "0%" }}
        transition={{
          duration: ANIM.SHUTTER.DURATION,
          ease: ANIM.SHUTTER.EASE,
        }}
        className="relative flex-1 bg-background w-full border-b border-border"
      >
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: openShutters ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-background/20"
        />
      </motion.div>

      {/* Lower Shutter - Slides up from bottom */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: openShutters ? "100%" : "0%" }}
        transition={{
          duration: ANIM.SHUTTER.DURATION,
          ease: ANIM.SHUTTER.EASE,
        }}
        className="relative flex-1 bg-background w-full border-t border-border"
      />

      {/* Logo and Line - Show immediately when shutters close and delay complete, animate out after navigation */}
      {!isFinished && !isNavigating && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          {/* Horizontal Line - Expands left and right */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100vw", opacity: 0 }}
            transition={{
              width: {
                delay: ANIM.LINE.WIDTH_DELAY,
                duration: ANIM.LINE.DURATION,
                ease: "easeInOut",
              },
              opacity: { delay: ANIM.LINE.OPACITY_DELAY, duration: 0.2 },
            }}
            className="absolute h-[2px] bg-foreground"
          />

          {/* Logo - Scales and rotates in, then scales out */}
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -25 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{
              scale: { duration: ANIM.LOGO.ENTER_DURATION, ease: "backOut" },
              opacity: { duration: 0.4 },
              rotate: { duration: ANIM.LOGO.ENTER_DURATION, ease: "backOut" },
            }}
            className="relative z-10"
          >
            <motion.div
              animate={{ scale: 0, opacity: 0 }}
              transition={{
                delay: ANIM.LOGO.EXIT_DELAY,
                duration: ANIM.LOGO.EXIT_DURATION,
              }}
              className="w-60 h-60 bg-background rounded-full flex items-center justify-center border-4 border-border shadow-[0_0_60px_rgba(255,255,255,0.3)]"
            >
              <Image
                width={1024}
                height={1024}
                alt="logo"
                src="/images/shopnow-favicon.png"
                className="w-60 h-60 object-contain"
              />
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
