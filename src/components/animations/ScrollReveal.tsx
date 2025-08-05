"use client";

import { motion, Variants } from "framer-motion";
import { useRef } from "react";
import { useOptimizedAnimation } from "@/hooks/useOptimizedAnimation";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  delay?: number;
  duration?: number;
  stagger?: boolean;
  className?: string;
  threshold?: number;
  once?: boolean;
  disableOnMobile?: boolean;
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  stagger = false,
  className = "",
  threshold = 0.3,
  once = true,
  disableOnMobile = false,
}: ScrollRevealProps) {
  const { elementRef, isVisible } = useOptimizedAnimation({
    threshold,
    triggerOnce: once,
    disableOnMobile,
    rootMargin: "50px",
  });

  // Define animation variants based on direction
  let variants: Variants;

  switch (direction) {
    case "up":
      variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration, delay, ease: "easeOut" },
        },
      };
      break;
    case "down":
      variants = {
        hidden: { opacity: 0, y: -50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration, delay, ease: "easeOut" },
        },
      };
      break;
    case "left":
      variants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration, delay, ease: "easeOut" },
        },
      };
      break;
    case "right":
      variants = {
        hidden: { opacity: 0, x: 50 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration, delay, ease: "easeOut" },
        },
      };
      break;
    case "scale":
      variants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration, delay, ease: "easeOut" },
        },
      };
      break;
    default: // fade
      variants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration, delay, ease: "easeOut" },
        },
      };
  }

  // For staggered children animations
  if (stagger) {
    const containerVariants: Variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: delay,
        },
      },
    };

    const itemVariants: Variants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration, ease: "easeOut" },
      },
    };

    return (
      <motion.div
        ref={elementRef}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
        className={className}
      >
        {Array.isArray(children) ? (
          children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        ) : (
          <motion.div variants={itemVariants}>{children}</motion.div>
        )}
      </motion.div>
    );
  }

  // For single element animations
  return (
    <motion.div
      ref={elementRef}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
