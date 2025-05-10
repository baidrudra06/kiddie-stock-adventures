
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown } from "lucide-react";

interface ProgressBarProps {
  day: number;
  maxDays: number;
  marketTrend: 'up' | 'down' | 'neutral';
  portfolioValue: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ day, maxDays, marketTrend, portfolioValue }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="font-semibold">Day {day} of {maxDays}</p>
          <div className="flex items-center">
            <span className="text-sm mr-2">Market Trend:</span>
            {marketTrend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
            {marketTrend === 'down' && <TrendingDown className="h-4 w-4 text-red-500" />}
            {marketTrend === 'neutral' && <span className="text-sm text-gray-500">Neutral</span>}
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold">Portfolio Value</p>
          <p>${portfolioValue.toFixed(2)}</p>
        </div>
      </div>
      <Progress value={(day / maxDays) * 100} className="h-2" />
    </div>
  );
};

export default ProgressBar;
