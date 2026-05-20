const seedProjects = [
  {
    title: 'NeuroChat — AI Chatbot Platform',
    description:
      'A full-stack AI-powered chatbot platform with real-time streaming, custom knowledge bases, and multi-model support.',
    longDescription:
      'NeuroChat is a production-ready AI chatbot platform enabling businesses to deploy intelligent assistants trained on their own data. Features include real-time streaming responses, conversation history, RAG pipeline, and an analytics dashboard.',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
    techStack: ['React', 'Node.js', 'OpenAI', 'MongoDB', 'Socket.io', 'Tailwind'],
    githubLink: 'https://github.com',
    liveLink: 'https://example.com',
    videoDemoLink: '',
    category: 'AI',
    featured: true,
    color: '#6366f1',
    order: 1,
  },
  {
    title: 'DevFlow — Project Management SaaS',
    description:
      'A Linear-inspired project management tool with Kanban boards, sprint planning, real-time collaboration, and GitHub integration.',
    longDescription:
      'DevFlow is a modern project management application designed for developer teams. It features drag-and-drop Kanban boards, sprint velocity tracking, GitHub PR integration, real-time updates via WebSockets, and a sleek dark UI.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80',
    techStack: ['React', 'TypeScript', 'Express', 'PostgreSQL', 'Redis', 'Socket.io'],
    githubLink: 'https://github.com',
    liveLink: 'https://example.com',
    videoDemoLink: '',
    category: 'Full Stack',
    featured: true,
    color: '#22d3ee',
    order: 2,
  },
  {
    title: 'AI Resume Builder',
    description:
      'A GPT-4 powered resume builder that generates tailored, ATS-optimized resumes with one-click export to PDF.',
    longDescription:
      'AI Resume Builder leverages GPT-4 to generate professional, role-specific resumes from a structured form. It includes ATS keyword analysis, cover letter generation, real-time preview, and PDF/DOCX export. Built for job seekers who want to stand out.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80',
    techStack: ['React', 'OpenAI GPT-4', 'Node.js', 'Puppeteer', 'Tailwind', 'MongoDB'],
    githubLink: 'https://github.com',
    liveLink: 'https://example.com',
    videoDemoLink: '',
    category: 'AI',
    featured: true,
    color: '#a855f7',
    order: 3,
  },
  {
    title: 'StoreX — Modern E-Commerce Platform',
    description:
      'A feature-complete MERN-stack e-commerce solution with Stripe payments, admin dashboard, and real-time inventory.',
    longDescription:
      'StoreX is a scalable MERN-stack e-commerce platform with JWT authentication, role-based access, Stripe payment gateway, real-time inventory management, and an admin dashboard with sales analytics and order tracking.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux Toolkit', 'Tailwind'],
    githubLink: 'https://github.com',
    liveLink: 'https://example.com',
    videoDemoLink: '',
    category: 'Full Stack',
    featured: false,
    color: '#f59e0b',
    order: 4,
  },
  {
    title: 'CropSense — AI Crop Disease Detector',
    description:
      'An AI-powered mobile-first web app detecting crop diseases from leaf images with 94% accuracy using a custom CNN model.',
    longDescription:
      'CropSense uses a fine-tuned EfficientNet model to identify 38 plant diseases from photos. It provides treatment recommendations, disease spread predictions, and integrates with local weather APIs to give farmers actionable insights.',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80',
    techStack: ['React', 'Python', 'TensorFlow', 'FastAPI', 'Tailwind', 'MongoDB'],
    githubLink: 'https://github.com',
    liveLink: 'https://example.com',
    videoDemoLink: '',
    category: 'AI',
    featured: false,
    color: '#10b981',
    order: 5,
  },
  {
    title: 'CodeForge — Cloud IDE',
    description:
      'A browser-based code editor with multi-language support, Docker-sandboxed execution, and real-time pair programming.',
    longDescription:
      'CodeForge is a cloud-based IDE supporting 20+ languages with Docker-sandboxed execution, Monaco editor integration, real-time pair programming via WebRTC, and AI-powered autocomplete using the Codex API.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    techStack: ['React', 'Monaco Editor', 'Docker', 'Node.js', 'WebRTC', 'Redis'],
    githubLink: 'https://github.com',
    liveLink: 'https://example.com',
    videoDemoLink: '',
    category: 'Full Stack',
    featured: false,
    color: '#ec4899',
    order: 6,
  },
];

module.exports = seedProjects;
