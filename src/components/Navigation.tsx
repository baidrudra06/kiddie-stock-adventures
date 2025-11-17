
import { NavLink } from "react-router-dom";
import { Home, BookOpen, TrendingUp, Briefcase, GamepadIcon, Bot, Trophy, Award } from "lucide-react";

const Navigation = () => {
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/learn", icon: BookOpen, label: "Learn" },
    { to: "/trade", icon: TrendingUp, label: "Trade" },
    { to: "/games", icon: GamepadIcon, label: "Games" },
    { to: "/leaderboard", icon: Trophy, label: "Leaders" },
    { to: "/achievements", icon: Award, label: "Badges" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 md:hidden z-40">
      <div className="flex justify-around items-center py-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`
            }
          >
            <Icon className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
