export interface EducationItem {
  id: string;
  type: 'degree' | 'certification' | 'course' | 'achievement';
  title: string;
  institution: string;
  duration: string;
  startYear: number;
  endYear: number;
  status: 'completed' | 'ongoing';
  description: string;
  details: string[];
  grade?: string;
  specialization?: string;
  thesis?: {
    title: string;
    description: string;
    technologies: string[];
    impact: string;
  };
  skills: string[];
  isHighlight: boolean;
}

export const educationData: EducationItem[] = [
  {
    id: 'mtech-cs',
    type: 'degree',
    title: 'Master of Technology (M.Tech)',
    institution: 'Punjabi University, Patiala',
    duration: '2014 - 2017',
    startYear: 2014,
    endYear: 2017,
    status: 'completed',
    description: 'Advanced degree in Computer Science with specialization in Machine Learning and Data Analytics',
    details: [
      'Completed while working full-time, demonstrating exceptional time management',
      'Specialized in Machine Learning algorithms and implementations',
      'Conducted research in predictive analytics and data science',
      'Published research work on machine learning applications'
    ],
    specialization: 'Computer Science',
    thesis: {
      title: 'Prediction of best selling books using machine learning approaches',
      description: 'Comprehensive research on applying machine learning algorithms to predict book sales success, analyzing various factors including author popularity, genre trends, and market dynamics.',
      technologies: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Statistical Analysis'],
      impact: 'Achieved 85% accuracy in predicting bestseller status, contributing to understanding of market prediction models'
    },
    skills: ['Machine Learning', 'Data Analytics', 'Research Methodology', 'Statistical Analysis', 'Python', 'Algorithm Design'],
    isHighlight: true
  },
  {
    id: 'btech-cs',
    type: 'degree',
    title: 'Bachelor of Technology (B.Tech)',
    institution: 'Punjab Technical University (Baba Banda Singh Bahadur Engineering College)',
    duration: '2005 - 2009',
    startYear: 2005,
    endYear: 2009,
    status: 'completed',
    description: 'Undergraduate degree in Computer Science with strong foundation in software engineering principles',
    details: [
      'Comprehensive study of computer science fundamentals',
      'Strong foundation in programming languages and software development',
      'Participated in technical projects and coding competitions',
      'Built solid understanding of computer systems and architecture'
    ],
    specialization: 'Computer Science',
    skills: ['Programming Fundamentals', 'Data Structures', 'Algorithms', 'Database Systems', 'Software Engineering', 'Computer Networks'],
    isHighlight: false
  },
  {
    id: 'oracle-certification',
    type: 'certification',
    title: 'Oracle PL/SQL Developer Certified Associate',
    institution: 'Oracle Corporation',
    duration: '2011',
    startYear: 2011,
    endYear: 2011,
    status: 'completed',
    description: 'Professional certification in Oracle database development and PL/SQL programming',
    details: [
      'Demonstrated expertise in Oracle database technologies',
      'Proficient in PL/SQL programming and optimization',
      'Understanding of database design and performance tuning',
      'Knowledge of advanced Oracle features and tools'
    ],
    skills: ['Oracle Database', 'PL/SQL', 'Database Design', 'Performance Tuning', 'SQL Optimization'],
    isHighlight: true
  },
  {
    id: 'self-learning-ai',
    type: 'achievement',
    title: 'Self-Directed AI/ML Specialization',
    institution: 'Continuous Learning & Professional Development',
    duration: '2016 - Present',
    startYear: 2016,
    endYear: new Date().getFullYear(),
    status: 'ongoing',
    description: 'Continuous self-learning journey in cutting-edge AI technologies and leadership development',
    details: [
      'Self-taught transition from traditional development to AI/ML',
      'Stayed ahead of technology curves through continuous learning',
      'Built expertise in GenAI and LLM technologies before mainstream adoption',
      'Developed leadership skills through practical experience and mentoring'
    ],
    skills: ['GenAI', 'LLMs', 'LangChain', 'Computer Vision', 'Deep Learning', 'Leadership', 'Technology Strategy'],
    isHighlight: true
  }
];

export const educationCategories = {
  degree: { name: 'Academic Degrees', icon: '🎓', color: 'from-blue-500 to-indigo-600' },
  certification: { name: 'Professional Certifications', icon: '📜', color: 'from-green-500 to-emerald-600' },
  course: { name: 'Specialized Courses', icon: '📚', color: 'from-purple-500 to-violet-600' },
  achievement: { name: 'Learning Achievements', icon: '🏆', color: 'from-orange-500 to-amber-600' }
};
