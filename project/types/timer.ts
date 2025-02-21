export interface Timer {
  id: string;
  name: string;
  duration: number;
  remainingTime: number;
  category: string;
  status: 'idle' | 'running' | 'paused' | 'completed';
  createdAt: number;
  completedAt?: number;
  halfwayAlert?: boolean;
}

export interface Category {
  id: string;
  name: string;
  expanded?: boolean;
}

export interface TimerLog {
  id: string;
  timerId: string;
  timerName: string;
  category: string;
  completedAt: number;
  duration: number;
}