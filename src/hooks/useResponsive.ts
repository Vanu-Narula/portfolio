'use client'

import { useState, useEffect } from 'react'

export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const

export type Breakpoint = keyof typeof breakpoints

export function useResponsive() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('lg')
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // Function to handle resize events
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      setWindowSize({ width, height })

      // Determine current breakpoint
      if (width >= breakpoints['2xl']) {
        setBreakpoint('2xl')
      } else if (width >= breakpoints.xl) {
        setBreakpoint('xl')
      } else if (width >= breakpoints.lg) {
        setBreakpoint('lg')
      } else if (width >= breakpoints.md) {
        setBreakpoint('md')
      } else if (width >= breakpoints.sm) {
        setBreakpoint('sm')
      } else {
        setBreakpoint('xs')
      }
    }

    // Set initial values
    handleResize()
    
    // Add event listener
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Helper functions for breakpoint checking
  const isBreakpoint = (bp: Breakpoint) => breakpoint === bp
  const isBreakpointUp = (bp: Breakpoint) => windowSize.width >= breakpoints[bp]
  const isBreakpointDown = (bp: Breakpoint) => windowSize.width < breakpoints[bp]
  const isMobile = isBreakpointDown('md')
  const isTablet = isBreakpoint('md') || isBreakpoint('lg')
  const isDesktop = isBreakpointUp('lg')

  return {
    breakpoint,
    windowSize,
    isBreakpoint,
    isBreakpointUp,
    isBreakpointDown,
    isMobile,
    isTablet,
    isDesktop
  }
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Initialize the state
    const media = window.matchMedia(query)
    setMatches(media.matches)

    // Add listener for changes
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener('change', listener)
    
    // Cleanup
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}
