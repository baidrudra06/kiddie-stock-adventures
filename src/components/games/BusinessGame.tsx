
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Building, Coins, User, Bot } from 'lucide-react';

interface Property {
  id: number;
  name: string;
  price: number;
  rent: number;
  owner: 'player' | 'ai' | null;
  color: string;
}

interface Player {
  id: 'player' | 'ai';
  name: string;
  money: number;
  position: number;
  properties: number[];
  color: string;
}

const properties: Property[] = [
  { id: 0, name: "Start", price: 0, rent: 0, owner: null, color: "bg-green-200" },
  { id: 1, name: "Candy Shop", price: 60, rent: 10, owner: null, color: "bg-pink-200" },
  { id: 2, name: "Toy Store", price: 80, rent: 15, owner: null, color: "bg-blue-200" },
  { id: 3, name: "Book Store", price: 100, rent: 20, owner: null, color: "bg-yellow-200" },
  { id: 4, name: "Park", price: 0, rent: 0, owner: null, color: "bg-green-200" },
  { id: 5, name: "Ice Cream Shop", price: 120, rent: 25, owner: null, color: "bg-orange-200" },
  { id: 6, name: "Pet Store", price: 140, rent: 30, owner: null, color: "bg-purple-200" },
  { id: 7, name: "Game Store", price: 160, rent: 35, owner: null, color: "bg-red-200" },
  { id: 8, name: "Jail", price: 0, rent: 0, owner: null, color: "bg-gray-200" },
  { id: 9, name: "Pizza Place", price: 180, rent: 40, owner: null, color: "bg-yellow-200" },
  { id: 10, name: "Movie Theater", price: 200, rent: 45, owner: null, color: "bg-indigo-200" },
  { id: 11, name: "Mall", price: 250, rent: 60, owner: null, color: "bg-pink-200" }
];

const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

