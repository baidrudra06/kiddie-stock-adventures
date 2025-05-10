
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FinancialGame } from "@/types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { useGameContext } from "@/contexts/GameContext";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Search, Gamepad, Trophy, Star } from "lucide-react";

// Game data
const financialGames: FinancialGame[] = [
  {
    id: "stockmarket",
    title: "Stock Market Simulator",
    description: "Buy and sell virtual stocks and track your portfolio performance over 10 market days.",
    imageUrl: "📈",
    difficulty: "medium",
    type: "simulation",
    minLevel: 2,
    path: "/games/stockmarket",
    icon: "📊",
    color: "bg-blue-500",
  },
  {
    id: "lemonadestand",
    title: "Lemonade Stand",
    description: "Run your own lemonade stand business! Buy ingredients, set prices, and try to make a profit.",
    imageUrl: "🍋",
    difficulty: "easy",
    type: "simulation",
    minLevel: 1,
    path: "/games/lemonadestand",
    icon: "🍋",
    color: "bg-yellow-400",
  },
  {
    id: "budgetchallenge",
    title: "Budget Challenge",
    description: "Manage your weekly allowance to save for a big goal while handling different expenses.",
    imageUrl: "💰",
    difficulty: "medium",
    type: "challenge",
    minLevel: 3,
    path: "/games/budgetchallenge",
    icon: "💰",
    color: "bg-green-500",
  },
  {
    id: "financialquiz",
    title: "Money Master Quiz",
    description: "Test your financial knowledge with this fun quiz covering saving, investing, and money basics.",
    imageUrl: "🧩",
    difficulty: "easy",
    type: "quiz",
    minLevel: 1,
    path: "/games/financialquiz",
    icon: "🎓",
    color: "bg-purple-500",
  },
  {
    id: "investoradventure",
    title: "Investor Adventure",
    description: "An interactive story where your investment choices determine how the adventure unfolds.",
    imageUrl: "🗺️",
    difficulty: "hard",
    type: "story",
    minLevel: 4,
    path: "/games/investoradventure",
    icon: "📚",
    color: "bg-orange-500",
  }
];

const Games = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userProgress, awardCoins } = useGameContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [playingGame, setPlayingGame] = useState<string | null>(null);

  const filteredGames = financialGames.filter(
    game => 
      (game.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       game.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (activeTab === "all" || activeTab === game.type)
  );

  const handlePlayGame = (game: FinancialGame) => {
    if (userProgress.level < game.minLevel) {
      toast({
        title: "Level too low",
        description: `You need to be at least level ${game.minLevel} to play this game. Keep learning to level up!`,
        variant: "destructive"
      });
      return;
    }

    setPlayingGame(game.id);

    // For now, we'll simulate the game with a delay
    // In a full implementation, we would navigate to the game page
    setTimeout(() => {
      const coinsEarned = Math.floor(Math.random() * 50) + 20;
      awardCoins(coinsEarned);
      setPlayingGame(null);
      
      toast({
        title: "Game completed!",
        description: `You earned ${coinsEarned} coins playing ${game.title}!`,
      });
      
      // Navigate to the actual game (currently just redirecting to learn)
      navigate("/learn");
    }, 1500);
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

  const getGameTypeIcon = (type: string) => {
    switch (type) {
      case "quiz":
        return <Star className="h-4 w-4" />;
      case "challenge":
        return <Trophy className="h-4 w-4" />;
      default:
        return <Gamepad className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 pb-20 md:pb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Financial Games</h1>
            <p className="text-gray-600">
              Play fun games to learn about money, investing, and more!
            </p>
          </div>
          
          <div className="relative w-full md:w-auto md:min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search games..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All Games</TabsTrigger>
            <TabsTrigger value="simulation" className="flex items-center gap-1">
              <Gamepad className="w-4 h-4" /> Simulations
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center gap-1">
              <Star className="w-4 h-4" /> Quizzes
            </TabsTrigger>
            <TabsTrigger value="challenge" className="flex items-center gap-1">
              <Trophy className="w-4 h-4" /> Challenges
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredGames.map((game) => (
                <Card key={game.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="border-b bg-muted/40">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {game.title}
                          <Badge variant="outline" className={getDifficultyColor(game.difficulty)}>
                            {game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1)}
                          </Badge>
                        </CardTitle>
                      </div>
                      <div className="text-4xl">{game.imageUrl}</div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-4">
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">{game.description}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        {getGameTypeIcon(game.type)}
                        {game.type.charAt(0).toUpperCase() + game.type.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500">
                        Min Level: {game.minLevel}
                      </span>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="bg-muted/20 pt-4">
                    <Button 
                      onClick={() => handlePlayGame(game)}
                      className="w-full"
                      disabled={playingGame === game.id || userProgress.level < game.minLevel}
                    >
                      {playingGame === game.id ? "Loading Game..." : "Play Now"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {filteredGames.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-xl text-gray-500">No games found matching "{searchTerm}"</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {["simulation", "quiz", "challenge"].map((type) => (
            <TabsContent key={type} value={type} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {financialGames
                  .filter(game => game.type === type && 
                    (game.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    game.description.toLowerCase().includes(searchTerm.toLowerCase())))
                  .map((game) => (
                    <Card key={game.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardHeader className="border-b bg-muted/40">
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              {game.title}
                              <Badge variant="outline" className={getDifficultyColor(game.difficulty)}>
                                {game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1)}
                              </Badge>
                            </CardTitle>
                          </div>
                          <div className="text-4xl">{game.imageUrl}</div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pt-4">
                        <div className="mb-4">
                          <p className="text-sm text-gray-600">{game.description}</p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1 text-sm text-gray-500">
                            {getGameTypeIcon(game.type)}
                            {game.type.charAt(0).toUpperCase() + game.type.slice(1)}
                          </span>
                          <span className="text-sm text-gray-500">
                            Min Level: {game.minLevel}
                          </span>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="bg-muted/20 pt-4">
                        <Button 
                          onClick={() => handlePlayGame(game)}
                          className="w-full"
                          disabled={playingGame === game.id || userProgress.level < game.minLevel}
                        >
                          {playingGame === game.id ? "Loading Game..." : "Play Now"}
                        </Button>
                      </CardFooter>
                    </Card>
                ))}
                
                {financialGames
                  .filter(game => game.type === type && 
                    (game.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    game.description.toLowerCase().includes(searchTerm.toLowerCase())))
                  .length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <p className="text-xl text-gray-500">No {type} games found matching "{searchTerm}"</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
      
      <Footer />
      <Navigation />
    </div>
  );
};

export default Games;
