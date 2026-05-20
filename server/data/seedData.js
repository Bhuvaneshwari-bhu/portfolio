// ─────────────────────────────────────────────────────────────────────────────
// Seed data — Replace these placeholders with your real projects.
// You can also manage all projects from the Admin Dashboard at /admin.
// ─────────────────────────────────────────────────────────────────────────────

const seedProjects = [
  {
    title: 'Your Project 1 — Replace with Real Project',
    description:
      'Add your real project description here. What did you build? What problem does it solve? What makes it interesting?',
    longDescription:
      'Replace this with a detailed description of your project. Talk about the features, challenges you faced, and what you learned. You can edit this from the Admin Dashboard at /admin/projects.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    githubLink: 'https://github.com/your-username/your-repo',
    liveLink: '',
    videoDemoLink: '',
    category: 'Full Stack',
    featured: true,
    color: '#6366f1',
    order: 1,
  },
  {
    title: 'Your Project 2 — Add Your Deployed Project',
    description:
      'Describe your second project here. Include the key features and the tech stack you used to build it.',
    longDescription:
      'Add a detailed overview of this project. What technologies did you use and why? What were the key challenges? Edit this anytime from the Admin Dashboard.',
    image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&q=80',
    techStack: ['React', 'Express.js', 'MongoDB'],
    githubLink: 'https://github.com/your-username/your-repo',
    liveLink: '',
    videoDemoLink: '',
    category: 'Full Stack',
    featured: true,
    color: '#22d3ee',
    order: 2,
  },
  {
    title: 'Your Project 3 — AI / ML Project',
    description:
      'Built an AI-powered application? Add it here. Describe what the model does and how you integrated it into your web app.',
    longDescription:
      'Explain the AI/ML aspect of this project. What dataset or API did you use? What was the outcome? This is a great place to showcase your AI enthusiasm.',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
    techStack: ['Python', 'React', 'FastAPI', 'MongoDB'],
    githubLink: 'https://github.com/your-username/your-repo',
    liveLink: '',
    videoDemoLink: '',
    category: 'AI',
    featured: false,
    color: '#a855f7',
    order: 3,
  },
  {
    title: 'Your Project 4 — Frontend / UI Project',
    description:
      'Showcase a frontend or UI-focused project here. Highlight what makes the design or user experience special.',
    longDescription:
      'Describe the design decisions, animations, or UI patterns you used in this project. What inspired the look and feel? You can update this from the Admin Dashboard anytime.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
    techStack: ['React', 'Tailwind CSS', 'Framer Motion'],
    githubLink: 'https://github.com/your-username/your-repo',
    liveLink: '',
    videoDemoLink: '',
    category: 'Frontend',
    featured: false,
    color: '#10b981',
    order: 4,
  },
];

module.exports = seedProjects;
