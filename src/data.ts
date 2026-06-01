import { Project, Skill, TimelineEntry } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'shiptrack',
    title: 'ShipTrack',
    tag: 'production-grade',
    pitch: 'A dashboard that ships.',
    description: 'Built like a real product — 13+ reusable UI components, optimistic updates with rollback, CMD+K palette, full dark mode, unit + E2E tests, Storybook docs, and CI/CD on GitHub Actions.',
    stack: ['Next.js 15', 'TypeScript', 'TanStack Query', 'Zustand', 'MSW', 'Vitest', 'Playwright', 'Storybook', 'Tailwind', 'Radix UI'],
    featured: true,
    rotation: -2,
    note: "the one I'm proudest of",
    demoUrl: 'https://shipment-dashboard-amber.vercel.app/',
    githubUrl: 'https://github.com/Manish-Lulla',
    imageUrl: '/projects/shipment_project.png'
  },
  {
    id: 'docflow-ai',
    title: 'DocFlow-AI',
    tag: 'AI · full-stack',
    pitch: 'I made AI read documents so humans don\'t have to.',
    description: 'A full-stack tool that digitizes documents using vision LLMs. FastAPI backend, React frontend, Groq + LLaMA 4 Scout Vision for OCR.',
    stack: ['React', 'FastAPI', 'SQLAlchemy', 'Groq', 'LLaMA Vision', 'Tailwind', 'Recharts'],
    featured: true,
    rotation: 3,
    note: 'first time I shipped LLM vision in production — wild ride',
    demoUrl: 'https://doc-flow-ai-three.vercel.app/',
    githubUrl: 'https://github.com/Manish-Lulla',
    imageUrl: '/projects/docflow_ai.png'
  },
  {
    id: 'pro-mcq',
    title: 'Pro MCQ Test Platform',
    tag: 'AI · education',
    pitch: '1800+ MCQs. Gemini-powered feedback. Built for my own placement prep.',
    description: 'React + TS aptitude platform with 1800+ questions across Verbal, Numerical, and Logical Reasoning. Gemini AI gives context-aware feedback on wrong answers.',
    stack: ['React', 'TypeScript', 'Gemini', 'Tailwind'],
    featured: true,
    rotation: -3,
    note: 'built for myself, ended up using it daily',
    demoUrl: 'https://pro-mcq-test-platform.vercel.app',
    githubUrl: 'https://github.com/Manish-Lulla/pro_mcq_test_platform',
    imageUrl: '/projects/pro_mcq_platform.png'
  },
  {
    id: 'orbit-tracker',
    title: 'Orbit Tracker',
    tag: 'AI · productivity',
    pitch: 'Tell Orbit your goal. It breaks it into tasks and tracks the rest.',
    description: 'Project management with a Gemini-powered task generator. Analytics dashboard for progress, full local storage persistence — no backend, works offline.',
    stack: ['React', 'TypeScript', 'Gemini', 'Tailwind'],
    featured: true,
    rotation: 2,
    note: 'because notion was overkill for solo goals',
    demoUrl: 'https://orbit-tracker-sigma.vercel.app',
    githubUrl: 'https://github.com/Manish-Lulla/orbit_tracker',
    imageUrl: '/projects/orbit_task_tracker.png'
  },
  {
    id: 'freshershunt',
    title: 'FreshersHunt Scraper',
    tag: 'automation',
    pitch: 'Aggregates fresher job openings into one clean feed.',
    stack: ['Python', 'BeautifulSoup', 'Pandas'],
    featured: false,
    githubUrl: 'https://github.com/Manish-Lulla'
  },
  {
    id: 'job-scraper-ext',
    title: 'Job Scraper + Extension',
    tag: 'automation · extension',
    pitch: 'Python scraper + Chrome extension combo for job hunting.',
    stack: ['Python', 'JavaScript', 'Chrome Extension API'],
    featured: false,
    githubUrl: 'https://github.com/Manish-Lulla'
  },
  {
    id: 'screener-grabber',
    title: 'Stock Screener Grabber',
    tag: 'automation · data',
    pitch: '800+ records/day aggregated, deduplicated, filtered.',
    stack: ['Python', 'Pandas', 'REST APIs'],
    featured: false,
    githubUrl: 'https://github.com/Manish-Lulla/Screener-Grabber'
  },
  {
    id: 'banking-dash',
    title: 'Banking Analytics Dashboard',
    tag: 'data · analytics',
    pitch: 'Insights on loans, deposits, and engagement metrics.',
    stack: ['Python', 'Jupyter', 'Power BI'],
    featured: false,
    githubUrl: 'https://github.com/Manish-Lulla/Banking_Dashboard'
  },
  {
    id: 'customer-shopping',
    title: 'Customer Shopping Behaviour',
    tag: 'data · analytics',
    pitch: 'End-to-end analysis: Python → SQL → Power BI.',
    stack: ['Python', 'SQL', 'Power BI'],
    featured: false,
    githubUrl: 'https://github.com/Manish-Lulla/Customer_shopping_behaviour'
  },
  {
    id: 'goal-tracker',
    title: 'Goal Tracker',
    tag: 'frontend · productivity',
    pitch: 'A minimal app to actually finish what you start.',
    stack: ['React', 'Tailwind', 'LocalStorage'],
    featured: false
  },
  {
    id: 'ad-blocker',
    title: 'Ad-Blocker',
    tag: 'extension · systems',
    pitch: 'Custom blocker using declarativeNetRequest API.',
    stack: ['JavaScript', 'Manifest V3', 'Chrome Extensions'],
    featured: false
  }
];

export const SKILLS: Skill[] = [
  { name: 'React', category: 'frontend', note: 'current favorite' },
  { name: 'Next.js', category: 'frontend', note: 'used in ShipTrack' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'JavaScript', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'Python', category: 'backend' },
  { name: 'FastAPI', category: 'backend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Express', category: 'backend' },
  { name: 'SQLAlchemy', category: 'backend' },
  { name: 'MySQL', category: 'data' },
  { name: 'MongoDB', category: 'data' },
  { name: 'Pandas', category: 'data' },
  { name: 'Gemini API', category: 'ai' },
  { name: 'Groq', category: 'ai' },
  { name: 'LLaMA Vision', category: 'ai' },
  { name: 'Vitest', category: 'testing' },
  { name: 'Playwright', category: 'testing' },
  { name: 'Storybook', category: 'testing' },
  { name: 'Power BI', category: 'analytics' },
  { name: 'Tableau', category: 'analytics' },
  { name: 'Git', category: 'tools' },
  { name: 'Docker', category: 'tools', note: 'exploring' }
];

export const TIMELINE: TimelineEntry[] = [
  {
    year: '2026',
    title: 'Exams done, awaiting results',
    description: 'Just finished my final semester exams. Now actively job hunting.',
    type: 'achievement'
  },
  {
    year: '2022–2026',
    title: 'B.E. Information Technology',
    organization: 'Thadomal Shahani Engineering College',
    description: 'Four years of going from "Hello World" to shipping full-stack apps.',
    type: 'education'
  },
  {
    year: 'Along the way',
    title: 'Certified in Financial Portfolio Management',
    description: 'Picked up because I like understanding how things work — code, markets, systems, all of it.',
    type: 'achievement'
  },
  {
    year: '2022',
    title: 'HSC (Class 12)',
    organization: 'Smt. CHM College',
    description: '66% Score',
    type: 'education'
  },
  {
    year: '2020',
    title: 'SSC (Class 10)',
    organization: 'Fr. Agnel Multipurpose School',
    description: '86% Score',
    type: 'education'
  }
];