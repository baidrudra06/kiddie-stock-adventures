
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GameStockItem } from "@/types";

interface TradingPanelProps {
  selectedStock: GameStockItem | null;
  action: 'buy' | 'sell';
  setAction: (action: 'buy' | 'sell') => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  handleBuy: () => void;
  handleSell: () => void;
  cash: number;
}

const TradingPanel: React.FC<TradingPanelProps> = ({
  selectedStock,
  action,
  setAction,
  quantity,
  setQuantity,
  handleBuy,
  handleSell,
  cash
}) => {
  return (
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
                  {cash >= selectedStock.price * quantity ? (
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
              disabled={(action === 'buy' && (quantity <= 0 || cash < selectedStock.price * quantity)) || 
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
  );
};

export default TradingPanel;
