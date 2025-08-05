"use client";

import React, { useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import Section from "@/components/layout/Section";
import HeroSection from "@/components/sections/HeroSection";
import ScrollReveal from "@/components/animations/ScrollReveal";
import PageTransition from "@/components/animations/PageTransition";
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
    // Preload critical resources on client-side
    preloadCriticalResources();

    // Register service worker for offline support
    registerServiceWorker();
  }, []);

  return (
    <PageTransition transitionType="zoom" duration={0.6}>
      <PageLayout>
        <ScrollProgress />

        {/* Hero Section with Advanced Animations (not lazy loaded for fast LCP) */}
        <ScrollReveal direction="up">
          <HeroSection />
        </ScrollReveal>

        {/* Career Timeline Section */}
        <ScrollReveal direction="left" stagger={true}>
          <LazyWrapper>
            <DynamicTimelineSection />
          </LazyWrapper>
        </ScrollReveal>

        {/* Skills Visualization Network */}
        <ScrollReveal direction="scale" delay={0.2}>
          <LazyWrapper>
            <DynamicSkillsSection />
          </LazyWrapper>
        </ScrollReveal>

        {/* Projects Section */}
        <ScrollReveal direction="right">
          <LazyWrapper>
            <DynamicProjectsSection />
          </LazyWrapper>
        </ScrollReveal>

        {/* Achievements Section */}
        <ScrollReveal direction="up" delay={0.1}>
          <LazyWrapper>
            <DynamicAchievementsSection />
          </LazyWrapper>
        </ScrollReveal>

        {/* Education Section */}
        <ScrollReveal direction="left" stagger={true}>
          <section id="education">
            <LazyWrapper>
              <DynamicEducationSection />
            </LazyWrapper>
          </section>
        </ScrollReveal>

        {/* Contact Section */}
        <ScrollReveal direction="fade">
          <LazyWrapper>
            <DynamicContactSection />
          </LazyWrapper>
        </ScrollReveal>
      </PageLayout>
    </PageTransition>
  );
}
