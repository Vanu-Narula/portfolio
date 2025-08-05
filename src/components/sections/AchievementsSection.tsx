"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Award,
  Users,
  Lightbulb,
  DollarSign,
  Zap,
  Clock,
  Save,
  Briefcase,
  Truck,
} from "lucide-react";
import { achievements } from "@/data/achievements";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import CountUp from "@/components/animations/CountUp";
import FloatingCard from "@/components/animations/FloatingCard";

const achievementCategories = {
  "cost-reduction": {
    name: "Cost Optimization",
    icon: <DollarSign size={16} />,
    color: "text-teal-500 dark:text-teal-400",
  },
  performance: {
    name: "Performance",
    icon: <Zap size={16} />,
    color: "text-blue-500",
  },
  efficiency: {
    name: "Efficiency",
    icon: <Clock size={16} />,
    color: "text-purple-500",
  },
  "team-growth": {
    name: "Team Growth",
    icon: <Users size={16} />,
    color: "text-orange-500",
  },
};

// Using our new CountUp component instead of custom AnimatedCounter

interface AchievementCardProps {
  achievement: (typeof achievements)[0];
  index: number;
  isSelected: boolean;
  onClick: () => void;
}

const AchievementCard = ({
  achievement,
  index,
  isSelected,
  onClick,
}: AchievementCardProps) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
  };

  const getIcon = () => {
    switch (achievement.icon) {
      case "dollar-sign":
        return (
          <DollarSign size={24} className="text-teal-500 dark:text-teal-400" />
        );
      case "clock":
        return <Clock size={24} className="text-blue-500" />;
      case "save":
        return <Save size={24} className="text-purple-500" />;
      case "users":
        return <Users size={24} className="text-orange-500" />;
      case "truck":
        return <Truck size={24} className="text-teal-500" />;
      case "trending-up":
        return <TrendingUp size={24} className="text-indigo-500" />;
      case "zap":
        return <Zap size={24} className="text-yellow-500" />;
      case "briefcase":
        return <Briefcase size={24} className="text-rose-500" />;
      default:
        return <Award size={24} className="text-blue-500" />;
    }
  };

  const getValue = () => {
    const numValue = parseInt(achievement.value);
    if (isNaN(numValue)) return achievement.value;

    if (achievement.value.includes("%")) {
      return { end: numValue, suffix: "%" };
    }
    if (achievement.value.includes("hrs") || achievement.value.includes("+")) {
      return { end: numValue, suffix: "+ hrs" };
    }
    return { end: numValue };
  };

  const counterProps = getValue();

  const getGradient = () => {
    switch (achievement.category) {
      case "cost-reduction":
        return "from-green-500 to-emerald-600";
      case "performance":
        return "from-blue-500 to-cyan-600";
      case "efficiency":
        return "from-purple-500 to-violet-600";
      case "team-growth":
        return "from-orange-500 to-amber-600";
      default:
        return "from-blue-500 to-indigo-600";
    }
  };

  return (
    <FloatingCard
      intensity={0.1}
      onClick={onClick}
      className={`h-full glass dark:glass-dark rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
        isSelected ? "ring-2 ring-blue-500 shadow-2xl" : "hover:shadow-xl"
      }`}
    >
      {/* Icon & Category */}
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getGradient()} flex items-center justify-center text-white`}
        >
          {getIcon()}
        </div>
        {achievement.category &&
          achievementCategories[achievement.category] && (
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium ${achievementCategories[achievement.category].color} bg-current/10`}
            >
              {achievementCategories[achievement.category].name}
            </div>
          )}
      </div>

      {/* Metric Value */}
      <div className="mb-3">
        <div
          className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${getGradient()} bg-clip-text text-transparent`}
        >
          {typeof counterProps === "object" ? (
            <CountUp
              end={counterProps.end}
              duration={2}
              suffix={counterProps.suffix || ""}
              className="font-bold"
            />
          ) : (
            counterProps
          )}
        </div>
        <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 mt-1">
          {achievement.metric}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-700 dark:text-slate-300 mb-4 line-clamp-2">
        {achievement.description}
      </p>

      {/* View Details */}
      <div className="flex items-center justify-end text-xs text-slate-600 dark:text-slate-400">
        <span className="flex items-center gap-1">
          <TrendingUp size={12} />
          View Details
        </span>
      </div>
    </FloatingCard>
  );
};

export default function AchievementsSection() {
  const [selectedAchievement, setSelectedAchievement] = useState<number | null>(
    null
  );
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(containerRef, { threshold: 0.3 });

  const filteredAchievements = achievements.filter(
    (achievement) => !activeCategory || achievement.category === activeCategory
  );

  // Calculate summary stats
  const stats = {
    totalAchievements: achievements.length,
    categoriesCount: Object.keys(achievementCategories).length,
    yearsOfImpact: "15 Years",
    avgImpact: "High Impact",
  };

  const getUniqueCategoriesFromData = () => {
    const categories = achievements.map((a) => a.category);
    return Array.from(new Set(categories)).filter(Boolean) as string[];
  };

  return (
    <section
      id="achievements"
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900/50"
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
            Leadership Impact
          </h2>
          <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            Quantified achievements demonstrating consistent delivery of
            high-impact solutions, team leadership excellence, and innovative
            technology implementations.
          </p>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              {
                label: "Total Achievements",
                value: stats.totalAchievements,
                icon: Award,
              },
              {
                label: "Impact Categories",
                value: stats.categoriesCount,
                icon: Lightbulb,
              },
              {
                label: "Years of Impact",
                value: stats.yearsOfImpact,
                icon: TrendingUp,
              },
              { label: "Impact Level", value: stats.avgImpact, icon: Zap },
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
                <stat.icon size={24} className="mx-auto mb-2 text-blue-500" />
                <div className="text-lg font-bold text-slate-800 dark:text-slate-200">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center gap-3 mb-12 overflow-x-auto pb-2"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              !activeCategory
                ? "bg-blue-500 text-white shadow-lg"
                : "glass dark:glass-dark hover:bg-blue-500/10"
            }`}
          >
            All Achievements
          </motion.button>
          {getUniqueCategoriesFromData().map((category) => {
            const categoryInfo = achievementCategories[
              category as keyof typeof achievementCategories
            ] || {
              name:
                category.charAt(0).toUpperCase() +
                category.slice(1).replace(/-/g, " "),
              icon: <Lightbulb size={16} />,
              color: "text-gray-500",
            };

            return (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  setActiveCategory(
                    activeCategory === category ? null : category
                  )
                }
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? "bg-blue-500 text-white shadow-lg"
                    : "glass dark:glass-dark hover:bg-blue-500/10"
                }`}
              >
                {categoryInfo.icon} {categoryInfo.name}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Achievements Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredAchievements.map((achievement, index) => (
            <AchievementCard
              key={index}
              achievement={achievement}
              index={index}
              isSelected={selectedAchievement === index}
              onClick={() =>
                setSelectedAchievement(
                  selectedAchievement === index ? null : index
                )
              }
            />
          ))}
        </motion.div>

        {/* Detailed Achievement View */}
        {selectedAchievement !== null && (
          <motion.div
            initial={{ opacity: 0, y: 30, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -30, height: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="mt-12 glass dark:glass-dark rounded-2xl p-8 overflow-hidden"
          >
            {(() => {
              const achievement = achievements[selectedAchievement];
              if (!achievement) return null;

              const getGradient = () => {
                switch (achievement.category) {
                  case "cost-reduction":
                    return "from-green-500 to-emerald-600";
                  case "performance":
                    return "from-blue-500 to-cyan-600";
                  case "efficiency":
                    return "from-purple-500 to-violet-600";
                  case "team-growth":
                    return "from-orange-500 to-amber-600";
                  default:
                    return "from-blue-500 to-indigo-600";
                }
              };

              const getIcon = () => {
                switch (achievement.icon) {
                  case "dollar-sign":
                    return <DollarSign size={32} className="text-white" />;
                  case "clock":
                    return <Clock size={32} className="text-white" />;
                  case "save":
                    return <Save size={32} className="text-white" />;
                  case "users":
                    return <Users size={32} className="text-white" />;
                  case "truck":
                    return <Truck size={32} className="text-white" />;
                  case "trending-up":
                    return <TrendingUp size={32} className="text-white" />;
                  case "zap":
                    return <Zap size={32} className="text-white" />;
                  case "briefcase":
                    return <Briefcase size={32} className="text-white" />;
                  default:
                    return <Award size={32} className="text-white" />;
                }
              };

              return (
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getGradient()} flex items-center justify-center text-white`}
                      >
                        {getIcon()}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                          {achievement.metric}
                        </h3>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          Professional Achievement
                        </div>
                      </div>
                    </div>

                    <div className="mb-6 p-6 bg-gradient-to-br from-blue-500/5 to-green-500/5 rounded-xl">
                      <div
                        className={`text-4xl font-bold bg-gradient-to-r ${getGradient()} bg-clip-text text-transparent mb-2`}
                      >
                        {achievement.value}
                      </div>
                      <p className="text-slate-700 dark:text-slate-300">
                        {achievement.description}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200">
                      Implementation Details
                    </h4>
                    <p className="text-slate-700 dark:text-slate-300">
                      {achievement.details}
                    </p>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </div>
    </section>
  );
}
