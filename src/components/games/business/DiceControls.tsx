
import { Button } from '@/components/ui/button';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';

const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

interface DiceControlsProps {
  currentPlayer: 'player' | 'ai';
  diceValue: number;
  isRolling: boolean;
  showPurchaseDialog: boolean;
  onRollDice: () => void;
}

const DiceControls = ({ currentPlayer, diceValue, isRolling, showPurchaseDialog, onRollDice }: DiceControlsProps) => {
  const DiceIcon = diceIcons[diceValue - 1];

  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center gap-4">
        <div className="text-lg font-bold">
          {currentPlayer === 'player' ? 'Your Turn' : "Computer's Turn"}
        </div>
        <div className={`p-3 rounded-lg bg-white shadow-md ${isRolling ? 'animate-spin' : ''}`}>
          <DiceIcon className="h-8 w-8" />
        </div>
      </div>
      
      {currentPlayer === 'player' && !showPurchaseDialog && (
        <Button
          onClick={onRollDice}
          disabled={isRolling}
          className="animate-glow-pulse"
        >
          {isRolling ? 'Rolling...' : 'Roll Dice'}
        </Button>
      )}
      
      {currentPlayer === 'ai' && (
        <div className="text-muted-foreground">Computer is thinking...</div>
      )}
    </div>
  );
};

export default DiceControls;
