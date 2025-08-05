"use client";

import React from "react";
import { checkColorContrast } from "@/utils/accessibility";

export default function AccessibleText({
  text,
  foregroundColor,
  backgroundColor,
  className,
}: {
  text: string;
  foregroundColor: string;
  backgroundColor: string;
  className?: string;
}) {
  const contrast = checkColorContrast(foregroundColor, backgroundColor);
  const isAccessible = contrast >= 4.5; // WCAG AA standard for normal text

  return (
    <div className={className}>
      <p
        style={{ color: foregroundColor, backgroundColor: backgroundColor }}
        className="p-4 rounded"
      >
        {text}
      </p>
      <div className="mt-2 text-sm">
        <p>Contrast ratio: {contrast}</p>
        <p>
          {isAccessible ? (
            <span className="text-teal-500 dark:text-teal-400">
              ✓ Meets WCAG AA standards
            </span>
          ) : (
            <span className="text-red-500">
              ✗ Does not meet WCAG AA standards
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
