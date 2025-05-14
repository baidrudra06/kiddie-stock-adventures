
import { useNavigate, useLocation } from "react-router-dom";
import { Home, BookOpen, TrendingUp, PieChart, Gamepad } from "lucide-react";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/learn", label: "Learn", icon: BookOpen },
    { path: "/trade", label: "Trade", icon: TrendingUp },
    { path: "/portfolio", label: "Portfolio", icon: PieChart },
    { path: "/trading-games", label: "Trading Games", icon: Gamepad },
    { path: "/games", label: "Games", icon: Gamepad },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg md:hidden z-40">
      <div className="flex justify-around py-2">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors ${
              isActive(item.path)
                ? "text-primary bg-primary/20"
                : "text-muted-foreground"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
