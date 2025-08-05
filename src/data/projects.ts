import { Project } from '@/types/portfolio';

export const projectCategories = {
  genai: { name: 'GenAI & LLMs', color: 'from-green-500 to-emerald-600', icon: '🤖' },
  'computer-vision': { name: 'Computer Vision', color: 'from-blue-500 to-cyan-600', icon: '👁️' },
  'full-stack': { name: 'Full Stack', color: 'from-purple-500 to-violet-600', icon: '💻' },
  hardware: { name: 'Hardware Integration', color: 'from-orange-500 to-amber-600', icon: '🔧' }
};

export const projectsData: Project[] = [
  {
    id: 'lazydeveloper',
    title: 'LazyDeveloper',
    duration: 'May 2023 - Present',
    category: 'genai',
    description: 'Intelligent content generation platform using Streamlit and LangChain for personalized article creation.',
    longDescription: 'LazyDeveloper represents a breakthrough in AI-powered content creation, seamlessly integrating user professional profiles with advanced language models to generate highly personalized and relevant technical content. The platform leverages LinkedIn profile analysis to understand user expertise and interests, creating a tailored content generation experience.',
    technologies: ['LangChain', 'Streamlit', 'Python', 'PostgreSQL', 'OpenAI GPT', 'Vector Databases', 'FastAPI'],
    features: [
      'LinkedIn Profile Integration & Skill Analysis',
      'Dynamic Content Generation with Context Awareness',
      'Intelligent Topic Management System',
      'Real-time Paraphrasing Tool',
      'Secure Database Integration',
      'User Portfolio Management',
      'Content Quality Scoring',
      'Multi-format Export Options'
    ],
    achievements: [
      'Automated content creation reducing writing time by 70%',
      'Personalized content based on professional background',
      'Integrated multiple AI models for enhanced quality',
      'Built scalable architecture supporting concurrent users',
      'Implemented intelligent topic suggestion algorithms'
    ],
    challenges: [
      'Integrating LinkedIn API with rate limiting constraints',
      'Maintaining content originality across users',
      'Optimizing LangChain performance for real-time generation',
      'Building user-friendly interface for complex AI operations'
    ],
    solutions: [
      'Implemented intelligent caching and batch processing',
      'Developed content fingerprinting for uniqueness verification',
      'Optimized prompt engineering for consistent outputs',
      'Created intuitive Streamlit interface with progress indicators'
    ],
    images: [
      '/projects/lazydeveloper-dashboard.jpg',
      '/projects/lazydeveloper-generation.jpg',
      '/projects/lazydeveloper-management.jpg'
    ],
    links: {
      github: 'https://github.com/Vanu-Narula/LazyDeveloper',
      demo: 'https://lazydeveloper-demo.streamlit.app',
      documentation: 'https://docs.lazydeveloper.com'
    },
    isFeatured: true,
    status: 'ongoing',
    impact: [
      {
        metric: 'Time Saved',
        value: '70%',
        description: 'Reduction in content creation time'
      },
      {
        metric: 'User Engagement',
        value: '85%',
        description: 'User satisfaction with generated content'
      },
      {
        metric: 'Content Quality',
        value: '4.8/5',
        description: 'Average quality rating from users'
      }
    ]
  },
  {
    id: 'beacon',
    title: 'Beacon - Outdoor Advertisement Analytics',
    duration: 'Mar 2019 - Oct 2020',
    category: 'computer-vision',
    description: 'Revolutionary IoT-based system for measuring engagement with outdoor advertisements using computer vision and cellular data transfer.',
    longDescription: 'Beacon represents a cutting-edge integration of diverse technologies and IoT components designed to revolutionize how businesses measure engagement with outdoor advertisements. The system harnesses cellular networks to seamlessly transfer video data to the cloud, providing reliable solutions to gauge advertisement views and effectiveness. Built with a passionate team of 6 members, this project demonstrates the perfect fusion of hardware integration, computer vision, and cloud connectivity.',
    technologies: ['Python', 'MS-SQL', 'Raspberry Pi', 'Linux', 'IoT', 'OpenCV', 'Computer Vision', 'Cellular Networks', '3G/LTE', 'Visual Studio 2017', 'PyCharm'],
    features: [
      'Raspberry Pi with LTE 3G Hat Integration',
      'Mountable Camera System with Weather Protection',
      'Real-time Video Processing and Analysis',
      'Cellular Network Data Transfer to Cloud',
      'Computer Vision-based View Detection',
      'Advertisement Engagement Analytics',
      'Remote Monitoring and Management',
      'Scalable Cloud Storage and Processing'
    ],
    achievements: [
      'Successfully deployed IoT devices for outdoor advertisement monitoring',
      'Achieved reliable cellular data transmission in various environments',
      'Implemented accurate view counting using computer vision algorithms',
      'Built scalable cloud infrastructure for data processing',
      'Developed weather-resistant hardware mounting solutions',
      'Created comprehensive analytics dashboard for advertisement effectiveness'
    ],
    challenges: [
      'Ensuring reliable cellular connectivity in remote locations',
      'Developing weather-resistant outdoor deployment solutions',
      'Optimizing computer vision algorithms for varying lighting conditions',
      'Managing power consumption for extended outdoor operation',
      'Handling large volumes of video data transmission over cellular networks'
    ],
    solutions: [
      'Implemented adaptive cellular connection management with fallback options',
      'Designed ruggedized enclosures with proper ventilation and weatherproofing',
      'Developed adaptive image processing algorithms for different lighting conditions',
      'Created power management system with solar charging capabilities',
      'Built efficient video compression and selective transmission algorithms'
    ],
    images: [
      '/projects/beacon-hardware-setup.jpg',
      '/projects/beacon-dashboard.jpg',
      '/projects/beacon-deployment.jpg',
      '/projects/beacon-analytics.jpg'
    ],
    links: {
      documentation: 'https://hashbrown.com/blog/ooh/the-beacon-is-lit',
      video: 'https://www.youtube.com/watch?v=jaF9zTE0y5I'
    },
    isFeatured: true,
    status: 'completed',
    teamSize: 6,
    impact: [
      {
        metric: 'Deployment Scale',
        value: '25+',
        description: 'Advertisement locations monitored'
      },
      {
        metric: 'Data Accuracy',
        value: '94%',
        description: 'View detection accuracy in various conditions'
      },
      {
        metric: 'Cost Efficiency',
        value: '60%',
        description: 'Reduction in manual monitoring costs'
      }
    ]
  },
  {
    id: 'temperature-screening',
    title: 'Advanced Temperature Screening Terminal',
    duration: 'Mar 2020 - Feb 2021',
    category: 'hardware',
    description: 'COVID-19 contactless temperature screening system with thermal imaging and computer vision.',
    longDescription: 'Developed during the critical COVID-19 period, this innovative temperature screening terminal combines advanced thermal imaging technology with computer vision algorithms to provide accurate, contactless health screening for public spaces. The system represents a perfect fusion of hardware expertise and software intelligence.',
    technologies: ['C#', 'Python', 'FLIR Lepton 2.5', 'OpenCV', 'EmguCV', '.NET Framework', 'Computer Vision', 'Thermal Imaging', 'PostgreSQL'],
    features: [
      'Multi-Sensor Integration (Thermal + Visible Light)',
      'Contactless Temperature Detection',
      'Real-time Image Processing & Analysis',
      'Smart Proximity-based Activation',
      'Dual-Process Architecture',
      'Advanced Calibration System',
      'Comprehensive Data Logging',
      'Windows Application Interface'
    ],
    achievements: [
      'Accurate temperature readings from eye duct measurements',
      'Solved resolution mapping between different camera systems',
      'Implemented robust inter-process communication',
      'Achieved real-time performance with complex processing',
      'Deployed in multiple locations during pandemic',
      'Zero false-positive rate after calibration optimization'
    ],
    challenges: [
      'Different resolutions between thermal (128x128) and visible cameras',
      'Calibration accuracy for medical-grade measurements',
      'Real-time processing requirements',
      'Environmental interference (CO2 from breathing)',
      'Hardware-software integration complexity'
    ],
    solutions: [
      'Developed precise bounding box mapping algorithm',
      'Implemented Black Body testing and Flat-Field Correction',
      'Optimized asynchronous processing architecture',
      'Added intelligent filtering for environmental factors',
      'Created modular design for easy hardware swapping'
    ],
    images: [
      '/projects/temperature-terminal-setup.jpg',
      '/projects/thermal-imaging-demo.gif',
      '/projects/detection-interface.jpg',
      '/projects/calibration-process.jpg'
    ],
    links: {
      documentation: 'https://www.noixa.it/',
      video: 'https://www.youtube.com/watch?v=qnAXoRN-hS0'
    },
    isFeatured: true,
    status: 'completed',
    teamSize: 3,
    impact: [
      {
        metric: 'Accuracy',
        value: '99.5%',
        description: 'Temperature measurement accuracy'
      },
      {
        metric: 'Processing Speed',
        value: '<2s',
        description: 'Real-time detection and processing'
      },
      {
        metric: 'Deployment Scale',
        value: '15+',
        description: 'Locations deployed during COVID-19'
      }
    ]
  },
  {
    id: 'genai-integration-platform',
    title: 'GenAI Integration Platform',
    duration: 'Jan 2022 - Present',
    category: 'genai',
    description: 'Enterprise-grade GenAI integration system with LangGraph workflows and automated decision-making.',
    longDescription: 'A comprehensive GenAI platform that revolutionizes business process automation through intelligent agent workflows. Built using cutting-edge LangGraph framework, the system provides sophisticated AI-driven solutions for complex business scenarios with measurable cost reductions and efficiency gains.',
    technologies: ['LangGraph', 'LangChain', 'Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Kubernetes', 'Azure OpenAI', 'Pinecone'],
    features: [
      'Intelligent Email Classification & Processing',
      'Automated Booking Case Creation',
      'AI Agent Workflow Orchestration',
      'Real-time Decision Making Systems',
      'Enterprise Integration Capabilities',
      'Advanced Monitoring & Analytics',
      'Scalable Microservices Architecture',
      'Custom AI Model Fine-tuning'
    ],
    achievements: [
      '50% cost reduction compared to AWS Textract solutions',
      'Automated processing of 1000+ cases daily',
      'Reduced manual intervention by 80%',
      'Implemented reflection-based agent architecture',
      'Successfully integrated with multiple enterprise systems'
    ],
    challenges: [
      'Complex business logic integration',
      'Real-time processing requirements',
      'Enterprise security and compliance',
      'Scalability for high-volume processing'
    ],
    solutions: [
      'Implemented modular LangGraph workflow design',
      'Created efficient caching and processing pipelines',
      'Developed comprehensive security framework',
      'Built auto-scaling architecture with load balancing'
    ],
    images: [
      '/projects/genai-platform-dashboard.jpg',
      '/projects/workflow-builder.jpg',
      '/projects/analytics-dashboard.jpg'
    ],
    links: {
      documentation: 'https://internal-docs.wns.com/genai-platform'
    },
    isFeatured: true,
    status: 'ongoing',
    teamSize: 6,
    impact: [
      {
        metric: 'Cost Reduction',
        value: '50%',
        description: 'Compared to previous solutions'
      },
      {
        metric: 'Processing Volume',
        value: '1000+',
        description: 'Cases processed daily'
      },
      {
        metric: 'Automation Rate',
        value: '80%',
        description: 'Reduction in manual intervention'
      }
    ]
  },

  {
    id: "automated-booking",
    title: "Automated Booking System",
    duration: "2022-2023",
    description: "End-to-end reservation system with AI optimization for resource allocation",
    longDescription: "Created a sophisticated booking system that uses AI to optimize resource allocation, predict demand patterns, and automate the entire reservation process. The system includes dynamic pricing, customer segmentation, and intelligent scheduling to maximize efficiency and revenue.",
    technologies: ["Python", "React", "Node.js", "PostgreSQL", "TensorFlow", "AWS"],
    features: [
      "Predictive analytics for demand forecasting",
      "Dynamic pricing based on multiple variables",
      "Automated resource allocation and optimization",
      "Comprehensive reporting and analytics dashboard",
      "Customer segmentation and personalization"
    ],
    achievements: [
      "Increased booking efficiency by 35%",
      "Reduced manual intervention by 80%",
      "Improved resource utilization by 42%",
      "Implementation of system across 3 regions"
    ],
    challenges: [
      "Integrating multiple data sources with different formats",
      "Creating accurate prediction models for fluctuating demand",
      "Balancing automation with customer service needs",
      "Optimizing for both client satisfaction and business profitability"
    ],
    solutions: [
      "Built flexible data transformation pipelines",
      "Implemented ensemble ML models with continuous training",
      "Developed hybrid system with human oversight for edge cases",
      "Created configurable optimization parameters for business priorities"
    ],
    images: ["/projects/booking-system-1.jpg", "/projects/booking-system-2.jpg"],
    links: {
      github: "https://github.com/example/booking-system",
      demo: "https://booking.example.com"
    },
    category: "full-stack",
    isFeatured: false,
    status: "completed",
    teamSize: 5,
    impact: [
      {
        metric: "Efficiency",
        value: "35%",
        description: "Increase in booking processing efficiency"
      },
      {
        metric: "Utilization",
        value: "42%",
        description: "Improvement in resource utilization"
      },
      {
        metric: "Coverage",
        value: "3",
        description: "Business regions successfully implementing the system"
      }
    ]
  },
  {
    id: "pricing-optimization",
    title: "E-commerce Pricing Optimization",
    duration: "2015-2017",
    description: "ML-based system for dynamic pricing optimization across multiple platforms",
    longDescription: "Developed a machine learning system that analyzed market trends, competitor pricing, and historical sales data to provide optimal pricing recommendations for products across multiple e-commerce platforms. The system continuously learned from sales performance and adjusted strategies accordingly.",
    technologies: ["Python", "Machine Learning", "SQL", "Data Analysis", "E-commerce APIs"],
    features: [
      "Competitor price monitoring and analysis",
      "Demand elasticity modeling",
      "Automated price adjustment recommendations",
      "A/B testing framework for pricing strategies",
      "Platform-specific optimization algorithms"
    ],
    achievements: [
      "20% increase in sales revenue",
      "15% improvement in profit margins",
      "Successful integration with 5 major e-commerce platforms",
      "Reduction in manual pricing decisions by 90%"
    ],
    challenges: [
      "Processing large volumes of pricing data in real-time",
      "Accounting for seasonal and market fluctuations",
      "Developing accurate price elasticity models",
      "Balancing competitive pricing with profit margins"
    ],
    solutions: [
      "Built scalable data processing pipeline with batching",
      "Implemented time-series analysis with seasonal decomposition",
      "Created multi-variable regression models for elasticity",
      "Developed configurable profit threshold safeguards"
    ],
    images: ["/projects/pricing-system-1.jpg", "/projects/pricing-system-2.jpg"],
    links: {
      documentation: "https://internal.docs/pricing-optimization"
    },
    category: "full-stack",
    isFeatured: false,
    status: "maintenance",
    teamSize: 3,
    impact: [
      {
        metric: "Revenue",
        value: "+20%",
        description: "Increase in sales revenue"
      },
      {
        metric: "Profit",
        value: "+15%",
        description: "Improvement in profit margins"
      },
      {
        metric: "Efficiency",
        value: "90%",
        description: "Reduction in manual pricing decisions"
      }
    ]
  }
];
