
import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { PortfolioItem, Stock, Transaction, UserProgress } from '../types';
import { stocksData, getStockById } from '../data/stocksData';
import { lessonData } from '../data/lessonData';
import { useToast } from '@/components/ui/use-toast';

interface GameContextType {
  cash: number;
  setCash: (cash: number) => void;
  portfolio: PortfolioItem[];
  transactions: Transaction[];
  userProgress: UserProgress;
  buyStock: (stockId: string, shares: number) => boolean;
  sellStock: (stockId: string, shares: number) => boolean;
  completeLesson: (lessonId: string) => void;
  awardCoins: (amount: number) => void;
  getPortfolioValue: () => number;
  getStockShares: (stockId: string) => number;
  resetGame: () => void;
}

const defaultUserProgress: UserProgress = {
  completedLessons: [],
  coins: 0,
  level: 1,
  experience: 0
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [cash, setCash] = useState<number>(1000);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress>(defaultUserProgress);

  useEffect(() => {
    // Load saved game state from localStorage
    const savedCash = localStorage.getItem('ksa-cash');
    const savedPortfolio = localStorage.getItem('ksa-portfolio');
    const savedTransactions = localStorage.getItem('ksa-transactions');
    const savedProgress = localStorage.getItem('ksa-progress');

    if (savedCash) setCash(Number(savedCash));
    if (savedPortfolio) setPortfolio(JSON.parse(savedPortfolio));
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
    if (savedProgress) setUserProgress(JSON.parse(savedProgress));
  }, []);

  useEffect(() => {
    // Save game state to localStorage when it changes
    localStorage.setItem('ksa-cash', cash.toString());
    localStorage.setItem('ksa-portfolio', JSON.stringify(portfolio));
    localStorage.setItem('ksa-transactions', JSON.stringify(transactions));
    localStorage.setItem('ksa-progress', JSON.stringify(userProgress));
  }, [cash, portfolio, transactions, userProgress]);

  const getStockShares = (stockId: string): number => {
    const item = portfolio.find(item => item.stockId === stockId);
    return item ? item.shares : 0;
  };

  const buyStock = (stockId: string, shares: number): boolean => {
    const stock = getStockById(stockId);
    
    if (!stock) {
      toast({
        title: "Error",
        description: "Stock not found",
        variant: "destructive"
      });
      return false;
    }
    
    const cost = stock.price * shares;
    
    if (cost > cash) {
      toast({
        title: "Not enough money!",
        description: "You don't have enough money to buy these shares.",
        variant: "destructive"
      });
      return false;
    }
    
    // Update cash
    setCash(prev => prev - cost);
    
    // Add transaction
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      stockId,
      shares,
      price: stock.price,
      type: 'buy',
      date: new Date()
    };
    
    setTransactions(prev => [...prev, newTransaction]);
    
    // Update portfolio
    const existingItem = portfolio.find(item => item.stockId === stockId);
    
    if (existingItem) {
      // Update existing item
      const totalShares = existingItem.shares + shares;
      const totalCost = existingItem.averageCost * existingItem.shares + cost;
      const averageCost = totalCost / totalShares;
      
      setPortfolio(prev => prev.map(item => 
        item.stockId === stockId 
          ? { ...item, shares: totalShares, averageCost } 
          : item
      ));
    } else {
      // Add new item
      setPortfolio(prev => [
        ...prev,
        {
          stockId,
          shares,
          averageCost: stock.price
        }
      ]);
    }
    
    toast({
      title: "Stock Purchased!",
      description: `You bought ${shares} shares of ${stock.name}.`,
    });
    
    return true;
  };
  
  const sellStock = (stockId: string, shares: number): boolean => {
    const stock = getStockById(stockId);
    const portfolioItem = portfolio.find(item => item.stockId === stockId);
    
    if (!stock || !portfolioItem) {
      toast({
        title: "Error",
        description: "Stock not found in your portfolio",
        variant: "destructive"
      });
      return false;
    }
    
    if (portfolioItem.shares < shares) {
      toast({
        title: "Not enough shares",
        description: "You don't have enough shares to sell",
        variant: "destructive"
      });
      return false;
    }
    
    const revenue = stock.price * shares;
    
    // Update cash
    setCash(prev => prev + revenue);
    
    // Add transaction
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      stockId,
      shares,
      price: stock.price,
      type: 'sell',
      date: new Date()
    };
    
    setTransactions(prev => [...prev, newTransaction]);
    
    // Update portfolio
    if (portfolioItem.shares === shares) {
      // Remove item if selling all shares
      setPortfolio(prev => prev.filter(item => item.stockId !== stockId));
    } else {
      // Update shares count
      setPortfolio(prev => prev.map(item => 
        item.stockId === stockId 
          ? { ...item, shares: item.shares - shares } 
          : item
      ));
    }
    
    toast({
      title: "Stock Sold!",
      description: `You sold ${shares} shares of ${stock.name} for $${revenue.toFixed(2)}.`,
    });
    
    return true;
  };

  const getPortfolioValue = (): number => {
    return portfolio.reduce((total, item) => {
      const stock = getStockById(item.stockId);
      return total + (stock ? stock.price * item.shares : 0);
    }, 0);
  };

  const completeLesson = (lessonId: string) => {
    if (userProgress.completedLessons.includes(lessonId)) return;
    
    setUserProgress(prev => ({
      ...prev,
      completedLessons: [...prev.completedLessons, lessonId],
      experience: prev.experience + 10,
      coins: prev.coins + 50
    }));
    
    // Level up if enough experience
    if (userProgress.experience + 10 >= userProgress.level * 20) {
      setUserProgress(prev => ({
        ...prev,
        level: prev.level + 1
      }));
      
      toast({
        title: "Level Up!",
        description: `You've reached level ${userProgress.level + 1}!`,
      });
    }
    
    toast({
      title: "Lesson Complete!",
      description: "You earned 50 coins and 10 experience points.",
    });
  };

  const awardCoins = (amount: number) => {
    setUserProgress(prev => ({
      ...prev,
      coins: prev.coins + amount
    }));
    
    toast({
      title: "Coins Earned!",
      description: `You earned ${amount} coins!`,
    });
  };

  const resetGame = () => {
    setCash(1000);
    setPortfolio([]);
    setTransactions([]);
    setUserProgress(defaultUserProgress);
    
    toast({
      title: "Game Reset",
      description: "Your game has been reset to the beginning.",
    });
  };

  const value: GameContextType = {
    cash,
    setCash,
    portfolio,
    transactions,
    userProgress,
    buyStock,
    sellStock,
    completeLesson,
    awardCoins,
    getPortfolioValue,
    getStockShares,
    resetGame
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
