/**
 * Application constants
 */

export const APP_NAME = 'Vanraj Narula Portfolio';

export const NAVIGATION_ITEMS = [
  { id: 'hero', name: 'Home', href: '/#hero' },
  { id: 'career', name: 'Career', href: '/#career' },
  { id: 'skills', name: 'Skills', href: '/#skills' },
  { id: 'projects', name: 'Projects', href: '/#projects' },
  { id: 'achievements', name: 'Achievements', href: '/#achievements' },
  { id: 'contact', name: 'Contact', href: '/#contact' },
];

export const SOCIAL_LINKS = [
  { name: 'LinkedIn', href: 'https://linkedin.com/in/vanrajnarula', icon: 'linkedin' },
  { name: 'GitHub', href: 'https://github.com/vanrajnarula', icon: 'github' },
];

export const CAREER_PHASES = [
  { id: 'cognizant', label: 'Program Analyst' },
  { id: 'entrepreneurship', label: 'Entrepreneur' },
  { id: 'apropos', label: 'Software Engineer' },
  { id: 'hashbrown', label: 'Senior Software Developer' },
  { id: 'wns', label: 'Deputy Manager' },
];

export const SKILL_CATEGORIES = [
  { id: 'genai', label: 'Generative AI' },
  { id: 'computer-vision', label: 'Computer Vision' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'database', label: 'Database' },
];

export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.3,
    medium: 0.6,
    slow: 1.0,
  },
  easing: {
    smooth: [0.4, 0, 0.2, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
    elastic: [0.25, 0.46, 0.45, 0.94],
  },
  stagger: {
    children: 0.1,
    items: 0.05,
  }
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const SCROLL_CONFIG = {
  threshold: 0.3,
  rootMargin: '0px 0px -100px 0px',
} as const;
