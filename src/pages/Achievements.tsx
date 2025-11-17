import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, TrendingUp, Gamepad2, Star, Coins, BookOpen, Flame, Lock } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement_value: number;
  coins_reward: number;
  earned?: boolean;
  earned_at?: string;
}

const iconMap: Record<string, any> = {
  TrendingUp,
  Trophy,
  Gamepad2,
  Star,
  Coins,
  BookOpen,
  Flame
};

const Achievements = () => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAchievements();
    }
  }, [user]);

  const fetchAchievements = async () => {
    try {
      // Fetch all achievements
      const { data: allAchievements, error: achievementsError } = await supabase
        .from('achievements')
        .select('*');

      if (achievementsError) throw achievementsError;

      // Fetch user's earned achievements
      const { data: userAchievements, error: userError } = await supabase
        .from('user_achievements')
        .select('achievement_id, earned_at')
        .eq('user_id', user?.id);

      if (userError) throw userError;

      // Merge data
      const earnedIds = new Set(userAchievements?.map(ua => ua.achievement_id));
      const mergedData = allAchievements?.map(achievement => ({
        ...achievement,
        earned: earnedIds.has(achievement.id),
        earned_at: userAchievements?.find(ua => ua.achievement_id === achievement.id)?.earned_at
      }));

      setAchievements(mergedData || []);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 pb-20 md:pb-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Achievements</h1>
          <p className="text-muted-foreground">Unlock badges as you master financial skills!</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p>Loading achievements...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {achievements.map((achievement) => {
              const Icon = iconMap[achievement.icon] || Trophy;
              return (
                <Card 
                  key={achievement.id} 
                  className={`transition-all ${achievement.earned ? 'border-primary shadow-lg' : 'opacity-60'}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-full ${achievement.earned ? 'bg-primary/20' : 'bg-muted'}`}>
                        {achievement.earned ? (
                          <Icon className="h-8 w-8 text-primary" />
                        ) : (
                          <Lock className="h-8 w-8 text-muted-foreground" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{achievement.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <Badge variant={achievement.earned ? "default" : "outline"}>
                            {achievement.earned ? 'Earned!' : 'Locked'}
                          </Badge>
                          <span className="text-sm font-medium">
                            +{achievement.coins_reward} coins
                          </span>
                        </div>
                        
                        {achievement.earned && achievement.earned_at && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Earned {new Date(achievement.earned_at).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
      <Navigation />
    </div>
  );
};

export default Achievements;
