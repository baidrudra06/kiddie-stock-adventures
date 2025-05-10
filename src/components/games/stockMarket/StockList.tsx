
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { GameStockItem } from "@/types";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

interface StockListProps {
  stocks: GameStockItem[];
  selectedStockId: string | undefined;
  onSelectStock: (stock: GameStockItem) => void;
}

const StockList: React.FC<StockListProps> = ({ stocks, selectedStockId, onSelectStock }) => {
  return (
    <div className="space-y-4">
      {stocks.map((stock) => (
        <Card 
          key={stock.id} 
          className={`cursor-pointer hover:shadow-md transition-shadow ${selectedStockId === stock.id ? 'ring-2 ring-primary' : ''}`}
          onClick={() => onSelectStock(stock)}
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
  );
};

export default StockList;
