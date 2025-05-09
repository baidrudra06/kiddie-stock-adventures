
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { TradingGame } from "@/types";
import { useGameContext } from "@/contexts/GameContext";
import { GamepadIcon } from "lucide-react";

// Sample trading games data
const tradingGames: TradingGame[] = [
  {
    id: "game1",
    title: "Stock Market Simulator",
    description: "Practice trading with virtual money and learn the basics of buying and selling stocks.",
    image: "🎮",
    difficulty: "easy",
    minLevel: 1,
    url: "/games/simulator"
  },
  {
    id: "game2",
    title: "Market Prediction Challenge",
    description: "Predict if stock prices will go up or down and earn coins for correct predictions.",
    image: "🔮",
    difficulty: "medium",
    minLevel: 2,
    url: "/games/prediction"
  },
  {
    id: "game3",
    title: "Portfolio Builder",
    description: "Create a balanced portfolio with limited funds to maximize returns and minimize risk.",
    image: "📊",
    difficulty: "medium",
    minLevel: 3,
    url: "/games/portfolio"
  },
  {
    id: "game4",
    title: "Stock Market News Challenge",
    description: "Read news headlines and predict how they will affect stock prices.",
    image: "📰",
    difficulty: "hard",
    minLevel: 4,
    url: "/games/news"
  }
];

const TradingGames = () => {
  const { toast } = useToast();
  const { userProgress, awardCoins } = useGameContext();
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const handlePlayGame = (game: TradingGame) => {
    if (userProgress.level < game.minLevel) {
      toast({
        title: "Level too low",
        description: `You need to be level ${game.minLevel} to play this game. Keep learning to level up!`,
        variant: "destructive"
      });
      return;
    }

    setActiveGame(game.id);

    // For demo purposes, award coins after a delay
    setTimeout(() => {
      const coinsEarned = Math.floor(Math.random() * 30) + 10;
      awardCoins(coinsEarned);
      setActiveGame(null);
      
      toast({
        title: "Game completed!",
        description: `You earned ${coinsEarned} coins playing ${game.title}!`,
      });
    }, 3000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-orange-100 text-orange-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <GamepadIcon className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Trading Games</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {tradingGames.map((game) => (
          <Card key={game.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{game.title}</CardTitle>
                  <CardDescription>{game.description}</CardDescription>
                </div>
                <div className="text-4xl">{game.image}</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getDifficultyColor(game.difficulty)}`}>
                  {game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1)}
                </span>
                <span className="text-sm text-gray-500">
                  Min Level: {game.minLevel}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handlePlayGame(game)} 
                className="w-full" 
                disabled={activeGame === game.id || userProgress.level < game.minLevel}
              >
                {activeGame === game.id ? "Playing..." : "Play Now"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TradingGames;
