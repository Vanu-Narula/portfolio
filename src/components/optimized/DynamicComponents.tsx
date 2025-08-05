"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { motion } from "framer-motion";

// Dynamic imports with loading states
export const DynamicTimelineSection = dynamic(
  () => import("@/components/sections/TimelineSection"),
  {
    loading: () => <SectionSkeleton />,
    ssr: true,
  }
);

export const DynamicSkillsSection = dynamic(
  () => import("@/components/sections/SkillsSection"),
  {
    loading: () => <SectionSkeleton />,
    ssr: true,
  }
);

export const DynamicProjectsSection = dynamic(
  () => import("@/components/sections/ProjectsSection"),
  {
    loading: () => <SectionSkeleton />,
    ssr: true,
  }
);

export const DynamicAchievementsSection = dynamic(
  () => import("@/components/sections/AchievementsSection"),
  {
    loading: () => <SectionSkeleton />,
    ssr: true,
  }
);

export const DynamicEducationSection = dynamic(
  () => import("@/components/sections/EducationSection"),
  {
    loading: () => <SectionSkeleton />,
    ssr: true,
  }
);

export const DynamicContactSection = dynamic(
  () => import("@/components/sections/ContactSection"),
  {
    loading: () => <SectionSkeleton />,
    ssr: true,
  }
);

// Skeleton loader component
function SectionSkeleton() {
  return (
    <div className="section-padding">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="animate-pulse"
        >
          {/* Header Skeleton */}
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-96 mx-auto mb-4" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-2/3 mx-auto" />
          </div>

          {/* Content Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="space-y-4">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Lazy loading wrapper
interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function LazyWrapper({ children, fallback }: LazyWrapperProps) {
  return (
    <Suspense fallback={fallback || <SectionSkeleton />}>{children}</Suspense>
  );
}
