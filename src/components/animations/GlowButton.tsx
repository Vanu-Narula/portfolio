"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  glowColor?: string;
  glowSize?: number;
}

export default function GlowButton({
  children,
  onClick,
  className = "",
  glowColor = "rgba(59, 130, 246, 0.5)", // Default blue glow
  glowSize = 40,
}: GlowButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovering) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPosition({ x, y });
  };

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow effect */}
      {isHovering && (
        <motion.div
          className="absolute pointer-events-none"
          animate={{
            x: position.x - glowSize / 2,
            y: position.y - glowSize / 2,
            opacity: 0.8,
          }}
          initial={{
            opacity: 0,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
          style={{
            width: glowSize,
            height: glowSize,
            borderRadius: "50%",
            background: glowColor,
            filter: `blur(${glowSize / 2}px)`,
          }}
        />
      )}

      {/* Content with relative z-index */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
