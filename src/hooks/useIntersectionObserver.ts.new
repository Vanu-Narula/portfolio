'use client';

import { useState, useEffect, RefObject } from 'react';

interface IntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  root?: Element | null;
  freezeOnceVisible?: boolean;
}

/**
 * Hook to detect when an element intersects with the viewport
 * @param ref Reference to the element to observe
 * @param options IntersectionObserver options
 * @returns isIntersecting - Boolean indicating if element is intersecting
 */
export function useIntersectionObserver(
  ref: RefObject<Element>,
  options: IntersectionObserverOptions = {}
): boolean {
  const { threshold = 0.1, rootMargin = '0px', root = null, freezeOnceVisible = false } = options;
  
  const [isIntersecting, setIsIntersecting] = useState(false);
  const frozen = isIntersecting && freezeOnceVisible;

  useEffect(() => {
    const element = ref.current;
    if (!element || frozen) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);
    
    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, root, rootMargin, frozen]);

  return isIntersecting;
}
