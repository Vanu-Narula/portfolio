"use client";

import { motion } from "framer-motion";
import { useResponsive } from "@/hooks/useResponsive";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  mobileLayout?: React.ReactNode;
  tabletLayout?: React.ReactNode;
  desktopLayout?: React.ReactNode;
}

export default function ResponsiveContainer({
  children,
  className = "",
  mobileLayout,
  tabletLayout,
  desktopLayout,
}: ResponsiveContainerProps) {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  const getLayout = () => {
    if (isMobile && mobileLayout) return mobileLayout;
    if (isTablet && tabletLayout) return tabletLayout;
    if (isDesktop && desktopLayout) return desktopLayout;
    return children;
  };

  return (
    <motion.div
      layout
      className={`responsive-container ${className}`}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {getLayout()}
    </motion.div>
  );
}

// Responsive grid component
interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    "2xl"?: number;
  };
  gap?: number;
}

export function ResponsiveGrid({
  children,
  className = "",
  cols = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = 6,
}: ResponsiveGridProps) {
  const { breakpoint } = useResponsive();

  const getCurrentCols = () => {
    return cols[breakpoint] || cols.lg || 4;
  };

  const gridClasses = [
    "grid",
    `grid-cols-${cols.xs || 1}`,
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
    cols["2xl"] && `2xl:grid-cols-${cols["2xl"]}`,
    `gap-${gap}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={gridClasses}>{children}</div>;
}
