import { CareerPhase } from '@/types/portfolio';

export const careerTimeline: CareerPhase[] = [
  {
    id: 'cognizant',
    company: 'Cognizant',
    role: 'Program Analyst',
    duration: '2010-2012',
    startYear: 2010,
    endYear: 2012,
    salaryGrowth: {
      baselineMultiplier: 1.0, // Starting baseline
      yearOverYearGrowth: 14.6,
      cumulativeGrowth: 14.6,
      isSignificantJump: false
    },
    technologies: ['C#.NET', 'MS-SQL', 'ASP.NET'],
    achievements: [
      'Automated 2 major processes reducing manual effort by 4 hours',
      'Improved SQL script effectiveness by 15%',
      'Developed process automation solutions'
    ],
    keyProjects: ['Enterprise Process Automation', 'SQL Optimization Scripts']
  },
  {
    id: 'entrepreneurship',
    company: 'Own Enterprise',
    role: 'Entrepreneur',
    duration: '2012-2014',
    startYear: 2012,
    endYear: 2014,
    salaryGrowth: {
      baselineMultiplier: 0, // Business loss period
      yearOverYearGrowth: -100,
      cumulativeGrowth: -100,
      isSignificantJump: false
    },
    technologies: ['Business Operations', 'Customer Relations', 'Service Management'],
    achievements: [
      'Gained entrepreneurial experience in service industry',
      'Learned customer relationship management',
      'Developed business operations understanding'
    ],
    keyProjects: ['Water Tank Cleaning Service Business'],
    isEntrepreneurship: true
  },
  {
    id: 'apropos',
    company: 'Apropos',
    role: 'Software Engineer',
    duration: '2014-2018',
    startYear: 2014,
    endYear: 2018,
    salaryGrowth: {
      baselineMultiplier: 2.3, // 130% recovery growth from baseline
      yearOverYearGrowth: 107,
      cumulativeGrowth: 130,
      isSignificantJump: true
    },
    technologies: ['C#.NET', 'MS-SQL', 'E-commerce Platforms', 'Machine Learning', 'Python'],
    achievements: [
      '30% increase in orders through platform optimization',
      '20% sales increase via pricing system improvements',
      'Successfully mentored 3 employees',
      'Integrated 5 new e-commerce platforms'
    ],
    keyProjects: ['E-commerce Platform Integration', 'Pricing Optimization System', 'ML Learning Initiative']
  },
  {
    id: 'hashbrown',
    company: 'Hashbrown',
    role: 'Senior Software Developer',
    duration: '2018-2021',
    startYear: 2018,
    endYear: 2021,
    salaryGrowth: {
      baselineMultiplier: 4.0, // 300% from baseline
      yearOverYearGrowth: 38.5,
      cumulativeGrowth: 300,
      isSignificantJump: true
    },
    technologies: ['Python', 'OpenCV', 'Computer Vision', 'Deep Learning', 'IoT', 'Neural Networks'],
    achievements: [
      '40% increase in product adoption through training programs',
      '30% improvement in team productivity',
      '400% performance improvement in data processing',
      'SaaS model development attracted 4 new clients',
      'University collaboration for hardware cost reduction'
    ],
    keyProjects: ['Temperature Screening Terminal', 'Computer Vision Systems', 'SaaS Product Development']
  },
  {
    id: 'wns',
    company: 'WNS',
    role: 'Deputy Manager',
    duration: '2021-Present',
    startYear: 2021,
    endYear: 2025,
    salaryGrowth: {
      baselineMultiplier: 12.5, // 1150% from baseline
      yearOverYearGrowth: 74.5,
      cumulativeGrowth: 1150,
      isSignificantJump: true
    },
    technologies: ['GenAI', 'LangChain', 'LangGraph', 'AI Agents', 'Python', 'PostgreSQL', 'Team Leadership'],
    achievements: [
      '50% cost reduction through GenAI integration vs AWS Textract',
      '80% reduction in data upload processing time',
      '50+ hours saved per week through automation',
      'Led teams of 4-8 members effectively',
      'CI/CD implementation saving 3 hours per deployment'
    ],
    keyProjects: ['GenAI Integration Platform', 'Automated Booking System', 'Team Leadership & Training'],
    teamSize: 8,
    isLeadershipRole: true
  }
];
