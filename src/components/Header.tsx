
import { NavLink } from "react-router-dom";
import { Bot, Users, Trophy, Award, LogOut } from "lucide-react";
import UserAvatar from "./UserAvatar";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";

const Header = () => {
  const { signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">KT</span>
            </div>
            <span className="font-bold text-xl gradient-text">KiddieTrade</span>
          </NavLink>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink 
            to="/learn" 
            className={({ isActive }) => 
              `text-sm font-medium transition-colors hover:text-primary ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`
            }
          >
            Learn
          </NavLink>
          <NavLink 
            to="/trade" 
            className={({ isActive }) => 
              `text-sm font-medium transition-colors hover:text-primary ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`
            }
          >
            Trade
          </NavLink>
          <NavLink 
            to="/games" 
            className={({ isActive }) => 
              `text-sm font-medium transition-colors hover:text-primary ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`
            }
          >
            Games
          </NavLink>
          <NavLink 
            to="/leaderboard" 
            className={({ isActive }) => 
              `text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`
            }
          >
            <Trophy className="w-4 h-4" />
            Leaderboard
          </NavLink>
          <NavLink 
            to="/achievements" 
            className={({ isActive }) => 
              `text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`
            }
          >
            <Award className="w-4 h-4" />
            Achievements
          </NavLink>
          <NavLink 
            to="/ai-chat" 
            className={({ isActive }) => 
              `text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`
            }
          >
            <Bot className="w-4 h-4" />
            AI Chat
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <UserAvatar />
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={signOut}
            className="hidden md:flex items-center gap-1"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
