"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Linkedin, Github, Twitter, Download, MessageCircle, Sparkles } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const socialLinks = [
  {
    label: "LinkedIn",
    handle: "Vanraj Narula",
    href: "https://linkedin.com/in/vanraj-narula",
    icon: Linkedin,
    gradient: "from-[#0077B5] to-[#005fa3]",
    description: "Connect professionally",
  },
  {
    label: "GitHub",
    handle: "@Vanu-Narula",
    href: "https://github.com/Vanu-Narula",
    icon: Github,
    gradient: "from-[#24292e] to-[#444d56]",
    description: "View my code & projects",
  },
  {
    label: "Twitter / X",
    handle: "@vanraj_narula",
    href: "https://x.com/vanraj_narula",
    icon: Twitter,
    gradient: "from-[#1da1f2] to-[#0d8fd6]",
    description: "Follow for tech insights",
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.05 });

  return (
    <section id="contact" ref={sectionRef} className="section-bg-secondary py-20 sm:py-24 lg:py-28">
      <div className="container-width">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">Connect</span>
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
            Let's Connect
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Interested in collaboration, consulting, or just want to talk GenAI?
            I'd love to hear from you.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex justify-center mb-10"
          >
            <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm text-emerald-300 font-medium">
                Available for consulting & AI collaboration
              </span>
            </div>
          </motion.div>

          {/* Social cards */}
          <div className="space-y-3 mb-10">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
                whileHover={{ x: 4, borderColor: "rgba(6,182,212,0.3)" }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.07] transition-all group"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${link.gradient} flex items-center justify-center text-white flex-shrink-0 shadow-lg`}>
                  <link.icon size={20} />
                </div>

                <div className="flex-1">
                  <p className="text-xs text-slate-500 mb-0.5">{link.description}</p>
                  <p className="text-sm font-semibold text-white">{link.handle}</p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 group-hover:text-cyan-400 transition-colors">
                  <span>{link.label}</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-0.5 transition-transform">
                    <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Resume CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="card-dark p-6 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles size={16} className="text-cyan-400" />
              <h3 className="text-base font-semibold text-white">Interested in my full profile?</h3>
            </div>
            <p className="text-sm text-slate-400 mb-5">
              Download my resume for a complete overview of experience, projects, and achievements.
            </p>
            <a
              href="/docs/vanraj-narula-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 text-sm"
            >
              <Download size={16} />
              Download Resume
            </a>
          </motion.div>

          {/* Response time note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="text-center text-xs text-slate-600 mt-6"
          >
            <MessageCircle size={12} className="inline mr-1" />
            Typically responds within 24-48 hours
          </motion.p>
        </div>
      </div>
    </section>
  );
}
