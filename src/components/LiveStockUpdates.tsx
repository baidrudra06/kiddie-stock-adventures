
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, TrendingUp } from "lucide-react";
import { Stock, StockNews } from "@/types";
import { stocksData } from "@/data/stocksData";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

// Mock stock news data
const stockNewsItems: StockNews[] = [
  {
    id: "1",
    title: "Fruit Company launches new gadget!",
    content: "Fruit Company announced a revolutionary new gadget today that experts believe will boost sales.",
    date: new Date().toISOString(),
    stockId: "1",
    impact: "positive"
  },
  {
    id: "2",
    title: "Soda Pop faces supply chain issues",
    content: "Soda Pop is experiencing temporary supply chain disruptions that may affect quarterly results.",
    date: new Date().toISOString(),
    stockId: "2",
    impact: "negative"
  },
  {
    id: "3",
    title: "Toy Blocks opens new factory",
    content: "Toy Blocks celebrated the grand opening of their new factory, which will increase production capacity.",
    date: new Date().toISOString(),
    stockId: "3",
    impact: "positive"
  },
  {
    id: "4",
    title: "Market analysts recommend diversification",
    content: "Leading experts suggest young investors should diversify their portfolios across different industries.",
    date: new Date().toISOString(),
    impact: "neutral"
  },
  {
    id: "5",
    title: "Rocket Ships secures major contract",
    content: "Rocket Ships announced a new contract to build space exploration vehicles.",
    date: new Date().toISOString(),
    stockId: "5",
    impact: "positive"
  }
];

const LiveStockUpdates = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [liveStocks, setLiveStocks] = useState<Stock[]>(stocksData.slice(0, 5));
  const [activeNews, setActiveNews] = useState<StockNews>(stockNewsItems[0]);
  const [newsIndex, setNewsIndex] = useState(0);

  // Simulate live stock price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStocks(prevStocks => 
        prevStocks.map(stock => {
          // Random price change between -3% and 3%
          const changePercent = (Math.random() * 6 - 3);
          const newPrice = parseFloat((stock.price * (1 + changePercent / 100)).toFixed(2));
          
          return {
            ...stock,
            price: newPrice,
            change: changePercent
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Rotate through news items
  useEffect(() => {
    const newsInterval = setInterval(() => {
      setNewsIndex(prev => (prev + 1) % stockNewsItems.length);
      setActiveNews(stockNewsItems[(newsIndex + 1) % stockNewsItems.length]);
    }, 8000);

    return () => clearInterval(newsInterval);
  }, [newsIndex]);

  const handleStockClick = (stock: Stock) => {
    navigate(`/trade/${stock.id}`);
  };

  const handleNewsClick = (news: StockNews) => {
    if (news.stockId) {
      const stock = stocksData.find(s => s.id === news.stockId);
      if (stock) {
        toast({
          title: news.title,
          description: news.content
        });
        navigate(`/trade/${news.stockId}`);
      }
    } else {
      toast({
        title: news.title,
        description: news.content
      });
    }
  };

  return (
    <div className="grid gap-6">
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary/5 pb-2">
          <CardTitle className="flex items-center text-lg">
            <TrendingUp className="h-5 w-5 mr-2" /> Live Market Updates
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div 
            className={`p-4 border-b cursor-pointer hover:bg-slate-50 ${
              activeNews.impact === 'positive' ? 'border-l-4 border-l-green-400' : 
              activeNews.impact === 'negative' ? 'border-l-4 border-l-red-400' : 'border-l-4 border-l-blue-400'
            }`}
            onClick={() => handleNewsClick(activeNews)}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{activeNews.title}</h3>
              <span className="text-xs text-gray-500">
                {new Date(activeNews.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{activeNews.content}</p>
          </div>
          
          <div className="divide-y">
            {liveStocks.map((stock) => (
              <div 
                key={stock.id}
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-slate-50"
                onClick={() => handleStockClick(stock)}
              >
                <div className="flex items-center">
                  <div className="text-xl mr-3">{stock.logoUrl}</div>
                  <div>
                    <div className="font-medium">{stock.ticker}</div>
                    <div className="text-sm text-gray-500">{stock.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">${stock.price.toFixed(2)}</div>
                  <div className={`flex items-center text-xs ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {stock.change >= 0 ? 
                      <ArrowUp className="h-3 w-3" /> : 
                      <ArrowDown className="h-3 w-3" />
                    }
                    {Math.abs(stock.change).toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveStockUpdates;
