'use client'

import { useEffect, useRef, useState } from 'react'
import { useAnimation, useInView } from 'framer-motion'

export interface ScrollAnimationConfig {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  staggerChildren?: number
  delayChildren?: number
}

export function useScrollAnimation(config: ScrollAnimationConfig = {}) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, {
    amount: config.threshold || 0.3,
    once: config.triggerOnce !== false
  })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    } else if (!config.triggerOnce) {
      controls.start('hidden')
    }
  }, [isInView, controls, config.triggerOnce])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: config.staggerChildren || 0.1,
        delayChildren: config.delayChildren || 0
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    }
  }

  return { ref, controls, containerVariants, itemVariants, isInView }
}

export function useParallaxEffect(speed: number = 0.5) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return {
    transform: `translateY(${offset * speed}px)`
  }
}

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return mousePosition
}
