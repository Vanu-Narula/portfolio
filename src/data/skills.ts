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

export const skillCategories = {
  genai: { 
    name: 'GenAI & LLMs', 
    color: 'from-green-500 to-emerald-600',
    icon: '🤖'
  },
  'computer-vision': { 
    name: 'Computer Vision', 
    color: 'from-blue-500 to-cyan-600',
    icon: '👁️'
  },
  leadership: { 
    name: 'Leadership', 
    color: 'from-purple-500 to-violet-600',
    icon: '👥'
  },
  architecture: { 
    name: 'Architecture', 
    color: 'from-orange-500 to-amber-600',
    icon: '🏗️'
  },
  database: { 
    name: 'Databases', 
    color: 'from-indigo-500 to-blue-600',
    icon: '🗄️'
  }
};

export const skillsData: SkillNode[] = [
  // GenAI & LLMs
  {
    id: 'langchain',
    name: 'LangChain',
    category: 'genai',
    proficiency: 9,
    experience: '2+ years',
    isCore: true,
    relatedSkills: ['langraph', 'ai-agents', 'prompt-engineering'],
    description: 'Advanced framework for developing LLM applications',
    projects: ['LazyDeveloper', 'Automated Booking System']
  },
  {
    id: 'langraph',
    name: 'LangGraph',
    category: 'genai',
    proficiency: 8,
    experience: '1.5+ years',
    isCore: true,
    relatedSkills: ['langchain', 'ai-agents'],
    description: 'Workflow orchestration for complex AI agents',
    projects: ['GenAI Reflection Agent', 'Malkomai Integration']
  },
  {
    id: 'ai-agents',
    name: 'AI Agents',
    category: 'genai',
    proficiency: 9,
    experience: '2+ years',
    isCore: true,
    relatedSkills: ['langchain', 'prompt-engineering', 'llm-finetuning'],
    description: 'Autonomous AI systems with reflection capabilities',
    projects: ['Reflection-based Email Classification', 'Automated Decision Systems']
  },
  {
    id: 'prompt-engineering',
    name: 'Prompt Engineering',
    category: 'genai',
    proficiency: 9,
    experience: '3+ years',
    isCore: true,
    relatedSkills: ['ai-agents', 'llm-finetuning'],
    description: 'Optimizing AI interactions through strategic prompting',
    projects: ['Content Generation Platform', 'Customer Service Automation']
  },
  {
    id: 'llm-finetuning',
    name: 'LLM Fine-tuning',
    category: 'genai',
    proficiency: 7,
    experience: '1+ years',
    isCore: false,
    relatedSkills: ['ai-agents', 'prompt-engineering'],
    description: 'Custom model development and optimization',
    projects: ['Domain-specific Language Models', 'Business Process Automation']
  },

  // Computer Vision
  {
    id: 'opencv',
    name: 'OpenCV',
    category: 'computer-vision',
    proficiency: 8,
    experience: '4+ years',
    isCore: true,
    relatedSkills: ['emgucv', 'computer-vision', 'deep-learning'],
    description: 'Advanced image processing and computer vision',
    projects: ['Temperature Screening Terminal', 'Vehicle Counting System']
  },
  {
    id: 'computer-vision',
    name: 'Computer Vision',
    category: 'computer-vision',
    proficiency: 8,
    experience: '5+ years',
    isCore: true,
    relatedSkills: ['opencv', 'yolo', 'cnn'],
    description: 'Image analysis and pattern recognition systems',
    projects: ['Real-time Object Detection', 'Thermal Image Processing']
  },
  {
    id: 'yolo',
    name: 'YOLOv2',
    category: 'computer-vision',
    proficiency: 7,
    experience: '3+ years',
    isCore: false,
    relatedSkills: ['opencv', 'computer-vision', 'cnn'],
    description: 'Real-time object detection models',
    projects: ['Security Monitoring System', 'Automated Quality Control']
  },

  // Leadership & Management
  {
    id: 'team-leadership',
    name: 'Team Leadership',
    category: 'leadership',
    proficiency: 9,
    experience: '6+ years',
    isCore: true,
    relatedSkills: ['mentoring', 'project-management', 'strategic-planning'],
    description: 'Leading cross-functional teams of 4-8 members',
    projects: ['Product Training Programs', 'Process Automation Initiatives']
  },
  {
    id: 'mentoring',
    name: 'Mentoring',
    category: 'leadership',
    proficiency: 8,
    experience: '7+ years',
    isCore: true,
    relatedSkills: ['team-leadership', 'knowledge-transfer'],
    description: 'Developing technical talent and career growth',
    projects: ['Junior Developer Programs', 'Knowledge Transfer Sessions']
  },
  {
    id: 'strategic-planning',
    name: 'Strategic Planning',
    category: 'leadership',
    proficiency: 8,
    experience: '4+ years',
    isCore: true,
    relatedSkills: ['team-leadership', 'project-management'],
    description: 'Technology roadmap and business strategy development',
    projects: ['GenAI Implementation Strategy', 'Digital Transformation Planning']
  },

  // Architecture & Engineering
  {
    id: 'scalable-architecture',
    name: 'Scalable Architecture',
    category: 'architecture',
    proficiency: 8,
    experience: '8+ years',
    isCore: true,
    relatedSkills: ['performance-optimization', 'cicd', 'microservices'],
    description: 'Designing systems for growth and performance',
    projects: ['High-Performance Data Processing', 'Distributed AI Systems']
  },
  {
    id: 'cicd',
    name: 'CI/CD Pipelines',
    category: 'architecture',
    proficiency: 8,
    experience: '5+ years',
    isCore: true,
    relatedSkills: ['scalable-architecture', 'automation', 'gcp'],
    description: 'Automated deployment and integration workflows',
    projects: ['GCP Pipeline Implementation', 'Automated Testing Frameworks']
  },
  {
    id: 'performance-optimization',
    name: 'Performance Optimization',
    category: 'architecture',
    proficiency: 9,
    experience: '10+ years',
    isCore: true,
    relatedSkills: ['scalable-architecture', 'database-optimization'],
    description: 'System performance tuning and optimization',
    projects: ['400% Performance Improvement', 'Resource Utilization Optimization']
  },

  // Databases
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'database',
    proficiency: 8,
    experience: '6+ years',
    isCore: true,
    relatedSkills: ['database-optimization', 'data-pipelines'],
    description: 'Advanced relational database management',
    projects: ['Centralized Dashboard', 'Data Analytics Platform']
  },
  {
    id: 'pinecone',
    name: 'Pinecone',
    category: 'database',
    proficiency: 7,
    experience: '1+ years',
    isCore: false,
    relatedSkills: ['vector-databases', 'ai-agents'],
    description: 'Vector database for AI applications',
    projects: ['Semantic Search Systems', 'AI Knowledge Base']
  }
];
