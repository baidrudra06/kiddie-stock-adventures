
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stock } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ArrowUp, ArrowDown } from "lucide-react";
import StockChart from "../StockChart";
import { useGameContext } from "@/contexts/GameContext";
import Scene3D from "./Scene3D";
import { Suspense } from "react";

interface StockCard3DProps {
  stock: Stock;
  showActions?: boolean;
}

const StockCard3D = ({ stock, showActions = true }: StockCard3DProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { buyStock, getStockShares } = useGameContext();
  const [isHovering, setIsHovering] = useState(false);
  
  const shares = getStockShares(stock.id);
  const isPositive = stock.change >= 0;
  
  const handleQuickBuy = () => {
    const success = buyStock(stock.id, 1);
    if (success) {
      toast({
        title: "Quick Buy Successful!",
        description: `You bought 1 share of ${stock.ticker} for $${stock.price.toFixed(2)}`,
      });
    }
  };
  
  const goToDetails = () => {
    navigate(`/trade/${stock.id}`);
  };
  
  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-shadow"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div 
        className="h-1" 
        style={{ backgroundColor: stock.color }}
      />
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Suspense fallback={<span className="text-2xl">{stock.logoUrl}</span>}>
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Scene3D
                  backgroundColor={stock.color + "20"}
                  height="48px"
                  rotation={isHovering}
                  interactive={false}
                />
              </div>
            </Suspense>
            <div>
              <h3 className="font-bold text-lg">{stock.name}</h3>
              <p className="text-sm text-gray-500">{stock.ticker}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg">${stock.price.toFixed(2)}</p>
            <p className={`text-sm flex items-center ${isPositive ? "text-green-500" : "text-red-500"}`}>
              {isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              {Math.abs(stock.change).toFixed(2)}%
            </p>
          </div>
        </div>
        
        <div className="my-4">
          <StockChart stockId={stock.id} color={stock.color} animate={isHovering} />
        </div>
        
        {shares > 0 && (
          <div className="text-sm text-gray-600 mt-2">
            You own: <span className="font-bold">{shares} shares</span>
          </div>
        )}
      </CardContent>
      
      {showActions && (
        <CardFooter className="px-4 pt-0 pb-4 gap-2">
          <Button 
            onClick={goToDetails} 
            variant="outline" 
            className="flex-1"
          >
            Details
          </Button>
          <Button 
            onClick={handleQuickBuy} 
            className="flex-1"
            style={{ backgroundColor: stock.color }}
          >
            Buy 1
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default StockCard3D;
