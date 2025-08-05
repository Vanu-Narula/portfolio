"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Search, Zap, Target, Award } from "lucide-react";
import { skillsData, skillCategories } from "@/data/skills";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import ScrollReveal from "@/components/animations/ScrollReveal";

interface SkillNodeProps {
  skill: (typeof skillsData)[0];
  index: number;
  isSelected: boolean;
  connections: string[];
  onClick: () => void;
}

const SkillNode = ({
  skill,
  index,
  isSelected,
  connections,
  onClick,
}: SkillNodeProps) => {
  const category = skillCategories[skill.category];
  const isConnected = connections.includes(skill.id);

  const nodeVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      rotate: -180,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeInOut",
      },
    },
    hover: {
      scale: 1.1,
      zIndex: 10,
      transition: { duration: 0.2 },
    },
  } as const;

  const proficiencyPercentage = (skill.proficiency / 10) * 100;

  return (
    <motion.div
      variants={nodeVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={onClick}
      className={`relative cursor-pointer ${
        isSelected ? "z-20" : isConnected ? "z-10" : "z-0"
      }`}
      style={{
        filter:
          isSelected || isConnected ? "none" : "grayscale(0.3) opacity(0.7)",
      }}
    >
      {/* Skill Node */}
      <div
        className={`relative w-24 h-24 rounded-full p-1 bg-gradient-to-br ${category.color} shadow-lg`}
      >
        {/* Proficiency Ring */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - proficiencyPercentage / 100)}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
            animate={{
              strokeDashoffset:
                2 * Math.PI * 45 * (1 - proficiencyPercentage / 100),
            }}
            transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
          />
        </svg>

        {/* Inner Content */}
        <div className="relative w-full h-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl mb-1">{category.icon}</div>
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {skill.proficiency}/10
            </div>
          </div>
        </div>

        {/* Core Skill Badge */}
        {skill.isCore && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
            <Award size={12} className="text-white" />
          </div>
        )}
      </div>

      {/* Skill Name */}
      <div className="text-center mt-2">
        <div className="font-semibold text-sm text-foreground">
          {skill.name}
        </div>
        <div className="text-xs text-slate-600 dark:text-slate-400">
          {skill.experience}
        </div>
      </div>

      {/* Tooltip on Hover */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        whileHover={{ opacity: 1, y: -5, scale: 1 }}
        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 glass dark:glass-dark p-3 rounded-lg w-64 pointer-events-none z-50"
      >
        <div className="text-sm font-semibold mb-1">{skill.name}</div>
        <div className="text-xs text-slate-700 dark:text-slate-300 mb-2">
          {skill.description}
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Target size={12} className="text-blue-500" />
          <span>Proficiency: {skill.proficiency}/10</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function SkillsSection() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(containerRef, { threshold: 0.3 });

  const filteredSkills = skillsData.filter((skill) => {
    const matchesCategory =
      !activeCategory || skill.category === activeCategory;
    const matchesSearch = skill.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getConnections = (skillId: string) => {
    const skill = skillsData.find((s) => s.id === skillId);
    return skill ? skill.relatedSkills : [];
  };

  const skillStats = {
    total: skillsData.length,
    core: skillsData.filter((s) => s.isCore).length,
    categories: Object.keys(skillCategories).length,
    avgProficiency: Math.round(
      skillsData.reduce((acc, skill) => acc + skill.proficiency, 0) /
        skillsData.length
    ),
  };

  return (
    <section
      id="skills"
      className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-900"
    >
      <div className="container mx-auto px-6" ref={containerRef}>
        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
            Technical Expertise
          </h2>
          <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            Comprehensive skill set spanning cutting-edge GenAI technologies,
            computer vision systems, and proven leadership capabilities.
          </p>

          {/* Skill Stats */}
          <ScrollReveal
            direction="up"
            delay={0.2}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
          >
            {[
              { label: "Total Skills", value: skillStats.total, icon: "🎯" },
              { label: "Core Skills", value: skillStats.core, icon: "⭐" },
              { label: "Categories", value: skillStats.categories, icon: "📁" },
              {
                label: "Avg Proficiency",
                value: `${skillStats.avgProficiency}/10`,
                icon: "📊",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  isVisible
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass dark:glass-dark p-4 rounded-lg text-center"
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-lg font-bold text-blue-500">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </ScrollReveal>
        </ScrollReveal>

        {/* Filters and Search */}
        <ScrollReveal
          direction="up"
          delay={0.3}
          className="flex flex-col sm:flex-row gap-4 mb-12"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass dark:glass-dark rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                !activeCategory
                  ? "bg-blue-500 text-white"
                  : "glass dark:glass-dark hover:bg-blue-500/10"
              }`}
            >
              All Skills
            </motion.button>
            {Object.entries(skillCategories).map(([key, category]) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  setActiveCategory(activeCategory === key ? null : key)
                }
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeCategory === key
                    ? "bg-blue-500 text-white"
                    : "glass dark:glass-dark hover:bg-blue-500/10"
                }`}
              >
                {category.icon} {category.name}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Skills Network */}
        <ScrollReveal
          direction="fade"
          delay={0.5}
          className="relative min-h-[400px]"
        >
          {/* Connection Lines (SVG Overlay) */}
          {selectedSkill && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              {getConnections(selectedSkill).map((connectedId) => {
                const startSkill = skillsData.find(
                  (s) => s.id === selectedSkill
                );
                const endSkill = skillsData.find((s) => s.id === connectedId);
                const startIndex = filteredSkills.findIndex(
                  (s) => s.id === selectedSkill
                );
                const endIndex = filteredSkills.findIndex(
                  (s) => s.id === connectedId
                );

                if (startIndex === -1 || endIndex === -1) return null;

                // Calculate positions (simplified grid layout)
                const cols = Math.min(
                  6,
                  Math.ceil(Math.sqrt(filteredSkills.length))
                );
                const startRow = Math.floor(startIndex / cols);
                const startCol = startIndex % cols;
                const endRow = Math.floor(endIndex / cols);
                const endCol = endIndex % cols;

                const startX = (startCol + 0.5) * (100 / cols);
                const startY = (startRow + 0.5) * 160;
                const endX = (endCol + 0.5) * (100 / cols);
                const endY = (endRow + 0.5) * 160;

                return (
                  <motion.line
                    key={`${selectedSkill}-${connectedId}`}
                    x1={`${startX}%`}
                    y1={startY}
                    x2={`${endX}%`}
                    y2={endY}
                    stroke="rgba(59, 130, 246, 0.4)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                );
              })}
            </svg>
          )}

          {/* Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-items-center">
            {filteredSkills.map((skill, index) => (
              <SkillNode
                key={skill.id}
                skill={skill}
                index={index}
                isSelected={selectedSkill === skill.id}
                connections={selectedSkill ? getConnections(selectedSkill) : []}
                onClick={() =>
                  setSelectedSkill(selectedSkill === skill.id ? null : skill.id)
                }
              />
            ))}
          </div>
        </ScrollReveal>

        {/* Selected Skill Details */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, y: 30, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -30, height: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="mt-12 glass dark:glass-dark rounded-2xl p-8 overflow-hidden"
            >
              {(() => {
                const skill = skillsData.find((s) => s.id === selectedSkill);
                if (!skill) return null;

                const category = skillCategories[skill.category];

                return (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-white text-xl`}
                        >
                          {category.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                            {skill.name}
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400">
                            {category.name}
                          </p>
                        </div>
                      </div>

                      <p className="text-slate-700 dark:text-slate-300 mb-6">
                        {skill.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                          <div className="text-lg font-bold text-blue-500">
                            {skill.proficiency}/10
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            Proficiency
                          </div>
                        </div>
                        <div className="text-center p-3 bg-teal-500/10 dark:bg-teal-500/20 rounded-lg">
                          <div className="text-lg font-bold text-teal-500 dark:text-teal-400">
                            {skill.experience}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            Experience
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-200">
                        Related Skills
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {skill.relatedSkills.map((relatedId) => {
                          const relatedSkill = skillsData.find(
                            (s) => s.id === relatedId
                          );
                          return relatedSkill ? (
                            <button
                              key={relatedId}
                              onClick={() => setSelectedSkill(relatedId)}
                              className="px-3 py-1 glass dark:glass-dark rounded-full text-sm hover:bg-blue-500/10 transition-colors"
                            >
                              {relatedSkill.name}
                            </button>
                          ) : null;
                        })}
                      </div>

                      <h4 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-200">
                        Key Projects
                      </h4>
                      <ul className="space-y-2">
                        {skill.projects.map((project, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Zap
                              size={16}
                              className="text-blue-500 mt-1 flex-shrink-0"
                            />
                            <span className="text-slate-700 dark:text-slate-300">
                              {project}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
