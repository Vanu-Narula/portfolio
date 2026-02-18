"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { skillsData, skillCategories } from "@/data/skills";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface SkillCardProps {
  skill: (typeof skillsData)[0];
  isSelected: boolean;
  isInView: boolean;
  index: number;
  onClick: () => void;
}

function SkillCard({ skill, isSelected, isInView, index, onClick }: SkillCardProps) {
  const category = skillCategories[skill.category];
  const pct = (skill.proficiency / 10) * 100;
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setBarWidth(pct), index * 40);
      return () => clearTimeout(timer);
    }
  }, [isInView, pct, index]);

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.4, 0, 0.2, 1] }}
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
        isSelected
          ? "bg-cyan-500/10 border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
          : "bg-white/[0.04] border-white/[0.07] hover:bg-white/[0.07] hover:border-white/[0.14]"
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-lg">{category.icon}</span>
          <div>
            <p className="text-sm font-semibold text-white leading-tight">{skill.name}</p>
            <p className="text-xs text-slate-500">{skill.experience}</p>
          </div>
        </div>
        <div className="flex flex-col items-end flex-shrink-0">
          <span className={`text-xs font-bold ${isSelected ? "text-cyan-400" : "text-slate-400"}`}>
            {skill.proficiency}/10
          </span>
          {skill.isCore && (
            <span className="text-[10px] text-amber-400 mt-0.5">Core</span>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${barWidth}%`, transition: "width 1s cubic-bezier(0.4,0,0.2,1)" }}
        />
      </div>
    </motion.button>
  );
}

export default function SkillsSection() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.05 });

  const filteredSkills = skillsData.filter((skill) => {
    const matchesCategory = !activeCategory || skill.category === activeCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedSkillData = skillsData.find((s) => s.id === selectedSkill);

  const skillStats = {
    total: skillsData.length,
    core: skillsData.filter((s) => s.isCore).length,
    categories: Object.keys(skillCategories).length,
    avg: Math.round(skillsData.reduce((acc, s) => acc + s.proficiency, 0) / skillsData.length),
  };

  return (
    <section id="skills" ref={sectionRef} className="section-bg-primary py-20 sm:py-24 lg:py-28">
      <div className="container-width">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-label">Expertise</span>
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
            Technical Expertise
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Comprehensive skill set spanning GenAI technologies, computer vision, and leadership.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
        >
          {[
            { label: "Total Skills", value: skillStats.total, icon: "🎯", color: "text-cyan-400" },
            { label: "Core Skills", value: skillStats.core, icon: "⭐", color: "text-amber-400" },
            { label: "Categories", value: skillStats.categories, icon: "📁", color: "text-blue-400" },
            { label: "Avg Proficiency", value: `${skillStats.avg}/10`, icon: "📊", color: "text-violet-400" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
              className="card-dark p-4 text-center"
            >
              <span className="text-2xl">{stat.icon}</span>
              <div className={`text-xl font-bold mt-1 ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 mb-8"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl bg-white/[0.05] border border-white/[0.1] text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                !activeCategory
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "text-slate-500 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              All
            </button>
            {Object.entries(skillCategories).map(([key, cat]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(activeCategory === key ? null : key)}
                className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  activeCategory === key
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    : "text-slate-500 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {filteredSkills.map((skill, index) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              isSelected={selectedSkill === skill.id}
              isInView={isVisible}
              index={index}
              onClick={() => setSelectedSkill(selectedSkill === skill.id ? null : skill.id)}
            />
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">
            No skills match your search.
          </div>
        )}

        {/* Selected skill detail */}
        <AnimatePresence>
          {selectedSkill && selectedSkillData && (
            <motion.div
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="card-dark p-6 sm:p-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-xl">
                        {skillCategories[selectedSkillData.category].icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{selectedSkillData.name}</h3>
                        <p className="text-xs text-slate-500">
                          {skillCategories[selectedSkillData.category].name} · {selectedSkillData.experience}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-slate-400 leading-relaxed mb-5">
                      {selectedSkillData.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-cyan-500/8 border border-cyan-500/15 text-center">
                        <div className="text-lg font-bold text-cyan-400">{selectedSkillData.proficiency}/10</div>
                        <div className="text-xs text-slate-500">Proficiency</div>
                      </div>
                      <div className="p-3 rounded-xl bg-blue-500/8 border border-blue-500/15 text-center">
                        <div className="text-lg font-bold text-blue-400">{selectedSkillData.experience}</div>
                        <div className="text-xs text-slate-500">Experience</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-5">
                      <h4 className="text-sm font-semibold text-white mb-3">Related Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedSkillData.relatedSkills.map((relId) => {
                          const rel = skillsData.find((s) => s.id === relId);
                          return rel ? (
                            <button
                              key={relId}
                              onClick={() => setSelectedSkill(relId)}
                              className="tech-badge hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all"
                            >
                              {rel.name}
                            </button>
                          ) : null;
                        })}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white mb-3">Key Projects</h4>
                      <ul className="space-y-2">
                        {selectedSkillData.projects.map((project, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                            <span className="text-sm text-slate-400">{project}</span>
                          </li>
                        ))}
                      </ul>
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
