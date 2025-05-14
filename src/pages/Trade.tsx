
import { useState, useEffect } from "react";
import { stocksData } from "@/data/stocksData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import StockCard from "@/components/StockCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Clock, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Trade = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [marketOpen, setMarketOpen] = useState(true);
  const [marketTime, setMarketTime] = useState(new Date());
  
  useEffect(() => {
    // Check market hours (simulated as 9:30 AM to 4:00 PM, Monday-Friday)
    const checkMarketStatus = () => {
      const now = new Date();
      const day = now.getDay();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      
      // Weekend check
      const isWeekday = day >= 1 && day <= 5;
      
      // Hours check (9:30 AM to 4:00 PM)
      const isMarketHours = 
        (hours > 9 || (hours === 9 && minutes >= 30)) && 
        hours < 16;
      
      setMarketOpen(isWeekday && isMarketHours);
      setMarketTime(now);
    };
    
    checkMarketStatus();
    const interval = setInterval(checkMarketStatus, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);
  
  let filteredStocks = stocksData.filter(
    stock => 
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      stock.ticker.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort stocks
  filteredStocks = [...filteredStocks].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "price":
        return b.price - a.price;
      case "priceAsc":
        return a.price - b.price;
      case "change":
        return b.change - a.change;
      default:
        return a.name.localeCompare(b.name);
    }
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 pb-20 md:pb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold">Trade Stocks</h1>
            <p className="text-gray-600">
              Buy and sell virtual stocks to grow your portfolio
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{marketTime.toLocaleTimeString()}</span>
            <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${marketOpen ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
              {marketOpen ? 'Market Open' : 'Market Closed'}
            </span>
          </div>
        </div>
        
        {!marketOpen && (
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              The market is currently closed. You can place trades, but they will be executed when the market opens (9:30 AM - 4:00 PM ET, Monday-Friday).
            </AlertDescription>
          </Alert>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 w-full mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search stocks..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select 
            value={sortBy} 
            onValueChange={setSortBy}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="price">Price (High-Low)</SelectItem>
              <SelectItem value="priceAsc">Price (Low-High)</SelectItem>
              <SelectItem value="change">Change % (High-Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStocks.map(stock => (
            <StockCard key={stock.id} stock={stock} showActions={true} marketOpen={marketOpen} />
          ))}
          
          {filteredStocks.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-gray-500">No stocks found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      <Navigation />
    </div>
  );
};

export default Trade;
