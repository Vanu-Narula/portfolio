import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * Hook to trigger animations when an element scrolls into view
 * @param threshold Visibility threshold to trigger the animation (0-1)
 * @param triggerOnce Whether to trigger the animation only once
 * @returns Object containing ref to attach to the element and inView status
 */
export const useScrollAnimation = (threshold = 0.1, triggerOnce = true) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
  });

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  return { ref, inView, hasAnimated };
};

export default useScrollAnimation;
