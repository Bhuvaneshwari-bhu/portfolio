export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const skills = [
  { name: 'HTML5', icon: 'html', level: 95, color: '#e34f26', glow: 'rgba(227,79,38,0.4)' },
  { name: 'CSS3', icon: 'css', level: 90, color: '#264de4', glow: 'rgba(38,77,228,0.4)' },
  { name: 'JavaScript', icon: 'js', level: 88, color: '#f7df1e', glow: 'rgba(247,223,30,0.4)' },
  { name: 'React', icon: 'react', level: 92, color: '#61dafb', glow: 'rgba(97,218,251,0.4)' },
  { name: 'Node.js', icon: 'node', level: 82, color: '#339933', glow: 'rgba(51,153,51,0.4)' },
  { name: 'Express.js', icon: 'express', level: 80, color: '#ffffff', glow: 'rgba(255,255,255,0.2)' },
  { name: 'MongoDB', icon: 'mongo', level: 78, color: '#47a248', glow: 'rgba(71,162,72,0.4)' },
  { name: 'Tailwind CSS', icon: 'tailwind', level: 94, color: '#38bdf8', glow: 'rgba(56,189,248,0.4)' },
  { name: 'GitHub', icon: 'github', level: 88, color: '#ffffff', glow: 'rgba(255,255,255,0.2)' },
  { name: 'AI / Gen AI', icon: 'ai', level: 76, color: '#a855f7', glow: 'rgba(168,85,247,0.4)' },
];

export const projects = [
  {
    id: 1,
    title: 'NeuroChat — AI Chatbot Platform',
    description:
      'A full-stack AI-powered chatbot platform with real-time streaming, custom knowledge bases, and multi-model support. Built with React, Node.js, and OpenAI API.',
    longDescription:
      'NeuroChat is a production-ready AI chatbot platform enabling businesses to deploy intelligent assistants trained on their own data. Features include real-time streaming responses, conversation history, RAG pipeline, and an analytics dashboard.',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
    tech: ['React', 'Node.js', 'OpenAI', 'MongoDB', 'Socket.io', 'Tailwind'],
    github: 'https://github.com',
    live: 'https://example.com',
    video: null,
    color: '#6366f1',
    featured: true,
  },
  {
    id: 2,
    title: 'DevFlow — Project Management SaaS',
    description:
      'A Linear-inspired project management tool with Kanban boards, sprint planning, real-time collaboration, and GitHub integration.',
    longDescription:
      'DevFlow is a modern project management application designed for developer teams. It features drag-and-drop Kanban boards, sprint velocity tracking, GitHub PR integration, real-time updates via WebSockets, and a sleek dark UI.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80',
    tech: ['React', 'TypeScript', 'Express', 'PostgreSQL', 'Redis', 'Socket.io'],
    github: 'https://github.com',
    live: 'https://example.com',
    video: null,
    color: '#22d3ee',
    featured: true,
  },
  {
    id: 3,
    title: 'CropSense — AI Crop Disease Detector',
    description:
      'An AI-powered mobile-first web app that detects crop diseases from leaf images using a custom CNN model with 94% accuracy.',
    longDescription:
      'CropSense uses a fine-tuned EfficientNet model to identify 38 plant diseases from photos. It provides treatment recommendations, disease spread predictions, and integrates with local weather APIs to give farmers actionable insights.',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80',
    tech: ['React', 'Python', 'TensorFlow', 'FastAPI', 'Tailwind', 'MongoDB'],
    github: 'https://github.com',
    live: 'https://example.com',
    video: null,
    color: '#10b981',
    featured: false,
  },
  {
    id: 4,
    title: 'StoreX — E-Commerce Platform',
    description:
      'A feature-complete e-commerce solution with product catalog, cart management, Stripe payments, admin panel, and order tracking.',
    longDescription:
      'StoreX is a scalable MERN-stack e-commerce platform with JWT authentication, role-based access, Stripe payment gateway, real-time inventory management, and an admin dashboard with sales analytics.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux', 'Tailwind'],
    github: 'https://github.com',
    live: 'https://example.com',
    video: null,
    color: '#f59e0b',
    featured: false,
  },
  {
    id: 5,
    title: 'CodeForge — Online IDE',
    description:
      'A browser-based code editor with multi-language support, real-time execution, collaborative editing, and AI code suggestions.',
    longDescription:
      'CodeForge is a cloud-based IDE supporting 20+ languages with Docker-sandboxed execution, Monaco editor integration, real-time pair programming via WebRTC, and AI-powered autocomplete using the Codex API.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    tech: ['React', 'Monaco Editor', 'Docker', 'Node.js', 'WebRTC', 'Redis'],
    github: 'https://github.com',
    live: 'https://example.com',
    video: null,
    color: '#a855f7',
    featured: false,
  },
];

export const timeline = [
  {
    year: '2024 – Present',
    title: 'Frontend & AI Developer',
    org: 'Freelance / Open Source',
    desc: 'Building AI-integrated web apps, contributing to open source, and exploring LLM-powered product development.',
    icon: '🚀',
  },
  {
    year: '2023',
    title: 'Full Stack Intern',
    org: 'Tech Startup',
    desc: 'Developed REST APIs, built React dashboards, and integrated third-party services for a B2B SaaS product.',
    icon: '💼',
  },
  {
    year: '2022',
    title: 'Open Source Contributor',
    org: 'GitHub / GSOC Exploration',
    desc: 'Contributed to React and Node.js ecosystem projects. Learned DevOps basics including Docker and CI/CD pipelines.',
    icon: '🌍',
  },
  {
    year: '2020 – 2024',
    title: 'B.Tech Computer Science',
    org: 'University',
    desc: 'Specialized in AI/ML. Built 10+ projects. Active in coding clubs and hackathons.',
    icon: '🎓',
  },
];

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
  { label: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
  { label: 'Email', href: 'mailto:hello@portfolio.dev', icon: 'mail' },
];
