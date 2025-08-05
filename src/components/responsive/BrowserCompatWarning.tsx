"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { getBrowserInfo } from "@/utils/browserSupport";

export default function BrowserCompatWarning() {
  const [isVisible, setIsVisible] = useState(false);
  const [browserInfo, setBrowserInfo] = useState<ReturnType<
    typeof getBrowserInfo
  > | null>(null);

  useEffect(() => {
    // Only show on client side
    const info = getBrowserInfo();
    setBrowserInfo(info);

    if (!info.isSupported) {
      // Check localStorage first to see if user dismissed this warning before
      const dismissed = localStorage.getItem("browser-warning-dismissed");
      if (!dismissed) {
        setIsVisible(true);
      }
    }
  }, []);

  const dismissWarning = () => {
    setIsVisible(false);
    localStorage.setItem("browser-warning-dismissed", "true");
  };

  if (!browserInfo || browserInfo.isSupported || !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-4 right-4 z-50 glass dark:glass-dark p-4 rounded-lg shadow-lg"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-red-600 dark:text-red-400">
                Browser Compatibility Warning
              </h3>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                Your browser ({browserInfo.name} {browserInfo.version}) may not
                fully support all features of this site. For the best
                experience, please use a modern browser like Chrome, Firefox, or
                Edge.
              </p>
              <div className="mt-3">
                <button
                  onClick={dismissWarning}
                  className="text-sm text-blue-500 dark:text-blue-400 hover:underline"
                >
                  Continue anyway
                </button>
              </div>
            </div>
            <button
              onClick={dismissWarning}
              className="ml-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
