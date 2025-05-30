
import { Card, CardContent } from '@/components/ui/card';

interface Property {
  id: number;
  name: string;
  price: number;
  rent: number;
  owner: 'player' | 'ai' | null;
  color: string;
}

interface Player {
  id: 'player' | 'ai';
  name: string;
  money: number;
  position: number;
  properties: number[];
  color: string;
}

interface GameBoardProps {
  gameBoard: Property[];
  players: Player[];
}

const GameBoard = ({ gameBoard, players }: GameBoardProps) => {
  return (
    <Card className="glass-effect">
      <CardContent className="p-6">
        <div className="grid grid-cols-4 gap-2 mb-6">
          {gameBoard.map((property, index) => {
            const playersHere = players.filter(p => p.position === index);
            
            return (
              <div
                key={property.id}
                className={`${property.color} p-2 rounded-lg text-center text-xs relative min-h-16 flex flex-col justify-between border-2 ${
                  property.owner === 'player' ? 'border-blue-500' : 
                  property.owner === 'ai' ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <div className="font-bold">{property.name}</div>
                {property.price > 0 && (
                  <div className="text-xs">
                    <div>${property.price}</div>
                    <div>Rent: ${property.rent}</div>
                  </div>
                )}
                
                {/* Player indicators */}
                {playersHere.length > 0 && (
                  <div className="absolute -top-2 -right-2 flex gap-1">
                    {playersHere.map((player) => (
                      <div
                        key={player.id}
                        className={`w-4 h-4 rounded-full ${player.color} border-2 border-white`}
                        title={player.name}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default GameBoard;
