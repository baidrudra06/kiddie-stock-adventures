
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Building, Briefcase, DollarSign, TrendingUp } from 'lucide-react';
import BusinessBoard from './BusinessBoard';
import PlayerDashboard from './PlayerDashboard';
import EventCardModal from './EventCardModal';
import PropertyModal from './PropertyModal';
import { businessProperties, eventCards, playerTokens, BusinessPlayer, BusinessProperty, EventCard } from './businessData';

const BusinessMonopoly = ({ onComplete }: { onComplete: (coins: number) => void }) => {
  const { toast } = useToast();
  const [currentPlayer, setCurrentPlayer] = useState<number>(0);
  const [players, setPlayers] = useState<BusinessPlayer[]>([]);
  const [gameBoard, setGameBoard] = useState<BusinessProperty[]>(businessProperties);
  const [diceValue, setDiceValue] = useState<number[]>([1, 1]);
  const [isRolling, setIsRolling] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [winner, setWinner] = useState<BusinessPlayer | null>(null);
  const [showEventCard, setShowEventCard] = useState<EventCard | null>(null);
  const [showPropertyModal, setShowPropertyModal] = useState<BusinessProperty | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);

  const initializeGame = (numPlayers: number) => {
    const newPlayers: BusinessPlayer[] = [];
    for (let i = 0; i < numPlayers; i++) {
      newPlayers.push({
        id: i,
        name: i === 0 ? 'You' : `Player ${i + 1}`,
        money: 15000, // Start with 15,000 Business Credits
        position: 0,
        properties: [],
        isInJail: false,
        jailTurns: 0,
        token: selectedTokens[i] || playerTokens[i % playerTokens.length].id,
        role: i === 0 ? 'entrepreneur' : 'investor', // Player gets entrepreneur role
        portfolioValue: 0,
        netWorth: 15000
      });
    }
    setPlayers(newPlayers);
    setGameStarted(true);
  };

  const rollDice = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    let rolls = 0;
    const rollInterval = setInterval(() => {
      setDiceValue([
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
      ]);
      rolls++;
      
      if (rolls > 15) {
        clearInterval(rollInterval);
        const finalRoll = [
          Math.floor(Math.random() * 6) + 1,
          Math.floor(Math.random() * 6) + 1
        ];
        setDiceValue(finalRoll);
        setIsRolling(false);
        
        const total = finalRoll[0] + finalRoll[1];
        const isDouble = finalRoll[0] === finalRoll[1];
        
        movePlayer(total, isDouble);
      }
    }, 100);
  };

  const movePlayer = (steps: number, isDouble: boolean) => {
    const player = players[currentPlayer];
    const newPosition = (player.position + steps) % 40;
    const passedGo = newPosition < player.position;
    
    setPlayers(prev => prev.map((p, index) => 
      index === currentPlayer 
        ? { 
            ...p, 
            position: newPosition,
            money: passedGo ? p.money + 2000 : p.money // Collect 2000 BC for passing GO
          }
        : p
    ));

    if (passedGo) {
      toast({
        title: "Passed GO!",
        description: "Collected 2,000 Business Credits!",
      });
    }

    setTimeout(() => {
      handleSpaceLanding(newPosition, isDouble);
    }, 500);
  };

  const handleSpaceLanding = (position: number, isDouble: boolean) => {
    const space = gameBoard[position];
    const player = players[currentPlayer];

    switch (space.type) {
      case 'property':
      case 'startup':
      case 'corporation':
        if (!space.owner) {
          setShowPropertyModal(space);
        } else if (space.owner !== currentPlayer) {
          payRent(space);
        }
        break;
      case 'event':
        drawEventCard();
        break;
      case 'tax':
        payTax();
        break;
      case 'go':
        // Already handled in movePlayer
        break;
      case 'jail':
        if (position === 30) { // Go to Jail
          sendToJail();
        }
        break;
    }

    if (!isDouble) {
      nextTurn();
    }
  };

  const buyProperty = (propertyId: number) => {
    const property = gameBoard[propertyId];
    const player = players[currentPlayer];
    
    if (player.money >= property.price) {
      setPlayers(prev => prev.map((p, index) => 
        index === currentPlayer 
          ? { 
              ...p, 
              money: p.money - property.price,
              properties: [...p.properties, propertyId],
              portfolioValue: p.portfolioValue + property.price,
              netWorth: p.netWorth + (property.rent[0] * 10) // Estimate property value
            }
          : p
      ));

      setGameBoard(prev => prev.map(p => 
        p.id === propertyId 
          ? { ...p, owner: currentPlayer }
          : p
      ));

      toast({
        title: "Investment Complete!",
        description: `You acquired ${property.name} for ${property.price.toLocaleString()} BC`,
      });
    }
    setShowPropertyModal(null);
  };

  const payRent = (property: BusinessProperty) => {
    const owner = players[property.owner!];
    const currentPlayerData = players[currentPlayer];
    const rentAmount = calculateRent(property);
    
    if (currentPlayerData.money >= rentAmount) {
      setPlayers(prev => prev.map((p, index) => {
        if (index === currentPlayer) {
          return { ...p, money: p.money - rentAmount };
        } else if (index === property.owner) {
          return { 
            ...p, 
            money: p.money + rentAmount,
            netWorth: p.netWorth + rentAmount 
          };
        }
        return p;
      }));
      
      toast({
        title: "Business Fee Paid",
        description: `Paid ${rentAmount.toLocaleString()} BC to ${owner.name}`,
        variant: "destructive"
      });
    } else {
      // Player bankrupt
      setGameWon(true);
      setWinner(owner);
    }
  };

  const calculateRent = (property: BusinessProperty): number => {
    // Base rent with multipliers for monopolies and upgrades
    let rent = property.rent[0];
    const owner = players[property.owner!];
    
    // Check for monopoly (owning all properties in color group)
    const colorGroupProperties = gameBoard.filter(p => p.colorGroup === property.colorGroup);
    const ownedInGroup = colorGroupProperties.filter(p => p.owner === property.owner).length;
    
    if (ownedInGroup === colorGroupProperties.length && colorGroupProperties.length > 1) {
      rent *= 2; // Double rent for monopoly
    }
    
    return rent;
  };

  const drawEventCard = () => {
    const card = eventCards[Math.floor(Math.random() * eventCards.length)];
    setShowEventCard(card);
  };

  const executeEventCard = (card: EventCard) => {
    setPlayers(prev => prev.map((p, index) => 
      index === currentPlayer 
        ? { 
            ...p, 
            money: Math.max(0, p.money + card.moneyChange),
            netWorth: p.netWorth + card.moneyChange
          }
        : p
    ));
    
    toast({
      title: card.title,
      description: card.description,
      variant: card.moneyChange >= 0 ? "default" : "destructive"
    });
    
    setShowEventCard(null);
  };

  const payTax = () => {
    const taxAmount = 2000;
    setPlayers(prev => prev.map((p, index) => 
      index === currentPlayer 
        ? { ...p, money: Math.max(0, p.money - taxAmount) }
        : p
    ));
    
    toast({
      title: "Tax Season",
      description: `Paid ${taxAmount.toLocaleString()} BC in business taxes`,
      variant: "destructive"
    });
  };

  const sendToJail = () => {
    setPlayers(prev => prev.map((p, index) => 
      index === currentPlayer 
        ? { ...p, position: 10, isInJail: true, jailTurns: 0 }
        : p
    ));
    
    toast({
      title: "Regulatory Investigation!",
      description: "You've been detained for business compliance review",
      variant: "destructive"
    });
  };

  const nextTurn = () => {
    setCurrentPlayer(prev => (prev + 1) % players.length);
  };

  // AI player logic
  useEffect(() => {
    if (currentPlayer !== 0 && gameStarted && !gameWon && !isRolling) {
      const timer = setTimeout(() => {
        rollDice();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameStarted, gameWon, isRolling]);

  // Check win condition
  useEffect(() => {
    if (gameStarted) {
      const activePlayers = players.filter(p => p.money > 0);
      if (activePlayers.length === 1) {
        setGameWon(true);
        setWinner(activePlayers[0]);
        onComplete(activePlayers[0].id === 0 ? 200 : 50);
      }
    }
  }, [players, gameStarted]);

  if (!gameStarted) {
    return (
      <div className="space-y-6 p-8 text-center">
        <div className="space-y-4">
          <Building className="h-16 w-16 mx-auto text-blue-500" />
          <h2 className="text-3xl font-bold gradient-text">Business Empire Monopoly</h2>
          <p className="text-lg text-muted-foreground">
            Build your business empire through strategic investments and smart decisions!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {playerTokens.map((token) => (
            <Card 
              key={token.id}
              className={`cursor-pointer hover-lift ${
                selectedTokens.includes(token.id) ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => {
                if (selectedTokens.length < 4) {
                  setSelectedTokens(prev => 
                    prev.includes(token.id) 
                      ? prev.filter(t => t !== token.id)
                      : [...prev, token.id]
                  );
                }
              }}
            >
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">{token.icon}</div>
                <div className="text-sm font-bold">{token.name}</div>
                <div className="text-xs text-muted-foreground">{token.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Select tokens and choose number of players:</p>
          <div className="flex gap-4 justify-center">
            {[2, 3, 4].map(num => (
              <Button
                key={num}
                onClick={() => initializeGame(num)}
                disabled={selectedTokens.length < num}
                className="animate-glow-pulse"
              >
                {num} Players
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (gameWon) {
    return (
      <div className="text-center space-y-6 p-8">
        <div className="text-6xl">{winner?.id === 0 ? '🏆' : '💼'}</div>
        <h2 className="text-3xl font-bold gradient-text">
          {winner?.name} Built the Ultimate Business Empire!
        </h2>
        <div className="space-y-2">
          <p className="text-lg">Net Worth: {winner?.netWorth.toLocaleString()} BC</p>
          <p className="text-lg">Properties Owned: {winner?.properties.length}</p>
        </div>
        <Button onClick={() => setGameStarted(false)} className="animate-glow-pulse">
          Start New Game
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PlayerDashboard players={players} currentPlayer={currentPlayer} />
      
      <BusinessBoard 
        gameBoard={gameBoard} 
        players={players} 
        diceValue={diceValue}
        isRolling={isRolling}
        onRollDice={rollDice}
        currentPlayer={currentPlayer}
      />

      {showEventCard && (
        <EventCardModal 
          card={showEventCard} 
          onExecute={executeEventCard}
        />
      )}

      {showPropertyModal && (
        <PropertyModal 
          property={showPropertyModal}
          player={players[currentPlayer]}
          onBuy={buyProperty}
          onSkip={() => setShowPropertyModal(null)}
        />
      )}
    </div>
  );
};

export default BusinessMonopoly;
