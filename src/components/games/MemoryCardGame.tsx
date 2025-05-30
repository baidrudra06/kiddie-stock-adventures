
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Brain, RotateCcw, Trophy } from 'lucide-react';

interface MemoryCard {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const cardEmojis = ['💰', '📈', '🏦', '💳', '🪙', '💎', '📊', '💸'];

const MemoryCardGame = ({ onComplete }: { onComplete: (coins: number) => void }) => {
  const { toast } = useToast();
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Initialize game
  useEffect(() => {
    initializeGame();
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const initializeGame = () => {
    const shuffledCards = [...cardEmojis, ...cardEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameCompleted(false);
    setTimeElapsed(0);
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2 || cards[cardId].isFlipped || cards[cardId].isMatched) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    // Flip the card
    setCards(prev => prev.map(card =>
      card.id === cardId ? { ...card, isFlipped: true } : card
    ));

    // Check for match when two cards are flipped
    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      const [firstCard, secondCard] = newFlippedCards.map(id => cards[id]);

      setTimeout(() => {
        if (firstCard.emoji === secondCard.emoji) {
          // Match found!
          setCards(prev => prev.map(card =>
            newFlippedCards.includes(card.id)
              ? { ...card, isMatched: true }
              : card
          ));
          setMatches(prev => prev + 1);
          
          toast({
            title: "Great match! 🎉",
            description: "You found a pair!",
          });

          // Check if game is completed
          if (matches + 1 === cardEmojis.length) {
            const coinsEarned = Math.max(20, 100 - moves * 2);
            setGameCompleted(true);
            onComplete(coinsEarned);
            
            toast({
              title: "Congratulations! 🏆",
              description: `You completed the game in ${moves + 1} moves and earned ${coinsEarned} coins!`,
            });
          }
        } else {
          // No match, flip cards back
          setCards(prev => prev.map(card =>
            newFlippedCards.includes(card.id)
              ? { ...card, isFlipped: false }
              : card
          ));
        }
        setFlippedCards([]);
      }, 1000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (gameCompleted) {
    return (
      <div className="text-center space-y-6 p-8">
        <div className="text-6xl animate-bounce">🎉</div>
        <h2 className="text-3xl font-bold gradient-text">Awesome Job!</h2>
        <div className="space-y-2">
          <p className="text-lg">Time: {formatTime(timeElapsed)}</p>
          <p className="text-lg">Moves: {moves}</p>
          <div className="flex justify-center">
            <Trophy className="h-8 w-8 text-yellow-500 animate-pulse" />
          </div>
        </div>
        <Button onClick={initializeGame} className="animate-glow-pulse">
          <RotateCcw className="mr-2 h-4 w-4" />
          Play Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-purple-500" />
          <h2 className="text-2xl font-bold gradient-text">Memory Game</h2>
        </div>
        <Button onClick={initializeGame} variant="outline" size="sm">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex justify-between text-sm">
        <span>Time: {formatTime(timeElapsed)}</span>
        <span>Moves: {moves}</span>
        <span>Matches: {matches}/{cardEmojis.length}</span>
      </div>

      <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
        {cards.map((card) => (
          <Card
            key={card.id}
            className={`aspect-square cursor-pointer transition-all duration-300 hover:scale-105 ${
              card.isMatched ? 'bg-green-100 border-green-300' : 'glass-effect hover-glow'
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            <CardContent className="p-0 h-full flex items-center justify-center">
              <div className={`text-2xl transition-all duration-500 ${
                card.isFlipped || card.isMatched 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-50'
              }`}>
                {card.isFlipped || card.isMatched ? card.emoji : '?'}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center text-sm text-muted-foreground">
        Click cards to flip them and find matching pairs!
      </div>
    </div>
  );
};

export default MemoryCardGame;
