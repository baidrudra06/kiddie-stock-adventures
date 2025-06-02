
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';
import { BusinessProperty, BusinessPlayer } from './businessData';

const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

interface BusinessBoardProps {
  gameBoard: BusinessProperty[];
  players: BusinessPlayer[];
  diceValue: number[];
  isRolling: boolean;
  onRollDice: () => void;
  currentPlayer: number;
}

const BusinessBoard = ({ gameBoard, players, diceValue, isRolling, onRollDice, currentPlayer }: BusinessBoardProps) => {
  const getColorGroupColor = (colorGroup: string): string => {
    const colors = {
      special: 'bg-gray-200',
      purple: 'bg-purple-200',
      lightblue: 'bg-blue-200',
      pink: 'bg-pink-200',
      orange: 'bg-orange-200',
      red: 'bg-red-200',
      yellow: 'bg-yellow-200',
      green: 'bg-green-200',
      blue: 'bg-blue-300',
      transportation: 'bg-gray-300',
      utilities: 'bg-amber-200'
    };
    return colors[colorGroup as keyof typeof colors] || 'bg-gray-200';
  };

  const getOwnerColor = (ownerId?: number): string => {
    if (ownerId === undefined) return '';
    const colors = ['border-blue-500', 'border-red-500', 'border-green-500', 'border-yellow-500'];
    return colors[ownerId % colors.length];
  };

  // Arrange board spaces in a square layout
  const topRow = gameBoard.slice(0, 11);
  const rightColumn = gameBoard.slice(11, 20);
  const bottomRow = gameBoard.slice(20, 31).reverse();
  const leftColumn = gameBoard.slice(31, 40).reverse();

  const renderSpace = (property: BusinessProperty, index: number) => {
    const playersHere = players.filter(p => p.position === property.id);
    const isCorner = [0, 10, 20, 30].includes(property.id);
    
    return (
      <div
        key={property.id}
        className={`
          ${getColorGroupColor(property.colorGroup)} 
          ${getOwnerColor(property.owner)}
          ${isCorner ? 'w-20 h-20' : 'w-16 h-12'} 
          p-1 rounded border-2 relative flex flex-col justify-between text-center
          ${property.owner !== undefined ? 'border-4' : 'border-gray-300'}
        `}
      >
        <div className="text-xs font-bold truncate" title={property.name}>
          {isCorner ? property.name : property.name.split(' ')[0]}
        </div>
        
        {property.price > 0 && (
          <div className="text-xs">
            {property.price >= 1000 ? `${(property.price / 1000).toFixed(0)}k` : property.price} BC
          </div>
        )}
        
        {/* Player tokens */}
        {playersHere.length > 0 && (
          <div className="absolute -top-1 -right-1 flex flex-wrap gap-1">
            {playersHere.map((player) => (
              <div
                key={player.id}
                className="w-3 h-3 rounded-full bg-white border flex items-center justify-center text-xs"
                style={{ backgroundColor: player.id === 0 ? '#3B82F6' : '#EF4444' }}
                title={player.name}
              >
                {player.id + 1}
              </div>
            ))}
          </div>
        )}
        
        {/* Property upgrades indicator */}
        {property.upgrades && property.upgrades > 0 && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center">
            <div className="bg-green-500 text-white text-xs px-1 rounded">
              {property.upgrades}
            </div>
          </div>
        )}
      </div>
    );
  };

  const DiceIcon1 = diceIcons[diceValue[0] - 1];
  const DiceIcon2 = diceIcons[diceValue[1] - 1];

  return (
    <Card className="glass-effect">
      <CardContent className="p-6">
        {/* Game Board */}
        <div className="flex flex-col items-center space-y-4">
          {/* Top Row */}
          <div className="flex space-x-1">
            {topRow.map((property, index) => renderSpace(property, index))}
          </div>
          
          {/* Middle Section */}
          <div className="flex justify-between w-full">
            {/* Left Column */}
            <div className="flex flex-col space-y-1">
              {leftColumn.map((property, index) => renderSpace(property, index + 31))}
            </div>
            
            {/* Center Area - Game Info */}
            <div className="flex-1 flex flex-col items-center justify-center space-y-4 mx-8">
              <div className="text-center">
                <h3 className="text-xl font-bold gradient-text mb-2">Business Empire</h3>
                <div className="text-sm text-muted-foreground">
                  {players[currentPlayer]?.name}'s Turn
                </div>
              </div>
              
              {/* Dice */}
              <div className="flex items-center gap-4">
                <div className={`p-2 bg-white rounded-lg shadow-md ${isRolling ? 'animate-spin' : ''}`}>
                  <DiceIcon1 className="h-6 w-6" />
                </div>
                <div className={`p-2 bg-white rounded-lg shadow-md ${isRolling ? 'animate-spin' : ''}`}>
                  <DiceIcon2 className="h-6 w-6" />
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-bold">
                  Total: {diceValue[0] + diceValue[1]}
                </div>
                {diceValue[0] === diceValue[1] && (
                  <div className="text-sm text-green-500 font-bold">Doubles!</div>
                )}
              </div>
              
              {/* Roll Button */}
              {currentPlayer === 0 && (
                <Button
                  onClick={onRollDice}
                  disabled={isRolling}
                  className="animate-glow-pulse"
                >
                  {isRolling ? 'Rolling...' : 'Roll Dice'}
                </Button>
              )}
              
              {currentPlayer !== 0 && (
                <div className="text-sm text-muted-foreground">
                  {players[currentPlayer]?.name} is thinking...
                </div>
              )}
            </div>
            
            {/* Right Column */}
            <div className="flex flex-col space-y-1">
              {rightColumn.map((property, index) => renderSpace(property, index + 11))}
            </div>
          </div>
          
          {/* Bottom Row */}
          <div className="flex space-x-1">
            {bottomRow.map((property, index) => renderSpace(property, 30 - index))}
          </div>
        </div>
        
        {/* Board Legend */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-200 border rounded"></div>
            <span>Tech Startups</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-200 border rounded"></div>
            <span>E-commerce</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-pink-200 border rounded"></div>
            <span>Entertainment</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-200 border rounded"></div>
            <span>Manufacturing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-200 border rounded"></div>
            <span>Real Estate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-200 border rounded"></div>
            <span>Financial Services</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-200 border rounded"></div>
            <span>Healthcare</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-300 border rounded"></div>
            <span>Luxury Premium</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessBoard;
