export type Project = {
  id: string;
  title: string;
  tag: string;
  pitch: string;
  description?: string;
  stack: string[];
  note?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  rotation?: number;
  imageUrl?: string;
};

export type Skill = {
  name: string;
  category: 'frontend' | 'backend' | 'data' | 'ai' | 'testing' | 'analytics' | 'tools' | 'languages';
  note?: string;
};

export type TimelineEntry = {
  year: string;
  title: string;
  organization?: string;
  description: string;
  type: 'education' | 'career' | 'achievement';
};
