
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useGameContext } from "@/contexts/GameContext";
import { PiggyBank } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const { cash, userProgress } = useGameContext();

  return (
    <header className="bg-gradient-to-r from-primary to-accent py-3 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-1 bg-white rounded-full shadow-inner">
            <PiggyBank className="h-8 w-8 text-primary" />
          </div>
          <h1 
            className="text-2xl md:text-3xl font-extrabold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Kiddie Stock Adventures
          </h1>
        </div>
        
        <div className="flex gap-4 items-center">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2">
              <span className="font-bold">💰 ${cash.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">🪙 {userProgress.coins} coins</span>
            </div>
          </div>
          
          <div className="hidden md:flex gap-2">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => navigate("/learn")}
            >
              Learn
            </Button>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => navigate("/trade")}
            >
              Trade
            </Button>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => navigate("/portfolio")}
            >
              Portfolio
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
