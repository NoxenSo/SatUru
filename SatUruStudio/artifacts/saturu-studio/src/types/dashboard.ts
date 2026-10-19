export type ProjectStatus =
  | 'NEW'
  | 'DISCUSSION'
  | 'DESIGN'
  | 'DEVELOPMENT'
  | 'TESTING'
  | 'COMPLETED'
  | 'ARCHIVED';

export interface Project {
  id: string;
  title: string;
  description: string | null;
  status: ProjectStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  content: string;
  sender: 'CLIENT' | 'STUDIO';
  projectId: string;
  createdAt: string;
}

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  NEW: 'New',
  DISCUSSION: 'Discussion',
  DESIGN: 'Design',
  DEVELOPMENT: 'Development',
  TESTING: 'Testing',
  COMPLETED: 'Completed',
  ARCHIVED: 'Archived',
};

export const STATUS_COLORS: Record<ProjectStatus, string> = {
  NEW: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  DISCUSSION: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
  DESIGN: 'bg-purple-500/15 text-purple-400 border-purple-500/25',
  DEVELOPMENT: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/25',
  TESTING: 'bg-orange-500/15 text-orange-400 border-orange-500/25',
  COMPLETED: 'bg-green-500/15 text-green-400 border-green-500/25',
  ARCHIVED: 'bg-muted/40 text-muted-foreground border-border',
};
