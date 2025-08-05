"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: string;
  className?: string;
  once?: boolean;
}

export default function CountUp({
  end,
  start = 0,
  duration = 2,
  delay = 0,
  prefix = "",
  suffix = "",
  decimals = 0,
  separator = ",",
  className = "",
  once = true,
}: CountUpProps) {
  const [count, setCount] = useState(start);
  const countRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(countRef, { once, amount: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || (once && hasAnimated)) return;

    let startTimestamp: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) {
        startTimestamp = timestamp + delay * 1000;
      }

      const elapsed = timestamp - startTimestamp;

      if (elapsed < 0) {
        requestAnimationFrame(step);
        return;
      }

      const progress = Math.min(elapsed / (duration * 1000), 1);
      const currentCount = Math.floor(start + (end - start) * progress);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setHasAnimated(true);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, start, end, duration, delay, once, hasAnimated]);

  const formatNumber = (num: number): string => {
    return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  };

  return (
    <div ref={countRef} className={className}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </div>
  );
}
