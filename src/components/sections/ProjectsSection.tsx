"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Play,
  FileText,
  Calendar,
  Users,
  Target,
  TrendingUp,
  Code,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { projectsData, projectCategories } from "@/data/projects";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import FloatingCard from "@/components/animations/FloatingCard";
import GlowButton from "@/components/animations/GlowButton";

interface ProjectCardProps {
  project: (typeof projectsData)[0];
  index: number;
  onClick: () => void;
}

const ProjectCard = ({ project, index, onClick }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.3 });
  const category = projectCategories[project.category];

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  } as const;

  return (
    <FloatingCard
      intensity={0.05}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="glass dark:glass-dark rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.images[0] || "/projects/placeholder.jpg"}
            alt={project.title}
            width={400}
            height={200}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Category Badge */}
          <div
            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${category.color}`}
          >
            {category.icon} {category.name}
          </div>

          {/* Status Badge */}
          <div
            className={`absolute top-4 right-4 px-2 py-1 rounded-md text-xs font-medium ${
              project.status === "ongoing"
                ? "bg-teal-600 text-white"
                : project.status === "completed"
                  ? "bg-indigo-600 text-white"
                  : "bg-amber-500 text-white"
            }`}
          >
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-indigo-600 transition-colors">
              {project.title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                {project.duration}
              </div>
              {project.teamSize && (
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  {project.teamSize} members
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-700 dark:text-slate-300 mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Key Achievement */}
          <div className="mb-4 p-3 bg-gradient-to-r from-teal-500/10 to-indigo-500/10 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Target size={16} className="text-teal-600" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Key Impact
              </span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              {project.achievements[0]}
            </p>
          </div>

          {/* Technologies */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs bg-indigo-500/10 text-indigo-600 rounded-md"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2 py-1 text-xs text-slate-600 dark:text-slate-400">
                  +{project.technologies.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {project.links.github && (
                <motion.a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 glass dark:glass-dark rounded-full hover:bg-indigo-500/10 transition-colors"
                >
                  <Github size={16} />
                </motion.a>
              )}
              {project.links.demo && (
                <motion.a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 glass dark:glass-dark rounded-full hover:bg-indigo-500/10 transition-colors"
                >
                  <ExternalLink size={16} />
                </motion.a>
              )}
              {project.links.video && (
                <motion.a
                  href={project.links.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 glass dark:glass-dark rounded-full hover:bg-indigo-500/10 transition-colors"
                >
                  <Play size={16} />
                </motion.a>
              )}
            </div>

            <GlowButton
              className="text-sm text-indigo-600 font-medium flex items-center gap-1"
              glowColor="rgba(59, 130, 246, 0.3)"
            >
              View Details
              <TrendingUp size={14} />
            </GlowButton>
          </div>
        </div>
      </div>
    </FloatingCard>
  );
};

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(containerRef, { threshold: 0.3 });

  const filteredProjects = projectsData.filter((project) => {
    return !activeCategory || project.category === activeCategory;
  });

  const featuredProjects = projectsData.filter((p) => p.isFeatured);

  return (
    <section
      id="projects"
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
            Featured Projects
          </h2>
          <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
            Innovative solutions spanning GenAI automation, computer vision
            systems, and enterprise-grade applications with measurable business
            impact.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12 overflow-x-auto pb-2"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(null)}
            className={`px-6 py-3 rounded-full whitespace-nowrap transition-all ${
              !activeCategory
                ? "bg-indigo-600 text-white shadow-lg"
                : "glass dark:glass-dark hover:bg-indigo-500/10"
            }`}
          >
            All Projects
          </motion.button>
          {Object.entries(projectCategories).map(([key, category]) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setActiveCategory(activeCategory === key ? null : key)
              }
              className={`px-6 py-3 rounded-full whitespace-nowrap transition-all ${
                activeCategory === key
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "glass dark:glass-dark hover:bg-indigo-500/10"
              }`}
            >
              {category.icon} {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project.id)}
            />
          ))}
        </motion.div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="glass dark:bg-slate-800/80 dark:text-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-700"
              >
                {(() => {
                  const project = projectsData.find(
                    (p) => p.id === selectedProject
                  );
                  if (!project) return null;

                  const category = projectCategories[project.category];

                  return (
                    <div className="p-8">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div
                              className={`px-3 py-1 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${category.color}`}
                            >
                              {category.icon} {category.name}
                            </div>
                            <div
                              className={`px-2 py-1 rounded-md text-xs font-medium ${
                                project.status === "ongoing"
                                  ? "bg-teal-600 text-white"
                                  : project.status === "completed"
                                    ? "bg-indigo-600 text-white"
                                    : "bg-amber-500 text-white"
                              }`}
                            >
                              {project.status.charAt(0).toUpperCase() +
                                project.status.slice(1)}
                            </div>
                          </div>
                          <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                            {project.title}
                          </h3>
                          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                            <div className="flex items-center gap-1">
                              <Calendar size={16} />
                              {project.duration}
                            </div>
                            {project.teamSize && (
                              <div className="flex items-center gap-1">
                                <Users size={16} />
                                {project.teamSize} team members
                              </div>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedProject(null)}
                          className="p-2 hover:bg-slate-200/20 dark:hover:bg-slate-700/20 rounded-full transition-colors"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Impact Metrics */}
                      {project.impact && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                          {project.impact.map((metric, index) => (
                            <div
                              key={index}
                              className="text-center p-4 bg-gradient-to-br from-indigo-500/10 to-teal-500/10 rounded-lg"
                            >
                              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                                {metric.value}
                              </div>
                              <div className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-1">
                                {metric.metric}
                              </div>
                              <div className="text-xs text-slate-600 dark:text-slate-400">
                                {metric.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Project Images */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {project.images.slice(0, 4).map((image, index) => (
                          <div
                            key={index}
                            className="relative h-48 rounded-lg overflow-hidden"
                          >
                            <Image
                              src={image}
                              alt={`${project.title} screenshot ${index + 1}`}
                              width={400}
                              height={200}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Description */}
                      <div className="mb-8">
                        <h4 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">
                          Project Overview
                        </h4>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {project.longDescription}
                        </p>
                      </div>

                      {/* Features & Achievements */}
                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                          <h4 className="text-lg font-semibold mb-3 flex items-center gap-2 text-slate-800 dark:text-slate-200">
                            <Zap
                              size={20}
                              className="text-indigo-500 dark:text-indigo-400"
                            />
                            Key Features
                          </h4>
                          <ul className="space-y-2">
                            {project.features.map((feature, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 mt-2 flex-shrink-0" />
                                <span className="text-slate-700 dark:text-slate-200">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold mb-3 flex items-center gap-2 text-slate-800 dark:text-slate-200">
                            <Target size={20} className="text-teal-500" />
                            Achievements
                          </h4>
                          <ul className="space-y-2">
                            {project.achievements.map((achievement, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-teal-400 dark:bg-teal-300 mt-2 flex-shrink-0" />
                                <span className="text-slate-700 dark:text-slate-200">
                                  {achievement}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold mb-3 flex items-center gap-2 text-slate-800 dark:text-slate-200">
                          <Code size={20} className="text-amber-500" />
                          Technology Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Challenges & Solutions */}
                      {project.challenges && project.solutions && (
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                          <div>
                            <h4 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-200">
                              Technical Challenges
                            </h4>
                            <ul className="space-y-2">
                              {project.challenges.map((challenge, index) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-2"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                                  <span className="text-slate-700 dark:text-slate-300">
                                    {challenge}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-200">
                              Solutions Implemented
                            </h4>
                            <ul className="space-y-2">
                              {project.solutions.map((solution, index) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-2"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400 dark:bg-teal-300 mt-2 flex-shrink-0" />
                                  <span className="text-slate-700 dark:text-slate-300">
                                    {solution}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* Project Links */}
                      <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-200 dark:border-slate-700/50">
                        {project.links.github && (
                          <motion.a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-lg hover:shadow-lg transition-all"
                          >
                            <Github size={18} />
                            View Source
                          </motion.a>
                        )}
                        {project.links.demo && (
                          <motion.a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:shadow-lg transition-all"
                          >
                            <ExternalLink size={18} />
                            Live Demo
                          </motion.a>
                        )}
                        {project.links.documentation && (
                          <motion.a
                            href={project.links.documentation}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 glass dark:glass-dark dark:text-slate-200 rounded-lg hover:bg-indigo-500/10 transition-all"
                          >
                            <FileText size={18} />
                            Documentation
                          </motion.a>
                        )}
                        {project.links.video && (
                          <motion.a
                            href={project.links.video}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg transition-all"
                          >
                            <Play size={18} />
                            Watch Demo
                          </motion.a>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
