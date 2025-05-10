
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { GameStockItem, StockMarketGame } from "@/types";
import { ArrowDownIcon, ArrowUpIcon, TrendingDown, TrendingUp } from "lucide-react";

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

  return (
    <div className="container mx-auto p-4">
      {!game.gameCompleted ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Stock Market Simulator</h2>
              <p className="text-gray-600">
                Trade stocks and build your portfolio over {game.maxDays} days
              </p>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">${game.cash.toFixed(2)}</div>
              <div className="text-sm text-gray-600">Available Cash</div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-semibold">Day {game.day} of {game.maxDays}</p>
                <div className="flex items-center">
                  <span className="text-sm mr-2">Market Trend:</span>
                  {game.marketTrend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                  {game.marketTrend === 'down' && <TrendingDown className="h-4 w-4 text-red-500" />}
                  {game.marketTrend === 'neutral' && <span className="text-sm text-gray-500">Neutral</span>}
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">Portfolio Value</p>
                <p>${getTotalValue().toFixed(2)}</p>
              </div>
            </div>
            <Progress value={(game.day / game.maxDays) * 100} className="h-2" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Stock Market</h3>
              <div className="space-y-4">
                {stocks.map((stock) => (
                  <Card 
                    key={stock.id} 
                    className={`cursor-pointer hover:shadow-md transition-shadow ${selectedStock?.id === stock.id ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setSelectedStock(stock)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold">{stock.symbol}</div>
                          <div className="text-sm text-gray-500">{stock.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">${stock.price.toFixed(2)}</div>
                          <div className={`text-sm flex items-center ${stock.price > stock.previousPrice ? 'text-green-500' : stock.price < stock.previousPrice ? 'text-red-500' : 'text-gray-500'}`}>
                            {stock.price > stock.previousPrice ? (
                              <><ArrowUpIcon className="h-3 w-3 mr-1" />{((stock.price - stock.previousPrice) / stock.previousPrice * 100).toFixed(1)}%</>
                            ) : stock.price < stock.previousPrice ? (
                              <><ArrowDownIcon className="h-3 w-3 mr-1" />{((stock.previousPrice - stock.price) / stock.previousPrice * 100).toFixed(1)}%</>
                            ) : '0%'}
                          </div>
                        </div>
                      </div>
                      {stock.shares > 0 && (
                        <div className="mt-2 text-sm">
                          <span className="text-blue-600 font-medium">You own: {stock.shares} shares</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Trading Panel</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedStock ? (
                    <>
                      <div className="flex justify-between">
                        <div>
                          <div className="font-bold">{selectedStock.symbol}</div>
                          <div className="text-sm text-gray-600">{selectedStock.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${selectedStock.price.toFixed(2)}</div>
                          <div className="text-sm">You own: {selectedStock.shares} shares</div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button 
                          variant={action === 'buy' ? 'default' : 'outline'} 
                          className="flex-1"
                          onClick={() => setAction('buy')}
                        >
                          Buy
                        </Button>
                        <Button 
                          variant={action === 'sell' ? 'default' : 'outline'} 
                          className="flex-1"
                          onClick={() => setAction('sell')}
                          disabled={selectedStock.shares === 0}
                        >
                          Sell
                        </Button>
                      </div>

                      <div>
                        <div className="flex items-center space-x-4">
                          <div className="flex-1">
                            <label className="text-sm font-medium mb-1 block">Quantity</label>
                            <Input
                              type="number"
                              min="0"
                              value={quantity}
                              onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                            />
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium mb-1">Total</div>
                            <div className="font-bold">${(selectedStock.price * quantity).toFixed(2)}</div>
                          </div>
                        </div>
                        {action === 'buy' && quantity > 0 && (
                          <div className="text-sm mt-2">
                            {game.cash >= selectedStock.price * quantity ? (
                              <span className="text-green-600">You have enough cash for this purchase.</span>
                            ) : (
                              <span className="text-red-500">You don't have enough cash for this purchase.</span>
                            )}
                          </div>
                        )}
                        {action === 'sell' && quantity > 0 && (
                          <div className="text-sm mt-2">
                            {selectedStock.shares >= quantity ? (
                              <span className="text-green-600">You have enough shares to sell.</span>
                            ) : (
                              <span className="text-red-500">You don't have enough shares to sell.</span>
                            )}
                          </div>
                        )}
                      </div>

                      <Button
                        className="w-full"
                        onClick={action === 'buy' ? handleBuy : handleSell}
                        disabled={(action === 'buy' && (quantity <= 0 || game.cash < selectedStock.price * quantity)) || 
                                 (action === 'sell' && (quantity <= 0 || selectedStock.shares < quantity))}
                      >
                        {action === 'buy' ? 'Buy Shares' : 'Sell Shares'}
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Select a stock to start trading</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Cash:</span>
                      <span className="font-medium">${game.cash.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Stocks Value:</span>
                      <span className="font-medium">${getPortfolioValue().toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between">
                      <span className="font-bold">Total Value:</span>
                      <span className="font-bold">${getTotalValue().toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={nextDay} className="w-full">
                    {game.day < game.maxDays ? `Advance to Day ${game.day + 1}` : 'Finish Game'}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Game Completed!</h2>
          <p className="mb-6">Final Portfolio Value: ${getTotalValue().toFixed(2)}</p>
          <Button onClick={resetGame}>Play Again</Button>
        </div>
      )}
    </div>
  );
};

export default StockMarketGameComponent;
