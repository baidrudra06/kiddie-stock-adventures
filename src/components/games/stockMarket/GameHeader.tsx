
import React from 'react';

interface GameHeaderProps {
  cash: number;
  totalValue: number;
}

const GameHeader: React.FC<GameHeaderProps> = ({ cash, totalValue }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-2xl font-bold">Stock Market Simulator</h2>
        <p className="text-gray-600">
          Trade stocks and build your portfolio over 10 days
        </p>
      </div>
      <div className="text-right">
        <div className="text-lg font-semibold">${cash.toFixed(2)}</div>
        <div className="text-sm text-gray-600">Available Cash</div>
      </div>
    </div>
  );
};

export default GameHeader;
