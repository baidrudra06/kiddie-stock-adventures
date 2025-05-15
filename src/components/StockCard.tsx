import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Stock } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

interface StockCardProps {
  stock: Stock;
  onClick: () => void;
}

const StockCard: React.FC<StockCardProps> = ({ stock, onClick }) => {
  // Calculate if stock is up or down
  const isPositive = stock.change >= 0;
  
  // Format the price and change values
  const formattedPrice = formatCurrency(stock.price);
  const formattedChange = Math.abs(stock.change).toFixed(2) + '%';
  
  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-all"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{stock.logoUrl}</div>
            <div>
              <h3 className="font-bold">{stock.name}</h3>
              <p className="text-sm text-muted-foreground">{stock.ticker}</p>
            </div>
          </div>
          
          <div>
            <div aria-label="Stock price">
              <p className="text-right font-bold">{formattedPrice}</p>
            </div>
            
            <div aria-label="Stock price change" className="flex items-center justify-end">
              <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                <span className="text-sm">{formattedChange}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockCard;
