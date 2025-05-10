
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { TradingGame } from "@/types";
import { useGameContext } from "@/contexts/GameContext";
import { Gamepad, TrendingUp } from "lucide-react";

// Extended trading games data
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
  },
  {
    id: "game5",
    title: "Investment Time Machine",
    description: "See how investments grow over time with this interactive simulation.",
    image: "⏰",
    difficulty: "easy",
    minLevel: 1,
    url: "/games/timemachine"
  },
  {
    id: "game6",
    title: "Dividend Detective",
    description: "Find companies that pay the best dividends and build a passive income portfolio.",
    image: "🔍",
    difficulty: "medium",
    minLevel: 3,
    url: "/games/dividends"
  }
];

const TradingGamesPage = () => {
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
    
    // Navigate to the game URL or simulate gameplay
    window.location.href = game.url;
    
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
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 pb-20 md:pb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <Gamepad className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold">Trading Games</h1>
            </div>
            <p className="text-gray-600">
              Play fun games to learn about trading and investing while earning coins
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tradingGames.map((game) => (
            <Card key={game.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{game.title}</CardTitle>
                    <p className="text-sm text-gray-600">{game.description}</p>
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
      </main>
      
      <Footer />
      <Navigation />
    </div>
  );
};

export default TradingGamesPage;
