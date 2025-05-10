
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
  videoUrl?: string;
  lessonType: 'text' | 'video' | 'tutorial';
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  duration?: number; // in minutes
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface UserProgress {
  completedLessons: string[];
  coins: number;
  level: number;
  experience: number;
  maxLevel?: number; // Maximum level achievable, now supporting 50+
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

export interface TradingGame {
  id: string;
  title: string;
  description: string;
  image: string;
  difficulty: 'easy' | 'medium' | 'hard';
  minLevel: number;
  url: string;
}

export interface FinancialGame {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'quiz' | 'simulation' | 'puzzle' | 'story' | 'challenge';
  minLevel: number;
  path: string;
  icon: string;
  color: string;
  completed?: boolean;
}

export interface StockMarketGame {
  cash: number;
  portfolio: GameStockItem[];
  marketTrend: 'up' | 'down' | 'neutral';
  day: number;
  maxDays: number;
  gameCompleted: boolean;
}

export interface GameStockItem {
  id: string;
  name: string;
  symbol: string;
  price: number;
  previousPrice: number;
  shares: number;
  category: string;
}

export interface LemonadeStandGame {
  day: number;
  cash: number;
  inventory: {
    lemons: number;
    sugar: number;
    cups: number;
  };
  recipe: {
    lemons: number;
    sugar: number;
    price: number;
  };
  weather: 'sunny' | 'cloudy' | 'rainy';
  customers: number;
  gameCompleted: boolean;
}

export interface BudgetChallengeGame {
  week: number;
  maxWeeks: number;
  cash: number;
  income: number;
  expenses: BudgetExpense[];
  savings: number;
  goal: number;
  gameCompleted: boolean;
}

export interface BudgetExpense {
  id: string;
  name: string;
  amount: number;
  category: 'needs' | 'wants' | 'savings';
  required: boolean;
}

export interface FinancialQuizGame {
  currentQuestion: number;
  score: number;
  questions: FinancialQuizQuestion[];
  gameCompleted: boolean;
}

export interface FinancialQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}
