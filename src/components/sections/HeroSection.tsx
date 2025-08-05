"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Download, Mail, Github, Linkedin } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import { TypewriterEffect } from "@/components/animations/TypewriterEffect";
import { ParticleSystem } from "@/components/animations/ParticleSystem";
import { GradientBackground } from "@/components/animations/GradientBackground";
import { ShimmerEffect } from "@/components/animations/ShimmerEffect";

const heroRoles = [
  "Deputy Manager",
  "GenAI Expert",
  "Team Leader",
  "AI Architect",
  "Technology Executive",
];

export default function HeroSection() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % heroRoles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Define animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  } as const;

  const scrollToNext = () => {
    const nextSection = document.getElementById("career");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 via-background to-growth-900/10" />

      {/* Gradient Background */}
      <GradientBackground />

      {/* Shimmer Effect */}
      <ShimmerEffect />

      {/* Particle System */}
      <ParticleSystem />

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        className="container mx-auto px-6 py-12 relative z-10"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <motion.div
              variants={itemVariants}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-4"
            >
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-relaxed tracking-wider"
                layoutId="heroTitle"
              >
                <span className="block text-foreground pb-2">Hi, I'm</span>
                <span className="block gradient-text pb-4 pr-10 mb-2">
                  Vanraj Narula
                </span>
              </motion.h1>

              <div className="h-16 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentRoleIndex}
                    initial={{ opacity: 0, y: 20, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -20, rotateX: 90 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-indigo-600"
                  >
                    {heroRoles[currentRoleIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl"
            >
              Leading GenAI innovation with{" "}
              <span className="font-semibold text-teal-600">14+ years</span> of
              experience. Specialized in{" "}
              <span className="font-semibold text-indigo-600">
                LangChain, AI Agents
              </span>
              , and building high-performing teams that deliver
              <span className="font-semibold text-teal-600">
                {" "}
                measurable business impact
              </span>
              .
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="grid grid-cols-3 gap-6 py-4"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-indigo-600">
                  14+
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Years Experience
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-teal-600">
                  8
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Team Members
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-amber-500">
                  1150%
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Career Growth
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="/docs/vanraj-narula-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-indigo-700 to-indigo-500 text-white font-semibold rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Download size={20} />
                Download Resume
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document
                    .getElementById("career")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-4 glass dark:glass-dark font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ChevronDown size={20} />
                Explore Timeline
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex gap-4"
            >
              {[
                {
                  icon: Github,
                  href: "https://github.com/Vanu-Narula",
                  label: "GitHub",
                },
                {
                  icon: Linkedin,
                  href: "https://linkedin.com/in/vanraj-narula",
                  label: "LinkedIn",
                },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 glass dark:glass-dark rounded-full transition-all duration-300 hover:shadow-lg"
                  aria-label={label}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Profile Image */}
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative w-80 h-80 mx-auto">
              {/* Animated Border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-teal-500 to-amber-500 p-1"
              >
                <div className="w-full h-full rounded-full bg-white dark:bg-slate-900" />
              </motion.div>

              {/* Profile Image */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-2 rounded-full overflow-hidden shadow-2xl"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <PlaceholderImage />
                </div>
              </motion.div>

              {/* Floating Achievement Badges */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="absolute -top-4 -right-4 glass dark:glass-dark p-3 rounded-full"
              >
                <div className="text-2xl">🚀</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8, duration: 0.5 }}
                className="absolute -bottom-4 -left-4 glass dark:glass-dark p-3 rounded-full"
              >
                <div className="text-2xl">🤖</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-slate-200 transition-colors duration-300"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.button>
    </section>
  );
}
