"use client";

import React, { useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import HeroSection from "@/components/sections/HeroSection";
import ScrollProgress from "@/components/animations/ScrollProgress";
import {
  preloadCriticalResources,
  registerServiceWorker,
} from "@/utils/performance";
import {
  DynamicTimelineSection,
  DynamicSkillsSection,
  DynamicProjectsSection,
  DynamicAchievementsSection,
  DynamicEducationSection,
  DynamicContactSection,
  LazyWrapper,
} from "@/components/optimized/DynamicComponents";

export default function HomePage() {
  useEffect(() => {
    preloadCriticalResources();
    registerServiceWorker();
  }, []);

  return (
    <PageLayout>
      <ScrollProgress />

      {/* Hero Section — not lazy loaded for fast LCP */}
      <HeroSection />

      {/* All other sections are lazy-loaded; they handle their own scroll animations */}
      <LazyWrapper>
        <DynamicTimelineSection />
      </LazyWrapper>

      <LazyWrapper>
        <DynamicSkillsSection />
      </LazyWrapper>

      <LazyWrapper>
        <DynamicProjectsSection />
      </LazyWrapper>

      <LazyWrapper>
        <DynamicAchievementsSection />
      </LazyWrapper>

      <LazyWrapper>
        <DynamicEducationSection />
      </LazyWrapper>

      <LazyWrapper>
        <DynamicContactSection />
      </LazyWrapper>
    </PageLayout>
  );
}
