"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
  transitionType?: "fade" | "slide" | "zoom" | "none";
  duration?: number;
}

export default function PageTransition({
  children,
  transitionType = "fade",
  duration = 0.4,
}: PageTransitionProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const getVariants = () => {
    switch (transitionType) {
      case "slide":
        return {
          hidden: { opacity: 0, x: -100 },
          enter: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 100 },
        };
      case "zoom":
        return {
          hidden: { opacity: 0, scale: 0.95 },
          enter: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.05 },
        };
      case "fade":
      default:
        return {
          hidden: { opacity: 0 },
          enter: { opacity: 1 },
          exit: { opacity: 0 },
        };
    }
  };

  // Don't animate on initial server render to prevent hydration issues
  if (!isMounted && transitionType !== "none") {
    return <div style={{ opacity: 0 }}>{children}</div>;
  }

  if (transitionType === "none") {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="content"
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={getVariants()}
        transition={{
          duration,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
