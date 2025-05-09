
export interface Stock {
  id: string;
  name: string;
  ticker: string;
  price: number;
  change: number;
  description: string;
  industry: string;
  color: string;
  logoUrl: string;
}

export interface PortfolioItem {
  stockId: string;
  shares: number;
  averageCost: number;
}

export interface Transaction {
  id: string;
  stockId: string;
  shares: number;
  price: number;
  type: 'buy' | 'sell';
  date: Date;
}

export interface LessonContent {
  id: string;
  title: string;
  description: string;
  content: string;
  image?: string;
  quizQuestions?: QuizQuestion[];
  completed: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface UserProgress {
  completedLessons: string[];
  coins: number;
  level: number;
  experience: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  photoURL?: string;
  isAuthenticated: boolean;
}

export interface AchievementData {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

export interface StockNews {
  id: string;
  title: string;
  content: string;
  date: string;
  stockId?: string;
  impact: 'positive' | 'negative' | 'neutral';
}
