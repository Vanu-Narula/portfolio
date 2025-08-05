"use client";

import { motion } from "framer-motion";

interface TechIcon {
  name: string;
  icon: string;
  delay: number;
}

interface FloatingTechIconsProps {
  icons: TechIcon[];
}

export function FloatingTechIcons({ icons }: FloatingTechIconsProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((icon, index) => (
        <motion.div
          key={icon.name}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.7, 0.5],
            scale: [0, 1, 0.8],
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: icon.delay,
            ease: "easeInOut",
          }}
          className="absolute text-3xl"
          style={{
            top: `${15 + Math.random() * 70}%`,
            left: `${15 + Math.random() * 70}%`,
            zIndex: 5,
            filter: "blur(0.5px)",
          }}
        >
          <div className="glass dark:glass-dark rounded-full p-4 flex items-center justify-center opacity-80">
            {icon.icon}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
