import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { WINDOW_OPENER_ANIMATION as ANIM } from "@/constants/animations";

export const WindowOpener = ({ children }: { children: React.ReactNode }) => {
  const [mountContent, setMountContent] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    const mountTimer = setTimeout(() => {
      setMountContent(true);
    }, ANIM.MOUNT_CONTENT_DELAY_MS);

    const cleanupTimer = setTimeout(() => {
      setAnimationFinished(true);
    }, ANIM.CLEANUP_DELAY_MS);

    return () => {
      clearTimeout(mountTimer);
      clearTimeout(cleanupTimer);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-background">
      {mountContent && <div className="relative z-0">{children}</div>}

      {!animationFinished && (
        <div className="fixed inset-0 z-50 flex flex-col pointer-events-none">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{
              duration: ANIM.SHUTTER.DURATION,
              delay: ANIM.SHUTTER.DELAY,
              ease: ANIM.SHUTTER.EASE,
            }}
            className="relative flex-1 bg-background w-full border-b border-border"
          >
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: ANIM.SHUTTER.DELAY, duration: 0.2 }}
              className="absolute bottom-0 left-0 right-0 h-[1px] bg-background/20"
            />
          </motion.div>

          <motion.div
            initial={{ y: 0 }}
            animate={{ y: "100%" }}
            transition={{
              duration: ANIM.SHUTTER.DURATION,
              delay: ANIM.SHUTTER.DELAY,
              ease: ANIM.SHUTTER.EASE,
            }}
            className="relative flex-1 bg-background w-full border-t border-border"
          />

          <div className="absolute inset-0 flex items-center justify-center z-50">
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

            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -25 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                scale: { duration: ANIM.LOGO.SCALE_DURATION, ease: "backOut" },
                opacity: { duration: 0.4 },
                rotate: { duration: ANIM.LOGO.SCALE_DURATION, ease: "backOut" },
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
        </div>
      )}
    </div>
  );
};
