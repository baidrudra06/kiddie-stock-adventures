import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface LeaderboardEntry {
  id: string;
  username: string | null;
  avatar_url: string | null;
  level: number;
  coins: number;
  experience: number;
  total_games_played: number;
  achievements_count: number;
  rank: number;
}

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .limit(100);

      if (error) throw error;
      setLeaderboard(data || []);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Award className="h-6 w-6 text-amber-600" />;
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 pb-20 md:pb-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Leaderboard</h1>
          <p className="text-muted-foreground">See how you rank against other young investors!</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p>Loading leaderboard...</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-4">
            {leaderboard.map((entry) => (
              <Card key={entry.id} className={entry.rank <= 3 ? 'border-primary/50' : ''}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 min-w-[80px]">
                      {getRankIcon(entry.rank)}
                      <span className="text-2xl font-bold text-muted-foreground">#{entry.rank}</span>
                    </div>

                    <Avatar className="h-12 w-12">
                      <AvatarFallback>
                        {(entry.username || 'U')[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{entry.username || 'Anonymous'}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Level {entry.level}</span>
                        <span>•</span>
                        <span>{entry.coins} coins</span>
                        <span>•</span>
                        <span>{entry.achievements_count} achievements</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1 text-primary font-semibold">
                        <TrendingUp className="h-4 w-4" />
                        <span>{entry.experience} XP</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {entry.total_games_played} games
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {leaderboard.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground">No players yet. Be the first!</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>

      <Footer />
      <Navigation />
    </div>
  );
};

export default Leaderboard;
