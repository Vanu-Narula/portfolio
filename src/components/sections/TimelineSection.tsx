"use client";

import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Building2,
  TrendingUp,
  Users,
  Award,
  ChevronRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { careerTimeline } from "@/data/career";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import FloatingCard from "@/components/animations/FloatingCard";
import GlowButton from "@/components/animations/GlowButton";

interface TimelineNodeProps {
  phase: (typeof careerTimeline)[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const TimelineNode = ({
  phase,
  index,
  isActive,
  onClick,
}: TimelineNodeProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(nodeRef, { threshold: 0.3 });

  const getCompanyColor = (company: string) => {
    const colors = {
      Cognizant: "from-indigo-500 to-indigo-600",
      "Own Enterprise": "from-red-500 to-red-600",
      Apropos: "from-teal-500 to-teal-600",
      Hashbrown: "from-amber-500 to-amber-600",
      WNS: "from-indigo-500 to-teal-500",
    };
    return (
      colors[company as keyof typeof colors] || "from-gray-500 to-gray-600"
    );
  };

  const nodeVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
        ease: "easeOut",
      },
    },
  } as const;

  return (
    <motion.div
      ref={nodeRef}
      variants={nodeVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className="relative flex-shrink-0 w-80 sm:w-96 pb-2" // Added pb-2 for badge space
    >
      {/* Timeline Line */}
      {index < careerTimeline.length - 1 && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }}
          className="absolute top-16 left-full w-24 h-0.5 bg-gradient-to-r from-indigo-500/50 to-transparent origin-left"
        />
      )}

      {/* FIXED: Badges positioned relative to outer container */}
      {phase.isEntrepreneurship && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg z-10">
          Entrepreneur
        </div>
      )}

      {phase.isLeadershipRole && (
        <div
          className={`absolute -top-2 bg-amber-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg z-10 ${
            phase.isEntrepreneurship ? "-right-24" : "-right-2"
          }`}
        >
          Leadership
        </div>
      )}

      {/* Main Card */}
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        onClick={onClick}
        className={`relative glass dark:glass-dark rounded-2xl p-6 cursor-pointer transition-all duration-300 mt-3 ${
          isActive ? "ring-2 ring-blue-500 shadow-xl" : "hover:shadow-lg"
        }`}
      >
        {/* Company Badge */}
        <div
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCompanyColor(phase.company)} mb-4`}
        >
          <Building2 size={12} className="mr-1" />
          {phase.company}
        </div>

        {/* Role & Duration */}
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-1">{phase.role}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {phase.duration}
          </p>
        </div>

        {/* Growth Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-gradient-to-br from-teal-500/10 to-teal-600/5 rounded-lg">
            <div className="text-lg font-bold text-teal-600">
              {phase.salaryGrowth.isSignificantJump ? "🚀" : "📈"}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              {phase.salaryGrowth.yearOverYearGrowth > 0 ? "+" : ""}
              {phase.salaryGrowth.yearOverYearGrowth}%
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              Growth
            </div>
          </div>

          <div className="text-center p-3 bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-lg">
            <div className="text-lg font-bold text-amber-600">
              {phase.technologies.length}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              Tech Stack
            </div>
          </div>
        </div>

        {/* Key Achievement Preview */}
        <div className="mb-4">
          <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2">
            {phase.achievements[0]}
          </p>
        </div>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {phase.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs bg-indigo-500/10 text-indigo-600 rounded-md"
            >
              {tech}
            </span>
          ))}
          {phase.technologies.length > 3 && (
            <span className="px-2 py-1 text-xs text-slate-600 dark:text-slate-400">
              +{phase.technologies.length - 3} more
            </span>
          )}
        </div>

        {/* Expand Button */}
        <motion.div
          className="flex items-center justify-between text-sm text-indigo-600"
          whileHover={{ x: 5 }}
        >
          <span>View Details</span>
          <ChevronRight size={16} />
        </motion.div>

        {/* No badge code here anymore - moved to outer container */}
      </motion.div>
    </motion.div>
  );
};

export default function TimelineSection() {
  const [activePhase, setActivePhase] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });
  const progressWidth = useTransform(scrollXProgress, [0, 1], ["0%", "100%"]);

  // Navigation functions for scrolling the timeline
  const scrollTimeline = (direction: "left" | "right") => {
    if (!containerRef.current) return;

    const scrollAmount = 400; // Adjust based on card width + gap
    const currentScroll = containerRef.current.scrollLeft;

    containerRef.current.scrollTo({
      left:
        direction === "left"
          ? Math.max(0, currentScroll - scrollAmount)
          : currentScroll + scrollAmount,
      behavior: "smooth",
    });
  };

  // Prepare chart data
  const chartData = careerTimeline.map((phase, index) => ({
    year: phase.startYear,
    growth: phase.salaryGrowth.cumulativeGrowth,
    company: phase.company,
    role: phase.role.split(" ")[0], // Short role name for chart
  }));

  return (
    <section
      id="career"
      className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-900"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
            Career Evolution
          </h2>
          <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
            15 years of technology leadership journey from Program Analyst to
            GenAI Expert, featuring{" "}
            <span className="font-semibold text-teal-600">
              1150% career growth
            </span>{" "}
            and continuous innovation across cutting-edge domains.
          </p>
        </motion.div>

        {/* Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="glass dark:glass-dark rounded-2xl p-6 mb-12"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">
            Career Growth Trajectory
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(59, 130, 246, 0.1)"
                />
                <XAxis
                  dataKey="year"
                  stroke="rgba(148, 163, 184, 0.8)"
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  stroke="rgba(148, 163, 184, 0.8)"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.95)",
                    border: "1px solid rgba(59, 130, 246, 0.2)",
                    borderRadius: "12px",
                    color: "#f8fafc",
                  }}
                  formatter={(value, name) => [
                    `${value}%`,
                    "Cumulative Growth",
                  ]}
                  labelFormatter={(label) => `Year: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="growth"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={(props) => {
                    const { cx, cy, payload } = props;
                    return payload.year === 2012 ? (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={6}
                        fill="#ef4444"
                        stroke="#ef4444"
                        strokeWidth={2}
                      />
                    ) : (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={6}
                        fill="#3b82f6"
                        stroke="#3b82f6"
                        strokeWidth={2}
                      />
                    );
                  }}
                  activeDot={(props) => {
                    const { cx, cy, payload } = props;
                    return (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={8}
                        fill={payload.year === 2012 ? "#ef4444" : "#3b82f6"}
                        stroke={payload.year === 2012 ? "#ef4444" : "#3b82f6"}
                        strokeWidth={2}
                      />
                    );
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Horizontal Timeline */}
        <div className="relative">
          {/* Progress Bar */}
          <div className="absolute top-16 left-0 right-0 h-0.5 bg-indigo-500/20 rounded-full">
            <motion.div
              style={{ width: progressWidth }}
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
            />
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
            <button
              onClick={() => scrollTimeline("left")}
              className="bg-white dark:bg-slate-800 shadow-lg rounded-full p-3 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Scroll left"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-slate-700 dark:text-slate-200"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          </div>

          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
            <button
              onClick={() => scrollTimeline("right")}
              className="bg-white dark:bg-slate-800 shadow-lg rounded-full p-3 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Scroll right"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-slate-700 dark:text-slate-200"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>

          {/* Timeline Container */}
          <div
            ref={containerRef}
            className="flex gap-8 overflow-x-auto pb-8 px-12 scrollbar-hide"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {careerTimeline.map((phase, index) => (
              <div key={phase.id} style={{ scrollSnapAlign: "center" }}>
                <TimelineNode
                  phase={phase}
                  index={index}
                  isActive={activePhase === phase.id}
                  onClick={() =>
                    setActivePhase(activePhase === phase.id ? null : phase.id)
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Detailed View Modal */}
        <AnimatePresence>
          {activePhase && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setActivePhase(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="glass dark:bg-slate-800/80 dark:text-slate-100 rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto border border-slate-200 dark:border-slate-700"
              >
                {(() => {
                  const phase = careerTimeline.find(
                    (p) => p.id === activePhase
                  );
                  if (!phase) return null;

                  return (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">
                            {phase.role}
                          </h3>
                          <p className="text-lg text-slate-700 dark:text-slate-200">
                            {phase.company} • {phase.duration}
                          </p>
                        </div>
                        <button
                          onClick={() => setActivePhase(null)}
                          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Growth Metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center p-4 bg-teal-500/10 rounded-lg">
                          <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                            +{phase.salaryGrowth.yearOverYearGrowth}%
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            YoY Growth
                          </div>
                        </div>
                        <div className="text-center p-4 bg-indigo-500/10 rounded-lg">
                          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                            {phase.salaryGrowth.cumulativeGrowth}%
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            Total Growth
                          </div>
                        </div>
                        <div className="text-center p-4 bg-amber-500/10 rounded-lg">
                          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                            {phase.technologies.length}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            Technologies
                          </div>
                        </div>
                        {phase.teamSize && (
                          <div className="text-center p-4 bg-orange-500/10 rounded-lg">
                            <div className="text-2xl font-bold text-orange-500 dark:text-orange-400">
                              {phase.teamSize}
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">
                              Team Size
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Achievements */}
                      <div className="mb-6">
                        <h4 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">
                          Key Achievements
                        </h4>
                        <ul className="space-y-2">
                          {phase.achievements.map((achievement, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <Award
                                size={16}
                                className="text-teal-500 dark:text-teal-400 mt-1 flex-shrink-0"
                              />
                              <span className="text-slate-700 dark:text-slate-300">
                                {achievement}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div className="mb-6">
                        <h4 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">
                          Technology Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {phase.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Projects */}
                      <div>
                        <h4 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">
                          Key Projects
                        </h4>
                        <ul className="space-y-2">
                          {phase.keyProjects.map((project, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <TrendingUp
                                size={16}
                                className="text-indigo-500 dark:text-indigo-400 mt-1 flex-shrink-0"
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
