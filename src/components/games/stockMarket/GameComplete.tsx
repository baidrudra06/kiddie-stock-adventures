
import React from 'react';
import { Button } from "@/components/ui/button";

interface GameCompleteProps {
  totalValue: number;
  onReset: () => void;
}

const GameComplete: React.FC<GameCompleteProps> = ({ totalValue, onReset }) => {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold mb-4">Game Completed!</h2>
      <p className="mb-6">Final Portfolio Value: ${totalValue.toFixed(2)}</p>
      <Button onClick={onReset}>Play Again</Button>
    </div>
  );
};

export default GameComplete;
