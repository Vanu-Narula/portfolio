"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  MapPin,
  Trophy,
  Code,
  Brain,
} from "lucide-react";
import { educationData, educationCategories } from "@/data/education";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import FloatingCard from "@/components/animations/FloatingCard";
import GlowButton from "@/components/animations/GlowButton";

interface EducationCardProps {
  item: (typeof educationData)[0];
  index: number;
  isSelected: boolean;
  onClick: () => void;
}

const EducationCard = ({
  item,
  index,
  isSelected,
  onClick,
}: EducationCardProps) => {
  const category = educationCategories[item.type];

  const cardVariants = {
    hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 30 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  const getStatusColor = (status: string) => {
    return status === "ongoing" ? "bg-teal-500" : "bg-blue-500";
  };

  return (
    <FloatingCard
      intensity={0.05}
      onClick={onClick}
      className={`glass dark:glass-dark rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
        isSelected ? "ring-2 ring-blue-500 shadow-2xl" : "hover:shadow-xl"
      } ${item.isHighlight ? "border border-blue-500/20" : ""}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white text-xl`}
          >
            {category.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
              {item.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {item.institution}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div
          className={`px-2 py-1 rounded-md text-xs font-medium text-white ${getStatusColor(item.status)}`}
        >
          {item.status === "ongoing" ? "Ongoing" : "Completed"}
        </div>
      </div>

      {/* Duration */}
      <div className="flex items-center gap-2 mb-3 text-sm text-slate-600 dark:text-slate-400">
        <Calendar size={14} />
        <span>{item.duration}</span>
        {item.specialization && (
          <>
            <span>•</span>
            <span>{item.specialization}</span>
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-slate-700 dark:text-slate-300 mb-4 line-clamp-2">
        {item.description}
      </p>

      {/* Skills Preview */}
      <div className="flex flex-wrap gap-1 mb-4">
        {item.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 text-xs bg-blue-500/10 text-blue-500 rounded-md"
          >
            {skill}
          </span>
        ))}
        {item.skills.length > 3 && (
          <span className="px-2 py-1 text-xs text-slate-600 dark:text-slate-400">
            +{item.skills.length - 3} more
          </span>
        )}
      </div>

      {/* Highlight Badge */}
      {item.isHighlight && (
        <div className="flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400">
          <Trophy size={12} />
          <span>Key Achievement</span>
        </div>
      )}

      {/* Thesis Preview */}
      {item.thesis && (
        <div className="mt-3 p-3 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Brain size={14} className="text-blue-500" />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
              Research Thesis
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
            {item.thesis.title}
          </p>
        </div>
      )}
    </FloatingCard>
  );
};

export default function EducationSection() {
  const [selectedEducation, setSelectedEducation] = useState<string | null>(
    null
  );
  const [activeType, setActiveType] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(containerRef, { threshold: 0.3 });

  const filteredEducation = educationData.filter(
    (item) => !activeType || item.type === activeType
  );

  const highlights = educationData.filter((item) => item.isHighlight);

  return (
    <div className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900/50">
      <div className="container mx-auto px-6" ref={containerRef}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
            Education & Growth
          </h2>
          <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            Continuous learning journey combining formal education with
            self-directed mastery of cutting-edge technologies and leadership
            development.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              {
                label: "M.Tech Degree",
                value: "Computer Science",
                icon: GraduationCap,
              },
              { label: "Years Learning", value: "20+", icon: BookOpen },
              { label: "Certifications", value: "Oracle & More", icon: Award },
              {
                label: "Specialization",
                value: "GenAI & Leadership",
                icon: Trophy,
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
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="glass dark:glass-dark p-4 rounded-lg text-center"
              >
                <stat.icon size={24} className="mx-auto mb-2 text-blue-500" />
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Type Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex justify-center gap-3 mb-12 overflow-x-auto pb-2"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveType(null)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              !activeType
                ? "bg-blue-500 text-white shadow-lg"
                : "glass dark:glass-dark hover:bg-blue-500/10"
            }`}
          >
            All Education
          </motion.button>
          {Object.entries(educationCategories).map(([key, category]) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveType(activeType === key ? null : key)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                activeType === key
                  ? "bg-blue-500 text-white shadow-lg"
                  : "glass dark:glass-dark hover:bg-blue-500/10"
              }`}
            >
              {category.icon} {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Education Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="grid md:grid-cols-2 gap-6"
        >
          {filteredEducation.map((item, index) => (
            <EducationCard
              key={item.id}
              item={item}
              index={index}
              isSelected={selectedEducation === item.id}
              onClick={() =>
                setSelectedEducation(
                  selectedEducation === item.id ? null : item.id
                )
              }
            />
          ))}
        </motion.div>

        {/* Detailed Education View */}
        <AnimatePresence>
          {selectedEducation && (
            <motion.div
              initial={{ opacity: 0, y: 30, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -30, height: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-12 glass dark:glass-dark rounded-2xl p-8 overflow-hidden"
            >
              {(() => {
                const item = educationData.find(
                  (e) => e.id === selectedEducation
                );
                if (!item) return null;

                const category = educationCategories[item.type];

                return (
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white text-2xl`}
                        >
                          {category.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                            {item.title}
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400">
                            {item.institution}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mt-1">
                            <Calendar size={14} />
                            <span>{item.duration}</span>
                            {item.specialization && (
                              <>
                                <span>•</span>
                                <span>{item.specialization}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <p className="text-slate-700 dark:text-slate-300 mb-6">
                        {item.description}
                      </p>

                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-200">
                          Key Highlights
                        </h4>
                        <ul className="space-y-2">
                          {item.details.map((detail, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                              <span className="text-slate-700 dark:text-slate-300">
                                {detail}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      {/* Thesis Details */}
                      {item.thesis && (
                        <div className="mb-6 p-6 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl">
                          <div className="flex items-center gap-2 mb-3">
                            <Brain size={20} className="text-blue-500" />
                            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                              Research Thesis
                            </h4>
                          </div>
                          <h5 className="font-medium text-slate-800 dark:text-slate-200 mb-3">
                            {item.thesis.title}
                          </h5>
                          <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
                            {item.thesis.description}
                          </p>

                          <div className="mb-4">
                            <h6 className="text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                              Technologies Used:
                            </h6>
                            <div className="flex flex-wrap gap-1">
                              {item.thesis.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2 py-1 text-xs bg-blue-500/10 text-blue-500 rounded-md"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="p-3 bg-teal-500/10 dark:bg-teal-500/20 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <Trophy
                                size={14}
                                className="text-teal-500 dark:text-teal-400"
                              />
                              <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                Impact
                              </span>
                            </div>
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                              {item.thesis.impact}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Skills Developed */}
                      <div>
                        <h4 className="text-lg font-semibold mb-3 flex items-center gap-2 text-slate-800 dark:text-slate-200">
                          <Code size={18} className="text-blue-500" />
                          Skills Developed
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {item.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Learning Philosophy */}
                      {item.type === "achievement" && (
                        <div className="mt-6 p-4 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-lg">
                          <h4 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-200">
                            Continuous Learning Philosophy
                          </h4>
                          <p className="text-sm text-slate-700 dark:text-slate-300">
                            "Technology evolves rapidly, and staying ahead
                            requires continuous learning and adaptation. My
                            journey from traditional development to GenAI
                            leadership demonstrates the power of self-directed
                            learning and the courage to embrace new paradigms."
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Learning Timeline Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          className="mt-16 glass dark:glass-dark rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-slate-800 dark:text-slate-200">
            Learning Evolution Timeline
          </h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 to-green-500"></div>

            {/* Timeline Items */}
            <div className="space-y-8">
              {educationData
                .sort((a, b) => a.startYear - b.startYear)
                .map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                    className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  >
                    <div
                      className={`flex-1 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}
                    >
                      <div className="glass dark:glass-dark p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                          {item.title}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {item.institution}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-500">
                          {item.duration}
                        </p>
                      </div>
                    </div>

                    {/* Timeline Node */}
                    <div className="relative z-10">
                      <div
                        className={`w-4 h-4 rounded-full bg-gradient-to-br ${educationCategories[item.type].color} border-4 border-white dark:border-slate-900`}
                      ></div>
                    </div>

                    <div className="flex-1"></div>
                  </motion.div>
                ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
