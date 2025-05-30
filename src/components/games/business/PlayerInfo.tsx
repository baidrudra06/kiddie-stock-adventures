
import { Card, CardContent } from '@/components/ui/card';
import { Coins, User, Bot } from 'lucide-react';

interface Player {
  id: 'player' | 'ai';
  name: string;
  money: number;
  position: number;
  properties: number[];
  color: string;
}

interface PlayerInfoProps {
  players: Player[];
  currentPlayer: 'player' | 'ai';
}

const PlayerInfo = ({ players, currentPlayer }: PlayerInfoProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {players.map((player) => (
        <Card key={player.id} className={`glass-effect ${currentPlayer === player.id ? 'ring-2 ring-primary' : ''}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              {player.id === 'player' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              <span className="font-bold">{player.name}</span>
              {currentPlayer === player.id && <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Current</span>}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Coins className="h-4 w-4 text-yellow-500" />
              <span>${player.money}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Properties: {player.properties.length}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PlayerInfo;
