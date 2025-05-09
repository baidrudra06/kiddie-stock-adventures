
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
  calculateTotalProfitLoss: () => { amount: number; percentage: number };
}

const defaultUserProgress: UserProgress = {
  completedLessons: [],
  coins: 0,
  level: 1,
  experience: 0,
  maxLevel: 100 // Allowing for levels up to 100
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
    
    // Add experience for trading
    addExperience(5);
    
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
    const originalCost = portfolioItem.averageCost * shares;
    const profit = revenue - originalCost;
    
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
    
    // Show appropriate message based on profit/loss
    if (profit > 0) {
      toast({
        title: "Stock Sold with Profit!",
        description: `You sold ${shares} shares of ${stock.name} for a profit of $${profit.toFixed(2)}.`,
        variant: "default",
      });
      
      // Award extra experience for profitable trades
      addExperience(10);
    } else if (profit < 0) {
      toast({
        title: "Stock Sold with Loss",
        description: `You sold ${shares} shares of ${stock.name} for a loss of $${Math.abs(profit).toFixed(2)}.`,
        variant: "destructive",
      });
      
      // Still award some experience
      addExperience(3);
    } else {
      toast({
        title: "Stock Sold at Break-Even",
        description: `You sold ${shares} shares of ${stock.name} for $${revenue.toFixed(2)}.`,
      });
      
      addExperience(5);
    }
    
    return true;
  };

  // Calculate total unrealized profit/loss for portfolio
  const calculateTotalProfitLoss = (): { amount: number; percentage: number } => {
    let totalCostBasis = 0;
    let totalCurrentValue = 0;
    
    portfolio.forEach(item => {
      const stock = getStockById(item.stockId);
      if (stock) {
        const costBasis = item.averageCost * item.shares;
        const currentValue = stock.price * item.shares;
        
        totalCostBasis += costBasis;
        totalCurrentValue += currentValue;
      }
    });
    
    const profitLossAmount = totalCurrentValue - totalCostBasis;
    const profitLossPercentage = totalCostBasis > 0 ? (profitLossAmount / totalCostBasis) * 100 : 0;
    
    return {
      amount: profitLossAmount,
      percentage: profitLossPercentage
    };
  };

  const getPortfolioValue = (): number => {
    return portfolio.reduce((total, item) => {
      const stock = getStockById(item.stockId);
      return total + (stock ? stock.price * item.shares : 0);
    }, 0);
  };

  // Helper function to add experience and handle level ups
  const addExperience = (amount: number) => {
    const newExperience = userProgress.experience + amount;
    const currentLevel = userProgress.level;
    
    // Experience required for next level increases with level
    // Level 1 requires 20 XP, Level 2 requires 40 XP, etc.
    const requiredXP = currentLevel * 20;
    
    if (newExperience >= requiredXP) {
      // Level up!
      const newLevel = Math.min(currentLevel + 1, userProgress.maxLevel || 100);
      
      setUserProgress(prev => ({
        ...prev,
        level: newLevel,
        experience: newExperience - requiredXP
      }));
      
      if (newLevel !== currentLevel) {
        toast({
          title: "Level Up!",
          description: `You've reached level ${newLevel}!`,
        });
        
        // Bonus coins for leveling up
        awardCoins(newLevel * 25);
      }
    } else {
      setUserProgress(prev => ({
        ...prev,
        experience: newExperience
      }));
    }
  };

  const completeLesson = (lessonId: string) => {
    if (userProgress.completedLessons.includes(lessonId)) return;
    
    setUserProgress(prev => ({
      ...prev,
      completedLessons: [...prev.completedLessons, lessonId],
    }));
    
    // Add experience for completing a lesson
    addExperience(15);
    
    // Award coins
    awardCoins(50);
    
    toast({
      title: "Lesson Complete!",
      description: "You earned 50 coins and 15 experience points.",
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
    resetGame,
    calculateTotalProfitLoss
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
