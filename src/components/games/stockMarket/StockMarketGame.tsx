
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { GameStockItem, StockMarketGame } from "@/types";
import GameHeader from "./GameHeader";
import ProgressBar from "./ProgressBar";
import StockList from "./StockList";
import TradingPanel from "./TradingPanel";
import PortfolioSummary from "./PortfolioSummary";
import GameComplete from "./GameComplete";

const initialStocks: GameStockItem[] = [
  { 
    id: "aapl", 
    name: "Apple Inc.", 
    symbol: "AAPL", 
    price: 150, 
    previousPrice: 145, 
    shares: 0, 
    category: "Technology" 
  },
  { 
    id: "msft", 
    name: "Microsoft Corp.", 
    symbol: "MSFT", 
    price: 250, 
    previousPrice: 255, 
    shares: 0,
    category: "Technology" 
  },
  { 
    id: "amzn", 
    name: "Amazon.com Inc.", 
    symbol: "AMZN", 
    price: 120, 
    previousPrice: 118, 
    shares: 0, 
    category: "Consumer Cyclical" 
  },
  { 
    id: "ko", 
    name: "Coca-Cola Co.", 
    symbol: "KO", 
    price: 60, 
    previousPrice: 62, 
    shares: 0, 
    category: "Consumer Defensive" 
  },
  { 
    id: "dis", 
    name: "Walt Disney Co.", 
    symbol: "DIS", 
    price: 90, 
    previousPrice: 88,  
    shares: 0, 
    category: "Communication Services" 
  },
];

const initialGameState: StockMarketGame = {
  cash: 10000,
  portfolio: [],
  marketTrend: 'neutral',
  day: 1,
  maxDays: 10,
  gameCompleted: false
};

