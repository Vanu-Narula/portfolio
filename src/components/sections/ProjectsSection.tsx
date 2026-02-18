"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink, Github, Play, FileText, Calendar, Users, Target, Zap, Code, X,
} from "lucide-react";
import Image from "next/image";
import { projectsData, projectCategories } from "@/data/projects";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface ProjectCardProps {
  project: (typeof projectsData)[0];
  index: number;
  featured?: boolean;
  onClick: () => void;
}

function ProjectCard({ project, index, featured = false, onClick }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.05 });
  const category = projectCategories[project.category];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.4, 0, 0.2, 1] }}
      onClick={onClick}
      className={`group cursor-pointer card-dark overflow-hidden hover:border-cyan-500/25 transition-all duration-300 ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${featured ? "h-56 sm:h-64" : "h-44"}`}>
        <Image
          src={project.images[0] || "/projects/placeholder.jpg"}
          alt={project.title}
          width={featured ? 800 : 400}
          height={featured ? 256 : 176}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080810]/90 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${category.color}`}
          >
            {category.icon} {category.name}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${
              project.status === "ongoing"
                ? "bg-emerald-500/80 text-white"
                : project.status === "completed"
                ? "bg-cyan-600/80 text-white"
                : "bg-amber-500/80 text-white"
            }`}
          >
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors line-clamp-1">
          {project.title}
        </h3>

        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
          <span className="flex items-center gap-1"><Calendar size={11} />{project.duration}</span>
          {project.teamSize && (
            <span className="flex items-center gap-1"><Users size={11} />{project.teamSize} members</span>
          )}
        </div>

        <p className="text-sm text-slate-400 line-clamp-2 mb-3 leading-relaxed">
          {project.description}
        </p>

        {/* Impact highlight */}
        <div className="mb-3 p-2.5 rounded-lg bg-cyan-500/8 border border-cyan-500/10">
          <div className="flex items-center gap-1.5 mb-0.5">
            <Target size={11} className="text-cyan-400" />
            <span className="text-xs font-medium text-cyan-300">Key Impact</span>
          </div>
          <p className="text-xs text-slate-400 line-clamp-1">{project.achievements[0]}</p>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, featured ? 5 : 3).map((tech) => (
            <span key={tech} className="tech-badge">{tech}</span>
          ))}
          {project.technologies.length > (featured ? 5 : 3) && (
            <span className="px-2 py-0.5 text-xs text-slate-500">
              +{project.technologies.length - (featured ? 5 : 3)}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-lg bg-white/[0.05] text-slate-400 hover:text-white hover:bg-white/[0.1] transition-all"
              >
                <Github size={14} />
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-lg bg-white/[0.05] text-slate-400 hover:text-white hover:bg-white/[0.1] transition-all"
              >
                <ExternalLink size={14} />
              </a>
            )}
            {project.links.video && (
              <a
                href={project.links.video}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-lg bg-white/[0.05] text-slate-400 hover:text-white hover:bg-white/[0.1] transition-all"
              >
                <Play size={14} />
              </a>
            )}
          </div>
          <span className="text-xs text-cyan-400 font-medium">View Details →</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderVisible = useIntersectionObserver(headerRef, { threshold: 0.1 });

  const filteredProjects = projectsData.filter(
    (p) => !activeCategory || p.category === activeCategory
  );

  const selectedProjectData = projectsData.find((p) => p.id === selectedProject);

  return (
    <section id="projects" className="section-bg-secondary py-20 sm:py-24 lg:py-28">
      <div className="container-width">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-label">Work</span>
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Innovative solutions spanning GenAI automation, computer vision, and enterprise applications.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isHeaderVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide"
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              !activeCategory
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                : "text-slate-500 hover:text-white hover:bg-white/[0.06]"
            }`}
          >
            All Projects
          </button>
          {Object.entries(projectCategories).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(activeCategory === key ? null : key)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === key
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "text-slate-500 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              featured={index === 0 && !activeCategory}
              onClick={() => setSelectedProject(project.id)}
            />
          ))}
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && selectedProjectData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0a0a14] border border-white/[0.1] rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto scrollbar-dark shadow-2xl"
              >
                <div className="p-6 sm:p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${
                            projectCategories[selectedProjectData.category].color
                          }`}
                        >
                          {projectCategories[selectedProjectData.category].icon}{" "}
                          {projectCategories[selectedProjectData.category].name}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                            selectedProjectData.status === "ongoing"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20"
                              : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/20"
                          }`}
                        >
                          {selectedProjectData.status.charAt(0).toUpperCase() +
                            selectedProjectData.status.slice(1)}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                        {selectedProjectData.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                        <span className="flex items-center gap-1.5"><Calendar size={14} />{selectedProjectData.duration}</span>
                        {selectedProjectData.teamSize && (
                          <span className="flex items-center gap-1.5"><Users size={14} />{selectedProjectData.teamSize} members</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all flex-shrink-0"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Impact Metrics */}
                  {selectedProjectData.impact && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                      {selectedProjectData.impact.map((metric, i) => (
                        <div key={i} className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/8 to-blue-500/8 border border-cyan-500/10 text-center">
                          <div className="text-2xl font-bold gradient-text mb-0.5">{metric.value}</div>
                          <div className="text-xs font-medium text-white mb-0.5">{metric.metric}</div>
                          <div className="text-xs text-slate-500">{metric.description}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Images */}
                  {selectedProjectData.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {selectedProjectData.images.slice(0, 2).map((img, i) => (
                        <div key={i} className="relative h-40 rounded-xl overflow-hidden">
                          <Image
                            src={img}
                            alt={`${selectedProjectData.title} screenshot ${i + 1}`}
                            width={400}
                            height={160}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white mb-2">Project Overview</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{selectedProjectData.longDescription}</p>
                  </div>

                  {/* Features & Achievements */}
                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                        <Zap size={14} className="text-cyan-400" /> Key Features
                      </h4>
                      <ul className="space-y-1.5">
                        {selectedProjectData.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                        <Target size={14} className="text-blue-400" /> Achievements
                      </h4>
                      <ul className="space-y-1.5">
                        {selectedProjectData.achievements.map((a, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <Code size={14} className="text-violet-400" /> Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProjectData.technologies.map((tech) => (
                        <span key={tech} className="tech-badge">{tech}</span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-3 pt-5 border-t border-white/[0.07]">
                    {selectedProjectData.links.github && (
                      <a
                        href={selectedProjectData.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1] text-sm text-slate-300 hover:text-white hover:border-cyan-500/30 transition-all"
                      >
                        <Github size={15} /> View Source
                      </a>
                    )}
                    {selectedProjectData.links.demo && (
                      <a
                        href={selectedProjectData.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-sm text-cyan-300 hover:text-cyan-200 transition-all"
                      >
                        <ExternalLink size={15} /> Live Demo
                      </a>
                    )}
                    {selectedProjectData.links.documentation && (
                      <a
                        href={selectedProjectData.links.documentation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1] text-sm text-slate-300 hover:text-white hover:border-cyan-500/30 transition-all"
                      >
                        <FileText size={15} /> Documentation
                      </a>
                    )}
                    {selectedProjectData.links.video && (
                      <a
                        href={selectedProjectData.links.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-300 hover:text-red-200 transition-all"
                      >
                        <Play size={15} /> Watch Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
