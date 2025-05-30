
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useGameContext } from "@/contexts/GameContext";
import { GamepadIcon, Brain, Calculator, TrendingUp, ArrowLeft } from "lucide-react";
import MemoryCardGame from "./games/MemoryCardGame";
import MathQuizGame from "./games/MathQuizGame";
import StockMarketGameComponent from "./games/stockMarket/StockMarketGame";

type GameType = 'memory' | 'math' | 'stock' | null;

const TradingGames = () => {
  const { toast } = useToast();
  const { userProgress, awardCoins } = useGameContext();
  const [activeGame, setActiveGame] = useState<GameType>(null);

  const handleGameComplete = (coins: number) => {
    awardCoins(coins);
    toast({
      title: "Awesome! 🎉",
      description: `You earned ${coins} coins! Great job!`,
    });
  };

  const games = [
    {
      id: 'memory',
      title: "Memory Card Game",
      description: "Match pairs of financial emoji cards! Great for improving memory and learning financial symbols.",
      icon: <Brain className="h-12 w-12 text-purple-500" />,
      difficulty: "Easy",
      minLevel: 1,
      color: "purple"
    },
    {
      id: 'math',
      title: "Quick Math Quiz",
      description: "Solve math problems quickly! Perfect for building the math skills needed for trading.",
      icon: <Calculator className="h-12 w-12 text-blue-500" />,
      difficulty: "Medium",
      minLevel: 1,
      color: "blue"
    },
    {
      id: 'stock',
      title: "Stock Trading Simulator",
      description: "Buy and sell stocks in a realistic market simulation. Learn how trading really works!",
      icon: <TrendingUp className="h-12 w-12 text-green-500" />,
      difficulty: "Hard",
      minLevel: 2,
      color: "green"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-orange-100 text-orange-800";
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderGame = () => {
    switch (activeGame) {
      case 'memory':
        return <MemoryCardGame onComplete={handleGameComplete} />;
      case 'math':
        return <MathQuizGame onComplete={handleGameComplete} />;
      case 'stock':
        return <StockMarketGameComponent onComplete={handleGameComplete} />;
      default:
        return null;
    }
  };

  if (activeGame) {
    return (
      <div className="space-y-4">
        <Button 
          onClick={() => setActiveGame(null)} 
          variant="outline"
          className="mb-4 hover-lift"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Games
        </Button>
        {renderGame()}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <GamepadIcon className="h-6 w-6 text-primary animate-bounce" />
        <h2 className="text-2xl font-bold gradient-text">Fun Learning Games</h2>
      </div>
      <p className="text-muted-foreground mb-6">
        Play these exciting games to learn about money and trading while having fun! 🎮
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Card 
            key={game.id} 
            className="overflow-hidden hover:shadow-lg transition-all duration-300 glass-effect border-white/10 hover-lift hover-glow group"
          >
            <CardHeader className="pb-2 text-center">
              <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                {game.icon}
              </div>
              <CardTitle className="text-xl gradient-text">{game.title}</CardTitle>
              <CardDescription className="text-center">{game.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${getDifficultyColor(game.difficulty)}`}>
                  {game.difficulty}
                </span>
                <span className="text-sm text-gray-500">
                  Level {game.minLevel}+
                </span>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                onClick={() => setActiveGame(game.id as GameType)}
                className="w-full hover-lift transition-all duration-300 animate-glow-pulse"
                disabled={userProgress.level < game.minLevel}
                style={{ 
                  backgroundColor: userProgress.level >= game.minLevel ? `var(--${game.color}-500)` : undefined
                }}
              >
                {userProgress.level >= game.minLevel ? "Play Now! 🎮" : `Need Level ${game.minLevel}`}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Card className="glass-effect border-white/10">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-2 gradient-text">Your Progress</h3>
            <div className="flex justify-center gap-6 text-sm">
              <div>Level: <span className="font-bold text-white">{userProgress.level}</span></div>
              <div>Coins: <span className="font-bold text-yellow-400">{userProgress.coins}</span></div>
              <div>XP: <span className="font-bold text-blue-400">{userProgress.experience}</span></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TradingGames;
