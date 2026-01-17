import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Box,
  Layers,
  Zap,
  Github,
  Twitter,
  Menu,
} from "lucide-react";
import Image from "next/image";

// --- WindowOpener Component ---
// FIX APPLIED: Stable Wrapper & Delayed Mounting
export const WindowOpener = ({ children }: { children: React.ReactNode }) => {
  // State to control when the actual page content mounts
  const [mountContent, setMountContent] = useState(false);
  // State to control when the overlay is fully removed from DOM
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    // TIMING SYNC:
    // The line animation: delay 0.5s + duration 0.5s = Ends at 1.0s
    // The shutter animation: delay 1.0s

    // 1. Mount the content exactly when the line finishes (1000ms)
    // This ensures the heavy HomePage isn't rendering during the initial dot/line phase.
    const mountTimer = setTimeout(() => {
      setMountContent(true);
    }, 1000);

    // 2. Remove the overlay entirely after animation is done (2.5s)
    // We wait a bit longer than the visual animation to ensure no popping.
    const cleanupTimer = setTimeout(() => {
      setAnimationFinished(true);
    }, 2500);

    return () => {
      clearTimeout(mountTimer);
      clearTimeout(cleanupTimer);
    };
  }, []);

  return (
    // STABILITY FIX: We keep this wrapper permanently.
    // We do NOT return <>{children}</> conditionally, which caused the re-render.
    <div className="relative min-h-screen w-full bg-foreground">
      {/* Main Content Area */}
      {/* Rendered ONLY after 1000ms */}
      {mountContent && <div className="relative z-0">{children}</div>}

      {/* Animation Overlay */}
      {/* Removed from DOM only after everything is finished */}
      {!animationFinished && (
        <div className="fixed inset-0 z-50 flex flex-col pointer-events-none">
          {/* Top Shutter */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{
              duration: 0.8,
              delay: 1.0, // synchronized with mountContent timer
              ease: [0.76, 0, 0.24, 1],
            }}
            className="relative flex-1 bg-background w-full border-b border-border"
          >
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 1.0, duration: 0.2 }}
              className="absolute bottom-0 left-0 right-0 h-[1px] bg-background/20"
            />
          </motion.div>

          {/* Bottom Shutter */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: "100%" }}
            transition={{
              duration: 0.8,
              delay: 1.0, // synchronized with mountContent timer
              ease: [0.76, 0, 0.24, 1],
            }}
            className="relative flex-1 bg-background w-full border-t border-border"
          />

          {/* Central Animation Elements (Logo + Line) */}
          <div className="absolute inset-0 flex items-center justify-center z-50">
            {/* The Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100vw", opacity: 0 }}
              transition={{
                width: { delay: 0.35, duration: 0.5, ease: "easeInOut" },
                opacity: { delay: 1.0, duration: 0.2 },
              }}
              className="absolute h-[2px] bg-foreground"
            />

            {/* The Brand Logo */}
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -25 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                scale: { duration: 0.5, ease: "backOut" },
                opacity: { duration: 0.4 },
                rotate: { duration: 0.5, ease: "backOut" },
              }}
              className="relative z-10"
            >
              <motion.div
                animate={{ scale: 0, opacity: 0 }}
                transition={{ delay: 1.0, duration: 0.3 }}
                className="w-60 h-60 bg-background rounded-full flex items-center justify-center border-4 border-border shadow-[0_0_60px_rgba(255,255,255,0.3)]"
              >
                <Image
                  width={1024}
                  height={1024}
                  alt="logo"
                  src="/images/shopnow-favicon.png"
                  className="w-60 h-60 object-contain"
                />

                {/* <Zap className="w-32 h-32 text-background fill-background" />  */}
                {/* END REPLACEMENT SECTION */}
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};
