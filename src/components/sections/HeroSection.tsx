"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Download, Github, Linkedin, ArrowRight, Sparkles } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";

const heroRoles = [
  "Deputy Manager",
  "GenAI Expert",
  "Team Leader",
  "AI Architect",
  "Technology Executive",
];

const stats = [
  { value: "14+", label: "Years Experience", color: "text-cyan-400" },
  { value: "8", label: "Team Members", color: "text-blue-400" },
  { value: "1150%", label: "Career Growth", color: "text-violet-400" },
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

  const scrollToNext = () => {
    document.getElementById("career")?.scrollIntoView({ behavior: "smooth" });
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.12, delayChildren: 0.1 },
    },
  } as const;

  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  } as const;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080810]"
    >
      {/* Background — subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Top cyan glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(ellipse at center, rgba(6,182,212,0.08) 0%, rgba(6,182,212,0.03) 40%, transparent 70%)" }}
        />
        {/* Bottom-right violet glow */}
        <div
          className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.06) 0%, rgba(139,92,246,0.02) 50%, transparent 80%)" }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        className="relative z-10 container-width pt-20 pb-16"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className="space-y-8">
            {/* Label */}
            <motion.div variants={item} className="flex items-center gap-2">
              <Sparkles size={14} className="text-cyan-400" />
              <span className="section-label">GenAI Leader & Technology Executive</span>
            </motion.div>

            {/* Name */}
            <motion.div variants={item} className="space-y-3">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                <span className="block text-white">Hi, I'm</span>
                <span className="block gradient-text mt-1">Vanraj Narula</span>
              </h1>

              {/* Animated role */}
              <div className="h-12 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentRoleIndex}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="text-2xl sm:text-3xl font-semibold text-cyan-400"
                  >
                    {heroRoles[currentRoleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={item}
              className="text-lg text-slate-400 leading-relaxed max-w-xl"
            >
              Leading GenAI innovation with{" "}
              <span className="text-cyan-300 font-medium">14+ years</span> of
              experience. Specialized in{" "}
              <span className="text-blue-300 font-medium">LangChain, AI Agents</span>
              , and building high-performing teams that deliver{" "}
              <span className="text-violet-300 font-medium">measurable business impact</span>.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={item}
              className="grid grid-cols-3 gap-4 py-2"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-xl bg-white/[0.04] border border-white/[0.07]"
                >
                  <div className={`text-2xl sm:text-3xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row gap-3"
            >
              <motion.a
                href="/docs/vanraj-narula-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary flex items-center justify-center gap-2 text-sm"
              >
                <Download size={16} />
                Download Resume
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToNext}
                className="btn-outline flex items-center justify-center gap-2 text-sm"
              >
                View Career Timeline
                <ArrowRight size={16} />
              </motion.button>
            </motion.div>

            {/* Social links */}
            <motion.div variants={item} className="flex items-center gap-3">
              {[
                { icon: Github, href: "https://github.com/Vanu-Narula", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/vanraj-narula", label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-slate-400 hover:text-white hover:border-cyan-500/30 transition-all text-sm"
                  aria-label={label}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right: Profile */}
          <motion.div
            variants={item}
            className="flex flex-col items-center gap-6"
          >
            {/* Profile image */}
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-violet-500/20 blur-xl" />

              {/* Image container */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden border-2 border-cyan-500/30 shadow-[0_0_60px_rgba(6,182,212,0.2)]">
                <PlaceholderImage />
              </div>

              {/* Status badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-[#0f0f1a] border border-white/[0.1] shadow-xl">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-slate-300 font-medium whitespace-nowrap">Open to Collaboration</span>
              </div>
            </div>

            {/* Tech stack pills */}
            <div className="flex flex-wrap justify-center gap-2 max-w-sm mt-4">
              {["LangChain", "OpenAI", "Python", "Azure AI", "RAG", "Multi-Agent"].map((tech) => (
                <span key={tech} className="tech-badge">{tech}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600 hover:text-cyan-400 transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  );
}