const BusinessGame = ({ onComplete }: { onComplete: (coins: number) => void }) => {
  const { toast } = useToast();
  const [gameBoard, setGameBoard] = useState<Property[]>(properties);
  const [currentPlayer, setCurrentPlayer] = useState<'player' | 'ai'>('player');
  const [diceValue, setDiceValue] = useState<number>(1);
  const [isRolling, setIsRolling] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [winner, setWinner] = useState<'player' | 'ai' | null>(null);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState<Property | null>(null);
  
  const [players, setPlayers] = useState<Player[]>([
    {
      id: 'player',
      name: 'You',
      money: 1500,
      position: 0,
      properties: [],
      color: 'bg-blue-500'
    },
    {
      id: 'ai',
      name: 'Computer',
      money: 1500,
      position: 0,
      properties: [],
      color: 'bg-red-500'
    }
  ]);

  const getCurrentPlayer = () => players.find(p => p.id === currentPlayer)!;
  const getOtherPlayer = () => players.find(p => p.id !== currentPlayer)!;

  const rollDice = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    let rolls = 0;
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      rolls++;
      
      if (rolls > 10) {
        clearInterval(rollInterval);
        const finalRoll = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalRoll);
        setIsRolling(false);
        movePlayer(finalRoll);
      }
    }, 100);
  };

  const movePlayer = (steps: number) => {
    const player = getCurrentPlayer();
    const newPosition = (player.position + steps) % gameBoard.length;
    
    // Check if passed start
    const passedStart = newPosition < player.position;
    
    setPlayers(prev => prev.map(p => 
      p.id === currentPlayer 
        ? { 
            ...p, 
            position: newPosition,
            money: passedStart ? p.money + 200 : p.money // Collect $200 for passing start
          }
        : p
    ));

    if (passedStart) {
      toast({
        title: "Passed Start!",
        description: "Collected $200!",
      });
    }

    // Handle landing on property
    setTimeout(() => {
      handlePropertyLanding(newPosition);
    }, 500);
  };

  const handlePropertyLanding = (position: number) => {
    const property = gameBoard[position];
    const player = getCurrentPlayer();
    const otherPlayer = getOtherPlayer();

    if (property.price === 0) {
      // Special spaces (Start, Park, Jail)
      if (property.name === "Jail") {
        toast({
          title: "Visiting Jail",
          description: "Just visiting, no worries!",
        });
      }
      switchTurn();
      return;
    }

    if (property.owner === null) {
      // Property available for purchase
      if (currentPlayer === 'player') {
        showPurchaseOption(property);
      } else {
        // AI decides to buy
        if (player.money >= property.price && Math.random() > 0.3) {
          buyProperty(property.id);
        } else {
          switchTurn();
        }
      }
    } else if (property.owner !== currentPlayer) {
      // Pay rent
      const rentAmount = property.rent;
      if (player.money >= rentAmount) {
        setPlayers(prev => prev.map(p => 
          p.id === currentPlayer 
            ? { ...p, money: p.money - rentAmount }
            : { ...p, money: p.money + rentAmount }
        ));
        
        toast({
          title: "Rent Paid!",
          description: `You paid $${rentAmount} rent to ${otherPlayer.name}`,
          variant: "destructive"
        });
      } else {
        // Game over - not enough money
        setGameWon(true);
        setWinner(property.owner);
        
        const coinsEarned = currentPlayer === 'player' ? 10 : 50;
        onComplete(coinsEarned);
      }
      switchTurn();
    } else {
      // Own property
      switchTurn();
    }
  };

  const showPurchaseOption = (property: Property) => {
    const player = getCurrentPlayer();
    
    if (player.money >= property.price) {
      setShowPurchaseDialog(property);
      toast({
        title: `Buy ${property.name}?`,
        description: `Price: $${property.price}, Rent: $${property.rent}`,
      });
    } else {
      toast({
        title: "Not enough money!",
        description: `${property.name} costs $${property.price}`,
        variant: "destructive"
      });
      switchTurn();
    }
  };

  const buyProperty = (propertyId: number) => {
    const property = gameBoard[propertyId];
    const player = getCurrentPlayer();

    setPlayers(prev => prev.map(p => 
      p.id === currentPlayer 
        ? { 
            ...p, 
            money: p.money - property.price,
            properties: [...p.properties, propertyId]
          }
        : p
    ));

    setGameBoard(prev => prev.map(p => 
      p.id === propertyId 
        ? { ...p, owner: currentPlayer }
        : p
    ));

    toast({
      title: "Property Purchased!",
      description: `You bought ${property.name} for $${property.price}`,
    });

    setShowPurchaseDialog(null);
    switchTurn();
  };

  const skipPurchase = () => {
    setShowPurchaseDialog(null);
    switchTurn();
  };

  const switchTurn = () => {
    setCurrentPlayer(prev => prev === 'player' ? 'ai' : 'player');
  };

  // AI turn handling
  useEffect(() => {
    if (currentPlayer === 'ai' && !gameWon && !isRolling) {
      const timer = setTimeout(() => {
        rollDice();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameWon, isRolling]);

  // Check for game end conditions
  useEffect(() => {
    const player = players.find(p => p.id === 'player')!;
    const ai = players.find(p => p.id === 'ai')!;
    
    if (player.money <= 0) {
      setGameWon(true);
      setWinner('ai');
      onComplete(10);
    } else if (ai.money <= 0) {
      setGameWon(true);
      setWinner('player');
      onComplete(100);
    }
  }, [players]);

  const resetGame = () => {
    setGameBoard(properties);
    setPlayers([
      {
        id: 'player',
        name: 'You',
        money: 1500,
        position: 0,
        properties: [],
        color: 'bg-blue-500'
      },
      {
        id: 'ai',
        name: 'Computer',
        money: 1500,
        position: 0,
        properties: [],
        color: 'bg-red-500'
      }
    ]);
    setCurrentPlayer('player');
    setGameWon(false);
    setWinner(null);
    setDiceValue(1);
    setShowPurchaseDialog(null);
  };

  const DiceIcon = diceIcons[diceValue - 1];

  if (gameWon) {
    return (
      <div className="text-center space-y-6 p-8">
        <div className="text-6xl">{winner === 'player' ? '🎉' : '😔'}</div>
        <h2 className="text-3xl font-bold gradient-text">
          {winner === 'player' ? 'You Won!' : 'Computer Won!'}
        </h2>
        <p className="text-lg">
          {winner === 'player' 
            ? 'Congratulations! You built a business empire!' 
            : 'Better luck next time! Keep practicing your business skills!'}
        </p>
        <Button onClick={resetGame} className="animate-glow-pulse">
          Play Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold gradient-text flex items-center gap-2">
          <Building className="h-6 w-6 text-green-500" />
          Business Empire Game
        </h2>
        <Button onClick={resetGame} variant="outline" size="sm">
          Reset Game
        </Button>
      </div>

      {/* Player Info */}
      <div className="grid grid-cols-2 gap-4">
        {players.map((player) => (
          <Card key={player.id} className={`glass-effect ${currentPlayer === player.id ? 'ring-2 ring-primary' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                {player.id === 'player' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                <span className="font-bold">{player.name}</span>
                {currentPlayer === player.id && <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Current</span>}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Coins className="h-4 w-4 text-yellow-500" />
                <span>${player.money}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Properties: {player.properties.length}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Purchase Dialog */}
      {showPurchaseDialog && (
        <Card className="glass-effect border-2 border-primary">
          <CardHeader>
            <CardTitle className="text-center">Purchase Property?</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <h3 className="font-bold text-lg">{showPurchaseDialog.name}</h3>
              <p className="text-sm text-muted-foreground">
                Price: ${showPurchaseDialog.price} | Rent: ${showPurchaseDialog.rent}
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => buyProperty(showPurchaseDialog.id)}>
                Buy Property
              </Button>
              <Button variant="outline" onClick={skipPurchase}>
                Skip
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Game Board */}
      <Card className="glass-effect">
        <CardContent className="p-6">
          <div className="grid grid-cols-4 gap-2 mb-6">
            {gameBoard.map((property, index) => {
              const playersHere = players.filter(p => p.position === index);
              
              return (
                <div
                  key={property.id}
                  className={`${property.color} p-2 rounded-lg text-center text-xs relative min-h-16 flex flex-col justify-between border-2 ${
                    property.owner === 'player' ? 'border-blue-500' : 
                    property.owner === 'ai' ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <div className="font-bold">{property.name}</div>
                  {property.price > 0 && (
                    <div className="text-xs">
                      <div>${property.price}</div>
                      <div>Rent: ${property.rent}</div>
                    </div>
                  )}
                  
                  {/* Player indicators */}
                  {playersHere.length > 0 && (
                    <div className="absolute -top-2 -right-2 flex gap-1">
                      {playersHere.map((player) => (
                        <div
                          key={player.id}
                          className={`w-4 h-4 rounded-full ${player.color} border-2 border-white`}
                          title={player.name}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Dice and Controls */}
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
                onClick={rollDice}
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
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        🎯 Goal: Buy properties and collect rent to bankrupt your opponent!
      </div>
    </div>
  );
};

export default BusinessGame;