const StockMarketGameComponent = ({ onComplete }: { onComplete: (coins: number) => void }) => {
  const { toast } = useToast();
  const [game, setGame] = useState<StockMarketGame>({ ...initialGameState });
  const [stocks, setStocks] = useState<GameStockItem[]>(initialStocks);
  const [selectedStock, setSelectedStock] = useState<GameStockItem | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [action, setAction] = useState<'buy' | 'sell'>('buy');

  // Calculate portfolio value
  const getPortfolioValue = () => {
    return stocks.reduce((total, stock) => {
      return total + (stock.price * stock.shares);
    }, 0);
  };

  const getTotalValue = () => {
    return getPortfolioValue() + game.cash;
  };

  // Advance to the next day
  const nextDay = () => {
    if (game.day >= game.maxDays) {
      endGame();
      return;
    }

    // Determine market trend (slightly biased towards up)
    const trends = ['up', 'up', 'neutral', 'down'] as const;
    const newTrend = trends[Math.floor(Math.random() * trends.length)];
    
    // Update stock prices based on trend and random fluctuation
    const updatedStocks = stocks.map(stock => {
      // Base change percentage
      let baseChange = 0;
      if (newTrend === 'up') baseChange = 0.02;
      else if (newTrend === 'down') baseChange = -0.02;
      
      // Random fluctuation between -5% and +5%
      const randomFluctuation = (Math.random() * 0.10) - 0.05;
      
      // Combined percentage change
      const changePercentage = baseChange + randomFluctuation;
      
      // Calculate new price (min $1)
      const previousPrice = stock.price;
      let newPrice = Math.max(stock.price * (1 + changePercentage), 1);
      newPrice = parseFloat(newPrice.toFixed(2));

      return {
        ...stock,
        previousPrice,
        price: newPrice
      };
    });

    setStocks(updatedStocks);
    setGame(prev => ({
      ...prev,
      day: prev.day + 1,
      marketTrend: newTrend
    }));

    toast({
      title: `Day ${game.day + 1}`,
      description: `The market is trending ${newTrend}. Check your stocks!`,
    });
  };

  // Handle buying stock
  const handleBuy = () => {
    if (!selectedStock || quantity <= 0) {
      toast({
        title: "Invalid Transaction",
        description: "Please select a stock and enter a valid quantity.",
        variant: "destructive"
      });
      return;
    }

    const cost = selectedStock.price * quantity;
    
    if (cost > game.cash) {
      toast({
        title: "Not enough cash",
        description: "You don't have enough cash for this purchase.",
        variant: "destructive"
      });
      return;
    }

    // Update cash and stock shares
    setGame(prev => ({
      ...prev,
      cash: prev.cash - cost
    }));
    
    setStocks(prev => prev.map(stock => 
      stock.id === selectedStock.id 
        ? { ...stock, shares: stock.shares + quantity } 
        : stock
    ));

    toast({
      title: "Stock Purchased",
      description: `You bought ${quantity} shares of ${selectedStock.symbol} for $${cost.toFixed(2)}.`
    });

    // Reset form
    setQuantity(0);
  };

  // Handle selling stock
  const handleSell = () => {
    if (!selectedStock || quantity <= 0) {
      toast({
        title: "Invalid Transaction",
        description: "Please select a stock and enter a valid quantity.",
        variant: "destructive"
      });
      return;
    }

    const stock = stocks.find(s => s.id === selectedStock.id);
    
    if (!stock || stock.shares < quantity) {
      toast({
        title: "Not enough shares",
        description: "You don't have enough shares to sell.",
        variant: "destructive"
      });
      return;
    }

    const revenue = selectedStock.price * quantity;
    
    // Update cash and stock shares
    setGame(prev => ({
      ...prev,
      cash: prev.cash + revenue
    }));
    
    setStocks(prev => prev.map(stock => 
      stock.id === selectedStock.id 
        ? { ...stock, shares: stock.shares - quantity } 
        : stock
    ));

    toast({
      title: "Stock Sold",
      description: `You sold ${quantity} shares of ${selectedStock.symbol} for $${revenue.toFixed(2)}.`
    });

    // Reset form
    setQuantity(0);
  };

  // End the game
  const endGame = () => {
    const finalValue = getTotalValue();
    const initialValue = initialGameState.cash;
    const percentGain = ((finalValue - initialValue) / initialValue) * 100;
    
    // Determine coins earned based on performance (between 20 and 100)
    const coinsEarned = Math.max(20, Math.min(100, Math.floor(percentGain * 2) + 50));
    
    setGame(prev => ({ ...prev, gameCompleted: true }));
    
    // Call the completion handler
    onComplete(coinsEarned);
    
    toast({
      title: "Game Completed!",
      description: `Final portfolio value: $${finalValue.toFixed(2)} (${percentGain.toFixed(2)}% gain). You earned ${coinsEarned} coins!`,
    });
  };

  // Reset the game
  const resetGame = () => {
    setGame({ ...initialGameState });
    setStocks(initialStocks);
    setSelectedStock(null);
    setQuantity(0);
    setAction('buy');
  };

  const stockMarketProps = {
    game,
    stocks,
    selectedStock,
    setSelectedStock,
    quantity,
    setQuantity,
    action,
    setAction,
    handleBuy,
    handleSell,
    nextDay,
    getPortfolioValue,
    getTotalValue,
    resetGame
  };

  return (
    <div className="container mx-auto p-4">
      {!game.gameCompleted ? (
        <>
          <GameHeader 
            cash={game.cash}
            totalValue={getTotalValue()}
          />

          <ProgressBar 
            day={game.day}
            maxDays={game.maxDays}
            marketTrend={game.marketTrend}
            portfolioValue={getTotalValue()}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Stock Market</h3>
              <StockList 
                stocks={stocks}
                selectedStockId={selectedStock?.id}
                onSelectStock={setSelectedStock}
              />
            </div>

            <div>
              <TradingPanel 
                selectedStock={selectedStock}
                action={action}
                setAction={setAction}
                quantity={quantity}
                setQuantity={setQuantity}
                handleBuy={handleBuy}
                handleSell={handleSell}
                cash={game.cash}
              />

              <PortfolioSummary 
                cash={game.cash}
                portfolioValue={getPortfolioValue()}
                totalValue={getTotalValue()}
                onNextDay={nextDay}
                day={game.day}
                maxDays={game.maxDays}
              />
            </div>
          </div>
        </>
      ) : (
        <GameComplete 
          totalValue={getTotalValue()}
          onReset={resetGame}
        />
      )}
    </div>
  );
};

export default StockMarketGameComponent;
