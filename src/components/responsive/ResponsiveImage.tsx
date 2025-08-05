"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useResponsive } from "@/hooks/useResponsive";
import {
  generateResponsiveSrcSet,
  getResponsiveImageSize,
  shouldPrioritizeImage,
  PLACEHOLDER_BLUR_DATA_URL,
} from "@/utils/responsiveImages";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

export default function ResponsiveImage({
  src,
  alt,
  width,
  height,
  className = "",
  sizes,
  priority: explicitPriority,
  fill = false,
  objectFit = "cover",
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { windowSize } = useResponsive();

  // Automatically determine priority based on image path
  const autoPriority = shouldPrioritizeImage(src);
  const priority =
    explicitPriority !== undefined ? explicitPriority : autoPriority;

  // Automatically determine sizes if not provided
  const autoSizes = getResponsiveImageSize(windowSize.width);
  const imageSizes = sizes || autoSizes;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading state overlay */}
      <motion.div
        className="absolute inset-0 bg-gray-100 dark:bg-gray-800"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
      </motion.div>

      {/* Actual image */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={imageSizes}
        priority={priority}
        fill={fill}
        className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ objectFit }}
        onLoad={() => setIsLoaded(true)}
        placeholder="blur"
        blurDataURL={PLACEHOLDER_BLUR_DATA_URL}
      />
    </div>
  );
}
