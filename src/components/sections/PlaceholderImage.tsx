"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function PlaceholderImage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Fix hydration mismatch by only rendering client-side elements after mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initial server rendering - static content only
  if (!isMounted) {
    return (
      <div className="w-full h-full rounded-full overflow-hidden bg-blue-500">
        <Image
          src="/images/vanraj-profile.jpg"
          alt="Vanraj Narula"
          fill
          sizes="(max-width: 640px) 100vw, 320px"
          className="object-cover"
          priority
        />
      </div>
    );
  }

  // Client-side rendering with animations
  return (
    <>
      {/* Show the actual profile image */}
      {!error && (
        <motion.div
          className="w-full h-full"
          animate={{ rotate: [0, 3, 0, -3, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        >
          <Image
            src="/images/vanraj-profile.jpg"
            alt="Vanraj Narula"
            fill
            sizes="(max-width: 640px) 100vw, 320px"
            className="object-cover rounded-full"
            priority
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setError(true);
              setIsLoading(false);
            }}
          />
        </motion.div>
      )}

      {/* Fallback SVG if image fails to load */}
      {(isLoading || error) && isMounted && (
        <svg
          width="320"
          height="320"
          viewBox="0 0 320 320"
          xmlns="http://www.w3.org/2000/svg"
          className={`${!isLoading && error ? "block" : "hidden"}`}
        >
          <defs>
            <linearGradient
              id="avatarGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#3b82f6", stopOpacity: 0.8 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#10b981", stopOpacity: 0.8 }}
              />
            </linearGradient>
          </defs>
          <rect width="320" height="320" rx="160" fill="url(#avatarGradient)" />
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="100"
            fontWeight="bold"
            fill="#ffffff"
          >
            VN
          </text>
        </svg>
      )}
    </>
  );
}
