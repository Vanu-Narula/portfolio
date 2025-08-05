"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Linkedin, Github } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const contactInfo = {
  linkedin: "https://linkedin.com/in/vanraj-narula",
  github: "https://github.com/Vanu-Narula",
  twitter: "https://x.com/vanraj_narula",
  availability: "Available for consultations and collaborations",
};

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(containerRef, { threshold: 0.3 });

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800/50"
    >
      <div className="container mx-auto px-6" ref={containerRef}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
            Connect With Me
          </h2>
          <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
            Interested in collaboration or have a question? I'd love to hear
            from you. Feel free to reach out through my social media channels.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-200">
                Contact Information
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-8">
                Feel free to reach out through any of these channels. I'm always
                open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {/* LinkedIn */}
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-700 flex items-center justify-center text-white">
                  <Linkedin size={20} />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    LinkedIn
                  </div>
                  <a
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-500 transition-colors"
                  >
                    Vanraj Narula
                  </a>
                </div>
              </motion.div>

              {/* Twitter/X */}
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-400 to-indigo-500 flex items-center justify-center text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Twitter
                  </div>
                  <a
                    href="https://x.com/vanraj_narula"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-slate-800 dark:text-slate-200 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                  >
                    @vanraj_narula
                  </a>
                </div>
              </motion.div>

              {/* GitHub */}
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-slate-700 to-slate-900 flex items-center justify-center text-white">
                  <Github size={20} />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    GitHub
                  </div>
                  <a
                    href={contactInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-slate-800 dark:text-slate-200 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    @vanraj-narula
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Availability Info */}
            <div className="p-6 glass dark:glass-dark rounded-xl">
              <h4 className="text-lg font-bold mb-2 text-slate-800 dark:text-slate-200">
                My Availability
              </h4>
              <p className="text-slate-700 dark:text-slate-300">
                I'm currently available for consulting and collaboration on AI
                projects. Typically, I respond to inquiries within 24-48 hours.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
