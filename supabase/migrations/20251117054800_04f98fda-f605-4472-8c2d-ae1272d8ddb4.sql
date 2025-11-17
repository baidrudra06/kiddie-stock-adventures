-- Fix security issues by recreating view without security definer
DROP VIEW IF EXISTS public.leaderboard;

CREATE VIEW public.leaderboard AS
SELECT 
  p.id,
  p.username,
  p.avatar_url,
  up.level,
  up.coins,
  up.experience,
  up.total_games_played,
  COUNT(DISTINCT ua.achievement_id) as achievements_count,
  RANK() OVER (ORDER BY up.experience DESC) as rank
FROM public.profiles p
LEFT JOIN public.user_progress up ON p.id = up.user_id
LEFT JOIN public.user_achievements ua ON p.id = ua.user_id
GROUP BY p.id, p.username, p.avatar_url, up.level, up.coins, up.experience, up.total_games_played;