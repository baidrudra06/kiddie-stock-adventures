
import { Link, useLocation } from "react-router-dom";
import { useGameContext } from "@/contexts/GameContext";
import UserAvatar from "./UserAvatar";

const Header = () => {
  const location = useLocation();
  const { userProgress } = useGameContext();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold flex items-center">
              <span className="mr-2">📈</span>
              <span className="hidden sm:block">Kiddie Stock Adventures</span>
              <span className="block sm:hidden">KSA</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/")
                  ? "text-primary bg-primary/10"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Home
            </Link>
            <Link
              to="/learn"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/learn") || location.pathname.startsWith("/learn/")
                  ? "text-primary bg-primary/10"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Learn
            </Link>
            <Link
              to="/trade"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/trade") || location.pathname.startsWith("/trade/")
                  ? "text-primary bg-primary/10"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Trade
            </Link>
            <Link
              to="/portfolio"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/portfolio")
                  ? "text-primary bg-primary/10"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Portfolio
            </Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full">
              <span className="text-lg">💰</span>
              <span className="font-medium">{userProgress.coins}</span>
            </div>
            
            <div className="flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-full">
              <span className="text-lg">⭐</span>
              <span className="font-medium">{userProgress.level}</span>
            </div>
            
            <UserAvatar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
