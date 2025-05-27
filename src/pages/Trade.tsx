
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import StockCard from "@/components/StockCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, TrendingUp, AlertCircle } from "lucide-react";
import { stocksData } from "@/data/stocksData";
import { Stock } from "@/types";

const Trade = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [stocks, setStocks] = useState<Stock[]>(stocksData);
  const [marketOpen, setMarketOpen] = useState(true);

  // Check market hours (simulated for demo)
  useEffect(() => {
    const checkMarketHours = () => {
      const now = new Date();
      const day = now.getDay();
      const hours = now.getHours();
      
      // Market open weekdays 9 AM to 4 PM (simulated)
      const isWeekday = day >= 1 && day <= 5;
      const isMarketHours = hours >= 9 && hours < 16;
      
      setMarketOpen(isWeekday && isMarketHours);
    };
    
    checkMarketHours();
    const interval = setInterval(checkMarketHours, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Simulate real-time price updates
  useEffect(() => {
    if (!marketOpen) return;
    
    const interval = setInterval(() => {
      setStocks(prevStocks => 
        prevStocks.map(stock => {
          const changePercent = (Math.random() * 2 - 1) * 0.5; // ±0.5%
          const newPrice = parseFloat((stock.price * (1 + changePercent / 100)).toFixed(2));
          
          return {
            ...stock,
            price: newPrice,
            change: changePercent
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [marketOpen]);

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.ticker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStockClick = (stock: Stock) => {
    navigate(`/trade/${stock.id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <TrendingUp className="h-8 w-8" />
            <span>Stock Trading</span>
          </h1>
          
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            marketOpen 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
              : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100'
          }`}>
            {marketOpen ? '🟢 Market Open' : '🟡 Market Closed'}
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Find Stocks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Search by company name or ticker..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {!marketOpen && (
          <Card className="mb-6 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="font-medium text-amber-800 dark:text-amber-200">
                    Market is Currently Closed
                  </p>
                  <p className="text-sm text-amber-600 dark:text-amber-300">
                    Trading is available Monday-Friday, 9:00 AM - 4:00 PM. Prices shown are from the last trading session.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredStocks.map((stock) => (
            <StockCard
              key={stock.id}
              stock={stock}
              onClick={() => handleStockClick(stock)}
              showActions={true}
              marketOpen={marketOpen}
            />
          ))}
        </div>

        {filteredStocks.length === 0 && (
          <Card className="mt-6">
            <CardContent className="pt-6 text-center">
              <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">No stocks found</p>
              <p className="text-muted-foreground">
                Try searching with a different company name or ticker symbol.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
      
      <Footer />
      <Navigation />
    </div>
  );
};

export default Trade;
