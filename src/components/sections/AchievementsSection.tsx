"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp, Award, Users, DollarSign, Zap, Clock, Save, Briefcase, Truck, X,
} from "lucide-react";
import { achievements } from "@/data/achievements";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import CountUp from "@/components/animations/CountUp";

const categoryConfig = {
  "cost-reduction": { name: "Cost Optimization", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  performance: { name: "Performance", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  efficiency: { name: "Efficiency", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
  "team-growth": { name: "Team Growth", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
};

const iconMap: Record<string, React.ReactNode> = {
  "dollar-sign": <DollarSign size={20} />,
  clock: <Clock size={20} />,
  save: <Save size={20} />,
  users: <Users size={20} />,
  truck: <Truck size={20} />,
  "trending-up": <TrendingUp size={20} />,
  zap: <Zap size={20} />,
  briefcase: <Briefcase size={20} />,
};

const accentGradients: Record<string, string> = {
  "cost-reduction": "from-emerald-500 to-teal-500",
  performance: "from-blue-500 to-cyan-500",
  efficiency: "from-violet-500 to-purple-500",
  "team-growth": "from-amber-500 to-orange-500",
};

function parseValue(value: string) {
  const num = parseInt(value);
  if (isNaN(num)) return null;
  const suffix = value.includes("%") ? "%" : value.includes("hrs") ? "+ hrs" : value.includes("+") ? "+" : "";
  return { end: num, suffix };
}

interface AchievementCardProps {
  achievement: (typeof achievements)[0];
  index: number;
  isSelected: boolean;
  isInView: boolean;
  onClick: () => void;
}

function AchievementCard({ achievement, index, isSelected, isInView, onClick }: AchievementCardProps) {
  const cat = categoryConfig[achievement.category as keyof typeof categoryConfig];
  const gradient = accentGradients[achievement.category] || "from-cyan-500 to-blue-500";
  const counter = parseValue(achievement.value);

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] }}
      onClick={onClick}
      className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
        isSelected
          ? "bg-white/[0.07] border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.1)]"
          : "bg-white/[0.04] border-white/[0.07] hover:bg-white/[0.06] hover:border-white/[0.14]"
      }`}
    >
      {/* Icon + Category */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white`}>
          {iconMap[achievement.icon] || <Award size={20} />}
        </div>
        {cat && (
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${cat.color} ${cat.bg} border ${cat.border}`}>
            {cat.name}
          </span>
        )}
      </div>

      {/* Value */}
      <div className={`text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-1`}>
        {counter ? (
          <CountUp end={counter.end} duration={2} suffix={counter.suffix} className="font-bold" />
        ) : (
          achievement.value
        )}
      </div>

      {/* Metric */}
      <div className="text-sm font-semibold text-white mb-2">{achievement.metric}</div>

      {/* Description */}
      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{achievement.description}</p>
    </motion.button>
  );
}

export default function AchievementsSection() {
  const [selectedAchievement, setSelectedAchievement] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.05 });

  const uniqueCategories = Array.from(new Set(achievements.map((a) => a.category).filter(Boolean)));

  const filteredAchievements = achievements.filter(
    (a) => !activeCategory || a.category === activeCategory
  );

  const selectedData = selectedAchievement !== null ? achievements[selectedAchievement] : null;

  return (
    <section id="achievements" ref={sectionRef} className="section-bg-secondary py-20 sm:py-24 lg:py-28">
      <div className="container-width">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-label">Impact</span>
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
            Leadership Impact
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Quantified achievements demonstrating consistent delivery of high-impact
            solutions, team leadership excellence, and innovative technology implementations.
          </p>
        </motion.div>

        {/* Summary stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
        >
          {[
            { label: "Achievements", value: `${achievements.length}`, icon: <Award size={18} />, color: "text-cyan-400" },
            { label: "Categories", value: `${uniqueCategories.length}`, icon: <Zap size={18} />, color: "text-blue-400" },
            { label: "Years of Impact", value: "15+", icon: <TrendingUp size={18} />, color: "text-violet-400" },
            { label: "Impact Level", value: "High", icon: <Users size={18} />, color: "text-amber-400" },
          ].map((stat, i) => (
            <div key={stat.label} className="card-dark p-4 text-center">
              <div className={`flex justify-center mb-1 ${stat.color}`}>{stat.icon}</div>
              <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex justify-center gap-2 mb-8 overflow-x-auto pb-1 scrollbar-hide"
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              !activeCategory
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                : "text-slate-500 hover:text-white hover:bg-white/[0.06]"
            }`}
          >
            All
          </button>
          {uniqueCategories.map((cat) => {
            const config = categoryConfig[cat as keyof typeof categoryConfig];
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    : "text-slate-500 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {config?.name || cat}
              </button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {filteredAchievements.map((achievement, index) => (
            <AchievementCard
              key={index}
              achievement={achievement}
              index={index}
              isSelected={selectedAchievement === index}
              isInView={isVisible}
              onClick={() => setSelectedAchievement(selectedAchievement === index ? null : index)}
            />
          ))}
        </div>

        {/* Detail panel */}
        <AnimatePresence>
          {selectedData !== null && selectedAchievement !== null && (
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
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accentGradients[selectedData.category] || "from-cyan-500 to-blue-500"} flex items-center justify-center text-white`}>
                      {iconMap[selectedData.icon] || <Award size={20} />}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{selectedData.metric}</h3>
                      <p className={`text-sm ${categoryConfig[selectedData.category as keyof typeof categoryConfig]?.color || "text-slate-400"}`}>
                        {categoryConfig[selectedData.category as keyof typeof categoryConfig]?.name}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedAchievement(null)}
                    className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/[0.06] transition-all"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <div className={`text-4xl font-bold bg-gradient-to-r ${accentGradients[selectedData.category] || "from-cyan-500 to-blue-500"} bg-clip-text text-transparent mb-3`}>
                      {selectedData.value}
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{selectedData.description}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-3">Implementation Details</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{selectedData.details}</p>
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
