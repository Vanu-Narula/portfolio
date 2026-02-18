"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap, Award, BookOpen, Calendar, Brain, Trophy, Code, X,
} from "lucide-react";
import { educationData, educationCategories } from "@/data/education";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface EducationCardProps {
  item: (typeof educationData)[0];
  index: number;
  isSelected: boolean;
  isInView: boolean;
  onClick: () => void;
}

function EducationCard({ item, index, isSelected, isInView, onClick }: EducationCardProps) {
  const category = educationCategories[item.type];

  return (
    <motion.button
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.4, 0, 0.2, 1] }}
      onClick={onClick}
      className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
        isSelected
          ? "bg-white/[0.07] border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.1)]"
          : "bg-white/[0.04] border-white/[0.07] hover:bg-white/[0.06] hover:border-white/[0.14]"
      } ${item.isHighlight ? "border-blue-500/20" : ""}`}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white text-lg flex-shrink-0`}>
          {category.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-bold text-white leading-tight">{item.title}</h3>
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] font-medium flex-shrink-0 ${
                item.status === "ongoing"
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                  : "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20"
              }`}
            >
              {item.status === "ongoing" ? "Ongoing" : "Completed"}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{item.institution}</p>
        </div>
      </div>

      {/* Duration */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
        <Calendar size={11} />
        <span>{item.duration}</span>
        {item.specialization && (
          <>
            <span>·</span>
            <span>{item.specialization}</span>
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
        {item.description}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {item.skills.slice(0, 3).map((skill) => (
          <span key={skill} className="tech-badge">{skill}</span>
        ))}
        {item.skills.length > 3 && (
          <span className="px-2 py-0.5 text-[10px] text-slate-500">
            +{item.skills.length - 3}
          </span>
        )}
      </div>

      {/* Highlight */}
      {item.isHighlight && (
        <div className="flex items-center gap-1 mt-3 text-xs text-amber-400">
          <Trophy size={11} />
          <span>Key Achievement</span>
        </div>
      )}
    </motion.button>
  );
}

export default function EducationSection() {
  const [selectedEducation, setSelectedEducation] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.05 });

  const filteredEducation = educationData.filter(
    (item) => !activeType || item.type === activeType
  );

  const selectedData = selectedEducation
    ? educationData.find((e) => e.id === selectedEducation)
    : null;

  return (
    <section id="education" ref={sectionRef} className="section-bg-primary py-20 sm:py-24 lg:py-28">
      <div className="container-width">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-label">Learning</span>
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
            Education & Growth
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Continuous learning combining formal education with self-directed mastery of
            cutting-edge technologies and leadership development.
          </p>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
        >
          {[
            { label: "M.Tech Degree", value: "CS", icon: <GraduationCap size={18} />, color: "text-cyan-400" },
            { label: "Years Learning", value: "20+", icon: <BookOpen size={18} />, color: "text-blue-400" },
            { label: "Certifications", value: "Oracle+", icon: <Award size={18} />, color: "text-violet-400" },
            { label: "Specialization", value: "GenAI", icon: <Trophy size={18} />, color: "text-amber-400" },
          ].map((stat, i) => (
            <div key={stat.label} className="card-dark p-4 text-center">
              <div className={`flex justify-center mb-1 ${stat.color}`}>{stat.icon}</div>
              <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Type filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex justify-center gap-2 mb-8 overflow-x-auto pb-1 scrollbar-hide"
        >
          <button
            onClick={() => setActiveType(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              !activeType
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                : "text-slate-500 hover:text-white hover:bg-white/[0.06]"
            }`}
          >
            All
          </button>
          {Object.entries(educationCategories).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setActiveType(activeType === key ? null : key)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeType === key
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "text-slate-500 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {filteredEducation.map((item, index) => (
            <EducationCard
              key={item.id}
              item={item}
              index={index}
              isSelected={selectedEducation === item.id}
              isInView={isVisible}
              onClick={() => setSelectedEducation(selectedEducation === item.id ? null : item.id)}
            />
          ))}
        </div>

        {/* Detail panel */}
        <AnimatePresence>
          {selectedData && (
            <motion.div
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="card-dark p-6 sm:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${educationCategories[selectedData.type].color} flex items-center justify-center text-white text-xl`}>
                      {educationCategories[selectedData.type].icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{selectedData.title}</h3>
                      <p className="text-sm text-slate-400">{selectedData.institution}</p>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                        <Calendar size={12} />
                        {selectedData.duration}
                        {selectedData.specialization && ` · ${selectedData.specialization}`}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedEducation(null)}
                    className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/[0.06] transition-all"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <p className="text-sm text-slate-400 leading-relaxed mb-5">{selectedData.description}</p>

                    <h4 className="text-sm font-semibold text-white mb-3">Key Highlights</h4>
                    <ul className="space-y-2">
                      {selectedData.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    {selectedData.thesis && (
                      <div className="mb-5 p-4 rounded-xl bg-blue-500/8 border border-blue-500/15">
                        <div className="flex items-center gap-2 mb-3">
                          <Brain size={16} className="text-blue-400" />
                          <h4 className="text-sm font-semibold text-white">Research Thesis</h4>
                        </div>
                        <p className="text-sm font-medium text-slate-300 mb-2">{selectedData.thesis.title}</p>
                        <p className="text-xs text-slate-400 mb-3">{selectedData.thesis.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedData.thesis.technologies.map((tech) => (
                            <span key={tech} className="tech-badge">{tech}</span>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-white/[0.06]">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Trophy size={12} className="text-amber-400" />
                            <span className="text-xs font-medium text-white">Impact</span>
                          </div>
                          <p className="text-xs text-slate-400">{selectedData.thesis.impact}</p>
                        </div>
                      </div>
                    )}

                    <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <Code size={14} className="text-cyan-400" /> Skills Developed
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedData.skills.map((skill) => (
                        <span key={skill} className="tech-badge">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
