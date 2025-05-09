
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  ArrowLeft,
  BadgeDollarSign,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { useGameContext } from "@/contexts/GameContext";
import { getStockById } from "@/data/stocksData";
import { Stock } from "@/types";
import StockChart from "@/components/StockChart";
import { useToast } from "@/components/ui/use-toast";

const StockDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { buyStock, sellStock, cash, getStockShares } = useGameContext();
  const { toast } = useToast();
  const [stock, setStock] = useState<Stock | null>(null);
  const [shares, setShares] = useState<string>("1");
  const [tab, setTab] = useState("buy");
  
  useEffect(() => {
    if (id) {
      const fetchedStock = getStockById(id);
      if (fetchedStock) {
        setStock(fetchedStock);
      } else {
        navigate("/trade");
      }
    }
  }, [id, navigate]);
  
  if (!stock) {
    return null; // Loading state
  }
  
  const currentShares = getStockShares(stock.id);
  const parsedShares = parseInt(shares);
  const isValidAmount = !isNaN(parsedShares) && parsedShares > 0;
  const buyTotal = isValidAmount ? stock.price * parsedShares : 0;
  const sellTotal = isValidAmount ? stock.price * parsedShares : 0;
  const canBuy = isValidAmount && buyTotal <= cash;
  const canSell = isValidAmount && parsedShares <= currentShares;
  const isPositive = stock.change >= 0;
  
  const handleBuy = () => {
    if (canBuy && isValidAmount) {
      buyStock(stock.id, parsedShares);
      setShares("1");
    }
  };
  
  const handleSell = () => {
    if (canSell && isValidAmount) {
      sellStock(stock.id, parsedShares);
      setShares("1");
    }
  };
  
  const handleSharesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setShares(value);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 pb-20 md:pb-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/trade")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Stocks
        </Button>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Stock Info */}
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="text-4xl p-4 rounded-full" 
                    style={{ backgroundColor: `${stock.color}30` }}
                  >
                    {stock.logoUrl}
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">{stock.name}</h1>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">{stock.ticker}</span>
                      <span className="text-lg font-bold">${stock.price.toFixed(2)}</span>
                      <span className={`flex items-center ${isPositive ? "text-green-500" : "text-red-500"}`}>
                        {isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                        {Math.abs(stock.change).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="my-8">
                  <StockChart stockId={stock.id} color={stock.color} />
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="border rounded-md p-4">
                    <h3 className="text-sm text-gray-500 mb-1">Industry</h3>
                    <p className="font-medium">{stock.industry}</p>
                  </div>
                  <div className="border rounded-md p-4">
                    <h3 className="text-sm text-gray-500 mb-1">Current Shares</h3>
                    <p className="font-medium">{currentShares}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">About {stock.name}</h3>
                  <p className="text-gray-600">{stock.description}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Trading Panel */}
          <div>
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <BadgeDollarSign 
                    className="h-12 w-12 p-2 rounded-full" 
                    style={{ backgroundColor: `${stock.color}30`, color: stock.color }}
                  />
                </div>
                
                <h2 className="text-2xl font-bold text-center mb-4">Trade {stock.ticker}</h2>
                
                <Tabs value={tab} onValueChange={setTab}>
                  <TabsList className="grid grid-cols-2 mb-6">
                    <TabsTrigger value="buy">Buy</TabsTrigger>
                    <TabsTrigger value="sell">Sell</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="buy" className="mt-0">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Number of Shares</label>
                        <input
                          type="text"
                          value={shares}
                          onChange={handleSharesChange}
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      
                      <div className="border-t pt-4">
                        <div className="flex justify-between mb-2">
                          <span>Price per Share</span>
                          <span>${stock.price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span>Total Cost</span>
                          <span className="font-bold">${buyTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Available Cash</span>
                          <span>${cash.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <Button
                        onClick={handleBuy}
                        disabled={!canBuy}
                        className="w-full"
                        style={{ backgroundColor: stock.color }}
                      >
                        Buy {isValidAmount ? parsedShares : 0} {parsedShares === 1 ? "Share" : "Shares"}
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="sell" className="mt-0">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Number of Shares</label>
                        <input
                          type="text"
                          value={shares}
                          onChange={handleSharesChange}
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      
                      <div className="border-t pt-4">
                        <div className="flex justify-between mb-2">
                          <span>Price per Share</span>
                          <span>${stock.price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span>Total Value</span>
                          <span className="font-bold">${sellTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Current Shares</span>
                          <span>{currentShares}</span>
                        </div>
                      </div>
                      
                      <Button
                        onClick={handleSell}
                        disabled={!canSell}
                        className="w-full"
                        variant="secondary"
                      >
                        Sell {isValidAmount ? parsedShares : 0} {parsedShares === 1 ? "Share" : "Shares"}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
      <Navigation />
    </div>
  );
};

export default StockDetail;
