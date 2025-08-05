'use client'

import { useRef, useEffect, useState } from 'react'
import { PerformantIntersectionObserver, throttle } from '@/utils/performance'

interface UseOptimizedAnimationProps {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  disableOnMobile?: boolean
}

export function useOptimizedAnimation<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = '50px',
  triggerOnce = true,
  disableOnMobile = false
}: UseOptimizedAnimationProps = {}) {
  const elementRef = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const observerRef = useRef<PerformantIntersectionObserver | null>(null)

  // Check if mobile on mount
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIsMobile()
    
    const handleResize = throttle(() => {
      checkIsMobile()
    }, 100)
    
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    // Skip if should disable on mobile
    if (disableOnMobile && isMobile) {
      setIsVisible(true)
      setIsLoaded(true)
      return
    }

    if (!observerRef.current) {
      observerRef.current = new PerformantIntersectionObserver({
        threshold,
        rootMargin
      })
    }

    const currentObserver = observerRef.current
    const currentElement = elementRef.current

    if (currentElement) {
      currentObserver.observe(currentElement, () => {
        setIsVisible(true)
        setIsLoaded(true)
        
        if (triggerOnce && currentElement) {
          currentObserver.unobserve(currentElement)
        }
      })
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement)
      }
    }
  }, [threshold, rootMargin, triggerOnce, disableOnMobile, isMobile])

  return {
    elementRef,
    isVisible,
    isLoaded,
    isMobile
  }
}
