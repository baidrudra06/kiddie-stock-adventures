
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stock } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ArrowUp, ArrowDown, TrendingUp, Zap } from "lucide-react";
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
  const [isAnimating, setIsAnimating] = useState(false);
  
  const shares = getStockShares(stock.id);
  const isPositive = stock.change >= 0;
  
  const handleQuickBuy = () => {
    setIsAnimating(true);
    const success = buyStock(stock.id, 1);
    if (success) {
      toast({
        description: `You bought 1 share of ${stock.ticker} for $${stock.price.toFixed(2)}`,
      });
    }
    setTimeout(() => setIsAnimating(false), 1000);
  };
  
  const goToDetails = () => {
    navigate(`/trade/${stock.id}`);
  };
  
  return (
    <Card 
      className={`overflow-hidden transition-all duration-500 glass-effect border-white/10 ${
        isHovering 
          ? 'shadow-2xl shadow-white/20 scale-105 hover-glow' 
          : 'shadow-lg hover-lift'
      } ${isAnimating ? 'animate-shake' : ''}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div 
        className={`h-1 transition-all duration-300 ${isHovering ? 'h-2' : ''}`}
        style={{ 
          backgroundColor: stock.color,
          boxShadow: isHovering ? `0 0 10px ${stock.color}` : 'none'
        }}
      />
      
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Suspense fallback={
              <div className="w-16 h-16 rounded-full bg-muted animate-pulse" />
            }>
              <div className={`w-16 h-16 rounded-full overflow-hidden transition-all duration-300 ${
                isHovering ? 'scale-110 rotate-3 animate-glow' : ''
              }`}>
                <Scene3D
                  backgroundColor={`${stock.color}20`}
                  height="64px"
                  rotation={isHovering}
                  interactive={false}
                  enhanced={isHovering}
                />
              </div>
            </Suspense>
            
            <div>
              <h3 className={`font-bold text-xl gradient-text transition-all duration-300 ${
                isHovering ? 'scale-105' : ''
              }`}>
                {stock.name}
              </h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                {stock.ticker}
                {isHovering && <Zap className="h-3 w-3 animate-pulse" />}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <p className={`font-bold text-xl transition-all duration-300 ${
              isHovering ? 'scale-110 text-white' : ''
            }`}>
              ${stock.price.toFixed(2)}
            </p>
            <p className={`text-sm flex items-center justify-end gap-1 transition-all duration-300 ${
              isPositive ? "text-green-400" : "text-red-400"
            } ${isHovering ? 'scale-110' : ''}`}>
              {isPositive ? (
                <ArrowUp className={`h-4 w-4 ${isHovering ? 'animate-bounce' : ''}`} />
              ) : (
                <ArrowDown className={`h-4 w-4 ${isHovering ? 'animate-bounce' : ''}`} />
              )}
              {Math.abs(stock.change).toFixed(2)}%
            </p>
          </div>
        </div>
        
        <div className={`my-6 transition-all duration-500 ${
          isHovering ? 'scale-105' : ''
        }`}>
          <StockChart 
            stockId={stock.id} 
            color={isHovering ? '#ffffff' : stock.color} 
            animate={isHovering} 
          />
        </div>
        
        {shares > 0 && (
          <div className={`text-sm text-muted-foreground mt-4 p-3 bg-white/5 rounded-lg border border-white/10 transition-all duration-300 ${
            isHovering ? 'bg-white/10 scale-105 animate-glow-pulse' : ''
          }`}>
            <div className="flex items-center justify-between">
              <span>Portfolio:</span>
              <span className="font-bold text-white flex items-center gap-1">
                {shares} shares
                <TrendingUp className="h-3 w-3" />
              </span>
            </div>
            <div className="text-xs mt-1 opacity-70">
              Value: ${(shares * stock.price).toFixed(2)}
            </div>
          </div>
        )}
      </CardContent>
      
      {showActions && (
        <CardFooter className="px-6 pt-0 pb-6 gap-3">
          <Button 
            onClick={goToDetails} 
            variant="outline" 
            className={`flex-1 glass-effect border-white/20 hover-lift transition-all duration-300 ${
              isHovering ? 'scale-105 hover-glow' : ''
            }`}
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            Details
          </Button>
          <Button 
            onClick={handleQuickBuy} 
            className={`flex-1 hover-lift transition-all duration-300 ${
              isHovering ? 'scale-105 animate-glow-pulse' : ''
            } ${isAnimating ? 'animate-bounce-in' : ''}`}
            style={{ 
              backgroundColor: stock.color,
              boxShadow: isHovering ? `0 0 20px ${stock.color}50` : 'none'
            }}
          >
            <Zap className="mr-2 h-4 w-4" />
            Buy 1
          </Button>
        </CardFooter>
      )}
      
      {/* Floating particles when hovered */}
      {isHovering && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-float-complex opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}
    </Card>
  );
};

export default StockCard3D;
