export interface PersonalInfo {
  name: string;
  currentRole: string;
  company: string;
  location: string;
  experience: string;
  teamSize: string;
  specialization: string;
  contact: {
    phone: string;
    email: string;
    linkedin: string;
    github: string;
  };
  summary: string;
}

export interface CareerPhase {
  id: string;
  company: string;
  role: string;
  duration: string;
  startYear: number;
  endYear: number;
  salaryGrowth: {
    baselineMultiplier: number; // e.g., 1.0 for starting, 1.15 for 15% growth
    yearOverYearGrowth: number; // percentage growth from previous year
    cumulativeGrowth: number; // total growth from career start
    isSignificantJump: boolean; // major company change
  };
  technologies: string[];
  achievements: string[];
  keyProjects: string[];
  teamSize?: number;
  isEntrepreneurship?: boolean;
  isLeadershipRole?: boolean;
}

export interface Skill {
  name: string;
  category: 'genai' | 'computer-vision' | 'leadership' | 'architecture' | 'database';
  proficiency: number; // 1-10 scale
  experience: string; // e.g., "5+ years"
  isCore: boolean;
  relatedSkills: string[];
}

export interface SkillNode {
  id: string;
  name: string;
  category: 'genai' | 'computer-vision' | 'leadership' | 'architecture' | 'database';
  proficiency: number; // 1-10
  experience: string;
  isCore: boolean;
  relatedSkills: string[];
  description: string;
  projects: string[];
}

export interface Project {
  id: string;
  title: string;
  duration: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  achievements: string[];
  challenges?: string[];
  solutions?: string[];
  images: string[];
  links: {
    github?: string;
    demo?: string;
    documentation?: string;
    video?: string;
  };
  category: 'genai' | 'computer-vision' | 'full-stack' | 'hardware';
  isFeatured: boolean;
  status: 'completed' | 'ongoing' | 'maintenance';
  teamSize?: number;
  impact?: {
    metric: string;
    value: string;
    description: string;
  }[];
}

export interface Achievement {
  metric: string;
  value: string;
  description: string;
  category: 'cost-reduction' | 'performance' | 'efficiency' | 'team-growth';
  icon: string;
  details: string;
}
