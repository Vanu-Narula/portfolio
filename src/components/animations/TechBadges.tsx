"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface TechBadge {
  name: string;
  icon?: string;
  color: string;
}

interface TechBadgesProps {
  badges: TechBadge[];
}

export function TechBadges({ badges }: TechBadgesProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a slight delay before showing the badges for a nice entrance effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, staggerChildren: 0.1 }}
      className="absolute bottom-12 left-0 right-0 flex justify-center items-center z-10"
    >
      <div className="bg-white/30 dark:bg-slate-900/40 backdrop-blur-md px-5 py-3 rounded-2xl flex gap-3 flex-wrap justify-center max-w-3xl">
        {badges.map((badge, index) => (
          <motion.div
            key={badge.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1 + 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            className={`${badge.color} text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 shadow-sm`}
          >
            {badge.icon && <span>{badge.icon}</span>}
            {badge.name}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
