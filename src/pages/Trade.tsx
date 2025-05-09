
import { useState } from "react";
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
import { Search } from "lucide-react";

const Trade = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Trade Stocks</h1>
            <p className="text-gray-600">
              Buy and sell virtual stocks to grow your portfolio
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
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
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStocks.map(stock => (
            <StockCard key={stock.id} stock={stock} />
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
