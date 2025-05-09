
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AchievementData } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { useGameContext } from "@/contexts/GameContext";

const PortfolioAchievements = () => {
  const { toast } = useToast();
  const { portfolio, transactions, userProgress } = useGameContext();
  const [achievements, setAchievements] = useState<AchievementData[]>([]);

  useEffect(() => {
    // Define achievements based on user actions
    const achievementsList: AchievementData[] = [
      {
        id: '1',
        title: 'First Trade',
        description: 'Buy your first stock',
        icon: '🛒',
        unlocked: transactions.filter(t => t.type === 'buy').length > 0,
      },
      {
        id: '2',
        title: 'Portfolio Builder',
        description: 'Own 5 different stocks',
        icon: '📊',
        unlocked: portfolio.length >= 5,
        progress: Math.min(portfolio.length, 5),
        maxProgress: 5
      },
      {
        id: '3',
        title: 'Trading Expert',
        description: 'Make 10 trades',
        icon: '🔄',
        unlocked: transactions.length >= 10,
        progress: Math.min(transactions.length, 10),
        maxProgress: 10
      },
      {
        id: '4',
        title: 'Wise Investor',
        description: 'Complete 5 lessons',
        icon: '🧠',
        unlocked: userProgress.completedLessons.length >= 5,
        progress: Math.min(userProgress.completedLessons.length, 5),
        maxProgress: 5
      },
      {
        id: '5',
        title: 'Money Maker',
        description: 'Earn 500 coins',
        icon: '💰',
        unlocked: userProgress.coins >= 500,
        progress: Math.min(userProgress.coins, 500),
        maxProgress: 500
      },
      {
        id: '6',
        title: 'Level Up',
        description: 'Reach level 5',
        icon: '⭐',
        unlocked: userProgress.level >= 5,
        progress: userProgress.level,
        maxProgress: 5
      },
    ];

    setAchievements(achievementsList);
  }, [portfolio, transactions, userProgress]);

  const handleAchievementClick = (achievement: AchievementData) => {
    if (achievement.unlocked) {
      toast({
        title: `Achievement Unlocked: ${achievement.title}`,
        description: `You've earned this badge! ${achievement.description}`,
      });
    } else {
      toast({
        title: `Achievement Locked: ${achievement.title}`,
        description: `To unlock: ${achievement.description}${achievement.progress ? ` (${achievement.progress}/${achievement.maxProgress})` : ''}`,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Achievements</CardTitle>
        <CardDescription>Track your investing journey milestones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 border rounded-lg flex flex-col items-center text-center gap-2 cursor-pointer hover:bg-slate-50 transition-colors ${
                achievement.unlocked ? "border-green-400" : "border-gray-200"
              }`}
              onClick={() => handleAchievementClick(achievement)}
            >
              <div 
                className={`text-2xl p-3 rounded-full ${
                  achievement.unlocked ? "bg-green-100" : "bg-gray-100"
                }`}
              >
                {achievement.icon}
              </div>
              <div>
                <h3 className="font-medium text-sm">{achievement.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{achievement.description}</p>
                {achievement.progress !== undefined && achievement.maxProgress && (
                  <div className="mt-2">
                    <Progress
                      value={(achievement.progress / achievement.maxProgress) * 100}
                      className="h-2"
                    />
                    <p className="text-xs mt-1 text-gray-500">
                      {achievement.progress}/{achievement.maxProgress}
                    </p>
                  </div>
                )}
              </div>
              {achievement.unlocked && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Unlocked
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioAchievements;
