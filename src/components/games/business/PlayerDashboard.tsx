
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins, TrendingUp, Building, Crown } from 'lucide-react';
import { BusinessPlayer, playerTokens } from './businessData';

interface PlayerDashboardProps {
  players: BusinessPlayer[];
  currentPlayer: number;
}

const PlayerDashboard = ({ players, currentPlayer }: PlayerDashboardProps) => {
  const getPlayerToken = (tokenId: string) => {
    return playerTokens.find(token => token.id === tokenId) || playerTokens[0];
  };

  const formatCurrency = (amount: number): string => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M BC`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K BC`;
    }
    return `${amount} BC`;
  };

  const getRoleColor = (role: string): string => {
    const colors = {
      entrepreneur: 'text-blue-500',
      investor: 'text-green-500',
      executive: 'text-purple-500',
      startup_founder: 'text-orange-500'
    };
    return colors[role as keyof typeof colors] || 'text-gray-500';
  };

  const getRoleIcon = (role: string) => {
    const icons = {
      entrepreneur: TrendingUp,
      investor: Coins,
      executive: Building,
      startup_founder: Crown
    };
    const IconComponent = icons[role as keyof typeof icons] || TrendingUp;
    return <IconComponent className="h-4 w-4" />;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {players.map((player, index) => {
        const token = getPlayerToken(player.token);
        const isCurrentPlayer = index === currentPlayer;
        
        return (
          <Card 
            key={player.id} 
            className={`glass-effect transition-all duration-300 ${
              isCurrentPlayer ? 'ring-2 ring-primary scale-105' : ''
            }`}
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{token.icon}</span>
                  <div>
                    <div className="font-bold">{player.name}</div>
                    <div className={`text-xs flex items-center gap-1 ${getRoleColor(player.role)}`}>
                      {getRoleIcon(player.role)}
                      {player.role.replace('_', ' ')}
                    </div>
                  </div>
                </div>
                {isCurrentPlayer && (
                  <div className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                    Active
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-3">
              {/* Financial Stats */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Cash:</span>
                  <span className="font-bold text-green-400">
                    {formatCurrency(player.money)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Net Worth:</span>
                  <span className="font-bold text-blue-400">
                    {formatCurrency(player.netWorth)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Properties:</span>
                  <span className="font-bold">{player.properties.length}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Portfolio:</span>
                  <span className="font-bold text-purple-400">
                    {formatCurrency(player.portfolioValue)}
                  </span>
                </div>
              </div>
              
              {/* Status Indicators */}
              <div className="space-y-1">
                {player.isInJail && (
                  <div className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                    🏢 In Compliance Review
                  </div>
                )}
                
                {player.properties.length >= 3 && (
                  <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    🏆 Portfolio Diversified
                  </div>
                )}
                
                {player.netWorth >= 50000 && (
                  <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    💎 Business Mogul
                  </div>
                )}
              </div>
              
              {/* Player Position */}
              <div className="text-xs text-muted-foreground">
                Position: Space #{player.position}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default PlayerDashboard;
