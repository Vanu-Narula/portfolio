"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import useScrollAnimation from "@/hooks/useScrollAnimation";

interface SectionProps {
  id: string;
  className?: string;
  children: ReactNode;
  animate?: boolean;
}

export default function Section({
  id,
  className = "",
  children,
  animate = true,
}: SectionProps) {
  const { ref, inView } = useScrollAnimation(0.1, true);

  return (
    <section id={id} ref={ref} className={`section-padding ${className}`}>
      <div className="container-width">
        {animate ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: inView ? 1 : 0,
              y: inView ? 0 : 20,
            }}
            transition={{ duration: 0.6 }}
          >
            {children}
          </motion.div>
        ) : (
          children
        )}
      </div>
    </section>
  );
}
