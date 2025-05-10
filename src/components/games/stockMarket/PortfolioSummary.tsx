
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PortfolioSummaryProps {
  cash: number;
  portfolioValue: number;
  totalValue: number;
  onNextDay: () => void;
  day: number;
  maxDays: number;
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({
  cash,
  portfolioValue,
  totalValue,
  onNextDay,
  day,
  maxDays
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Cash:</span>
            <span className="font-medium">${cash.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Stocks Value:</span>
            <span className="font-medium">${portfolioValue.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between">
            <span className="font-bold">Total Value:</span>
            <span className="font-bold">${totalValue.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onNextDay} className="w-full">
          {day < maxDays ? `Advance to Day ${day + 1}` : 'Finish Game'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PortfolioSummary;
