
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface GameCompleteProps {
  totalValue: number;
  onReset: () => void;
}

const GameComplete: React.FC<GameCompleteProps> = ({ totalValue, onReset }) => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold mb-4">Game Completed!</h2>
      <p className="mb-6">Final Portfolio Value: ${totalValue.toFixed(2)}</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onReset}>Play Again</Button>
        <Button variant="outline" onClick={() => navigate('/trading-games')}>
          Back to Trading Games
        </Button>
      </div>
    </div>
  );
};

export default GameComplete;
