"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  intensity?: number;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  intensity = 0.3,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } =
        buttonRef.current.getBoundingClientRect();

      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distance = Math.sqrt(
        Math.pow(clientX - centerX, 2) + Math.pow(clientY - centerY, 2)
      );

      // Only apply the magnetic effect when cursor is close to the button
      const maxDistance = Math.max(width, height) * 1.5;

      if (distance < maxDistance) {
        const x = (clientX - centerX) * intensity;
        const y = (clientY - centerY) * intensity;
        setPosition({ x, y });
      } else {
        // Reset position when cursor is far away
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [intensity]);

  return (
    <motion.div
      ref={buttonRef}
      className={`inline-block ${className}`}
      onClick={onClick}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 20,
        mass: 0.5,
      }}
    >
      {children}
    </motion.div>
  );
}
