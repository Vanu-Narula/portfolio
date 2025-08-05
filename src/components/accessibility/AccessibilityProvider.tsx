"use client";

import { useEffect } from "react";
import {
  addAccessibilityFeatures,
  addFocusManagement,
} from "@/utils/accessibility";

export default function AccessibilityProvider() {
  useEffect(() => {
    // Initialize accessibility features
    addAccessibilityFeatures();
    addFocusManagement();
  }, []);

  return null;
}
