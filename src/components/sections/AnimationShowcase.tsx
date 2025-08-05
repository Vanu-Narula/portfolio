"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";
import {
  useParallaxEffect,
  useMousePosition,
} from "@/hooks/useScrollAnimations";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function AnimationShowcase() {
  const parallaxStyle = useParallaxEffect(0.2);
  const { x, y } = useMousePosition();
  const containerRef = useRef<HTMLDivElement>(null);

  const calculateMousePosition = () => {
    if (!containerRef.current) return { x: 0, y: 0 };

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    return {
      x: (x - centerX) / 25,
      y: (y - centerY) / 25,
    };
  };

  const mousePos = calculateMousePosition();

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">
          Animation Showcase
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          {/* Scroll Reveal Demo */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Scroll Reveal</h3>

            <ScrollReveal direction="up" className="mb-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-6 rounded-lg">
                Fade up animation
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" className="mb-4">
              <div className="bg-green-100 dark:bg-green-900/30 p-6 rounded-lg">
                Slide in from left
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" className="mb-4">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-6 rounded-lg">
                Slide in from right
              </div>
            </ScrollReveal>

            <ScrollReveal direction="scale" className="mb-4">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-6 rounded-lg">
                Scale animation
              </div>
            </ScrollReveal>
          </div>

          {/* Stagger Children Demo */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Stagger Children</h3>

            <ScrollReveal stagger={true} className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="bg-indigo-100 dark:bg-indigo-900/30 p-6 rounded-lg"
                >
                  Staggered item {item}
                </div>
              ))}
            </ScrollReveal>
          </div>
        </div>

        {/* Parallax Effect */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold mb-4">Parallax Effect</h3>

          <div className="h-64 overflow-hidden relative bg-gradient-to-b from-blue-300 to-purple-300 dark:from-blue-900 dark:to-purple-900 rounded-xl">
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={parallaxStyle}
            >
              <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
                <h4 className="text-xl font-bold">Scroll to see effect</h4>
                <p>This element moves as you scroll</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mouse Position Effect */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Mouse Movement Effect</h3>

          <div
            ref={containerRef}
            className="h-64 bg-gradient-to-r from-pink-300 to-orange-300 dark:from-pink-900 dark:to-orange-900 rounded-xl flex items-center justify-center overflow-hidden"
          >
            <motion.div
              className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg"
              animate={{
                x: mousePos.x,
                y: mousePos.y,
                rotate: mousePos.x * 0.5,
              }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
            >
              <h4 className="text-xl font-bold">Move your mouse</h4>
              <p>This element follows your cursor</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
