"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Building2, TrendingUp, Award, ChevronRight, X, Calendar, Users } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { careerTimeline } from "@/data/career";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const companyAccents: Record<string, string> = {
  Cognizant: "#6366f1",
  "Own Enterprise": "#ef4444",
  Apropos: "#14b8a6",
  Hashbrown: "#f59e0b",
  WNS: "#06b6d4",
};

function getAccent(company: string) {
  return companyAccents[company] || "#94a3b8";
}

interface TimelineCardProps {
  phase: (typeof careerTimeline)[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}

function TimelineCard({ phase, index, isActive, onClick }: TimelineCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });
  const accent = getAccent(phase.company);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
      onClick={onClick}
      className="relative flex-shrink-0 w-72 sm:w-80 cursor-pointer group"
    >
      {/* Connection line (horizontal, desktop only) */}
      {index < careerTimeline.length - 1 && (
        <div className="absolute top-8 left-full w-8 h-px bg-gradient-to-r from-white/10 to-transparent hidden sm:block" />
      )}

      <div
        className={`relative rounded-2xl p-5 transition-all duration-300 ${
          isActive
            ? "bg-white/[0.07] border-2 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
            : "bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.14]"
        }`}
        style={{
          borderColor: isActive ? `${accent}60` : undefined,
          boxShadow: isActive ? `0 0 30px ${accent}20` : undefined,
        }}
      >
        {/* Top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
          style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
        />

        {/* Badges */}
        <div className="flex gap-2 mb-3 flex-wrap">
          {phase.isEntrepreneurship && (
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-500/15 text-red-400 border border-red-500/20">
              Entrepreneur
            </span>
          )}
          {phase.isLeadershipRole && (
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20">
              Leadership
            </span>
          )}
        </div>

        {/* Company */}
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{ background: `${accent}20` }}
          >
            <Building2 size={12} style={{ color: accent }} />
          </div>
          <span className="text-xs font-semibold" style={{ color: accent }}>
            {phase.company}
          </span>
        </div>

        {/* Role & Duration */}
        <h3 className="text-base font-bold text-white mb-1 leading-tight">{phase.role}</h3>
        <div className="flex items-center gap-1 text-xs text-slate-500 mb-4">
          <Calendar size={11} />
          {phase.duration}
        </div>

        {/* Growth metrics */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="p-2.5 rounded-lg bg-cyan-500/8 border border-cyan-500/10 text-center">
            <div className="text-sm font-bold text-cyan-400">
              +{phase.salaryGrowth.yearOverYearGrowth}%
            </div>
            <div className="text-xs text-slate-500">YoY Growth</div>
          </div>
          <div className="p-2.5 rounded-lg bg-violet-500/8 border border-violet-500/10 text-center">
            <div className="text-sm font-bold text-violet-400">
              {phase.technologies.length}
            </div>
            <div className="text-xs text-slate-500">Tech Stack</div>
          </div>
        </div>

        {/* Achievement preview */}
        <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {phase.achievements[0]}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {phase.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="px-2 py-0.5 text-xs rounded-md bg-white/[0.06] text-slate-400 border border-white/[0.06]">
              {tech}
            </span>
          ))}
          {phase.technologies.length > 3 && (
            <span className="px-2 py-0.5 text-xs text-slate-500">
              +{phase.technologies.length - 3}
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-cyan-400 font-medium">View Details</span>
          <ChevronRight size={14} className="text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}

function MobileTimelineCard({
  phase,
  index,
  isActive,
  onClick,
}: {
  phase: (typeof careerTimeline)[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });
  const accent = getAccent(phase.company);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative"
    >
      <div
        className="absolute -left-[1.65rem] top-4 w-3 h-3 rounded-full border-2 border-[#080810]"
        style={{ background: accent }}
      />
      <div onClick={onClick} className="card-dark p-4 cursor-pointer">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex gap-1.5 mb-1 flex-wrap">
              {phase.isEntrepreneurship && (
                <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-red-500/15 text-red-400 border border-red-500/20">
                  Entrepreneur
                </span>
              )}
              {phase.isLeadershipRole && (
                <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20">
                  Leadership
                </span>
              )}
            </div>
            <p className="text-xs font-semibold mb-0.5" style={{ color: accent }}>
              {phase.company}
            </p>
            <h3 className="text-sm font-bold text-white">{phase.role}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{phase.duration}</p>
          </div>
          <ChevronRight size={14} className="text-slate-600 mt-4 flex-shrink-0" />
        </div>
      </div>
    </motion.div>
  );
}

export default function TimelineSection() {
  const [activePhase, setActivePhase] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isHeaderVisible = useIntersectionObserver(headerRef, { threshold: 0.1 });
  const { scrollXProgress } = useScroll({ container: containerRef });
  const progressWidth = useTransform(scrollXProgress, [0, 1], ["0%", "100%"]);

  const chartData = careerTimeline.map((phase) => ({
    year: phase.startYear,
    growth: phase.salaryGrowth.cumulativeGrowth,
    company: phase.company,
  }));

  const scrollTimeline = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const amount = 340;
    containerRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const activePhaseData = careerTimeline.find((p) => p.id === activePhase);

  return (
    <section id="career" className="section-bg-secondary py-20 sm:py-24 lg:py-28">
      <div className="container-width">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">Career Journey</span>
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
            Career Evolution
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            15 years of technology leadership from Program Analyst to GenAI Expert,
            featuring{" "}
            <span className="text-cyan-400 font-medium">1150% career growth</span>.
          </p>
        </motion.div>

        {/* Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card-dark p-6 mb-12"
        >
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <TrendingUp size={18} className="text-cyan-400" />
            Career Growth Trajectory
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="year" stroke="#475569" tick={{ fontSize: 11, fill: "#475569" }} />
                <YAxis stroke="#475569" tick={{ fontSize: 11, fill: "#475569" }} tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  contentStyle={{
                    background: "#0f0f1a",
                    border: "1px solid rgba(6,182,212,0.2)",
                    borderRadius: "10px",
                    color: "#f1f5f9",
                    fontSize: "12px",
                  }}
                  formatter={(value) => [`${value}%`, "Cumulative Growth"]}
                  labelFormatter={(label) => `Year: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="growth"
                  stroke="#06b6d4"
                  strokeWidth={2.5}
                  dot={{ fill: "#06b6d4", r: 4, strokeWidth: 0 }}
                  activeDot={{ fill: "#06b6d4", r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Timeline — horizontal scroll desktop, vertical mobile */}

        {/* Desktop: Horizontal */}
        <div className="relative hidden sm:block">
          {/* Scroll progress bar */}
          <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06] rounded-full">
            <motion.div style={{ width: progressWidth }} className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
          </div>

          {/* Arrow buttons */}
          <button
            onClick={() => scrollTimeline("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-[#0f0f1a] border border-white/[0.1] text-slate-400 hover:text-white hover:border-cyan-500/30 transition-all shadow-xl"
            aria-label="Scroll left"
          >
            <ChevronRight size={16} className="rotate-180" />
          </button>
          <button
            onClick={() => scrollTimeline("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-[#0f0f1a] border border-white/[0.1] text-slate-400 hover:text-white hover:border-cyan-500/30 transition-all shadow-xl"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>

          <div
            ref={containerRef}
            className="flex gap-5 overflow-x-auto pt-6 pb-4 px-2 scrollbar-hide"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {careerTimeline.map((phase, index) => (
              <div key={phase.id} style={{ scrollSnapAlign: "start" }}>
                <TimelineCard
                  phase={phase}
                  index={index}
                  isActive={activePhase === phase.id}
                  onClick={() => setActivePhase(activePhase === phase.id ? null : phase.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="sm:hidden">
          <div className="relative pl-6">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-blue-500/30 to-transparent" />
            <div className="space-y-6">
              {careerTimeline.map((phase, index) => (
                <MobileTimelineCard
                  key={phase.id}
                  phase={phase}
                  index={index}
                  isActive={activePhase === phase.id}
                  onClick={() => setActivePhase(activePhase === phase.id ? null : phase.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {activePhase && activePhaseData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setActivePhase(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0a0a14] border border-white/[0.1] rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto scrollbar-dark shadow-2xl"
            >
              <div className="p-6 sm:p-8">
                {/* Modal header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p
                      className="text-sm font-semibold mb-1"
                      style={{ color: getAccent(activePhaseData.company) }}
                    >
                      {activePhaseData.company}
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      {activePhaseData.role}
                    </h3>
                    <p className="text-slate-400 text-sm">{activePhaseData.duration}</p>
                  </div>
                  <button
                    onClick={() => setActivePhase(null)}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all flex-shrink-0"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {[
                    { label: "YoY Growth", value: `+${activePhaseData.salaryGrowth.yearOverYearGrowth}%`, color: "text-cyan-400" },
                    { label: "Total Growth", value: `${activePhaseData.salaryGrowth.cumulativeGrowth}%`, color: "text-blue-400" },
                    { label: "Technologies", value: `${activePhaseData.technologies.length}`, color: "text-violet-400" },
                    ...(activePhaseData.teamSize
                      ? [{ label: "Team Size", value: `${activePhaseData.teamSize}`, color: "text-amber-400" }]
                      : []),
                  ].map((m) => (
                    <div key={m.label} className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.07] text-center">
                      <div className={`text-xl font-bold ${m.color}`}>{m.value}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <Award size={15} className="text-cyan-400" /> Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {activePhaseData.achievements.map((a, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                        <span className="text-sm text-slate-300 leading-relaxed">{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3">Technology Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {activePhaseData.technologies.map((tech) => (
                      <span key={tech} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>

                {/* Key Projects */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <TrendingUp size={15} className="text-blue-400" /> Key Projects
                  </h4>
                  <ul className="space-y-2">
                    {activePhaseData.keyProjects.map((p, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                        <span className="text-sm text-slate-300 leading-relaxed">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
