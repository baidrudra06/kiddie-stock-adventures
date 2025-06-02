
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, AlertTriangle, Lightbulb } from 'lucide-react';
import { EventCard } from './businessData';

interface EventCardModalProps {
  card: EventCard;
  onExecute: (card: EventCard) => void;
}

const EventCardModal = ({ card, onExecute }: EventCardModalProps) => {
  const getCardIcon = () => {
    switch (card.type) {
      case 'opportunity':
        return <TrendingUp className="h-8 w-8 text-green-500" />;
      case 'crisis':
        return <TrendingDown className="h-8 w-8 text-red-500" />;
      case 'market':
        return <AlertTriangle className="h-8 w-8 text-yellow-500" />;
      case 'innovation':
        return <Lightbulb className="h-8 w-8 text-blue-500" />;
      default:
        return <AlertTriangle className="h-8 w-8 text-gray-500" />;
    }
  };

  const getCardBackground = () => {
    switch (card.type) {
      case 'opportunity':
        return 'bg-gradient-to-br from-green-50 to-green-100 border-green-200';
      case 'crisis':
        return 'bg-gradient-to-br from-red-50 to-red-100 border-red-200';
      case 'market':
        return 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200';
      case 'innovation':
        return 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200';
      default:
        return 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200';
    }
  };

  const formatMoneyChange = (amount: number): string => {
    if (amount > 0) {
      return `+${amount.toLocaleString()} BC`;
    } else if (amount < 0) {
      return `${amount.toLocaleString()} BC`;
    }
    return '0 BC';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className={`w-full max-w-md ${getCardBackground()} shadow-2xl animate-scale-in`}>
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            {getCardIcon()}
          </div>
          <CardTitle className="text-xl font-bold">
            {card.title}
          </CardTitle>
          <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {card.type.replace('_', ' ')} Card
          </div>
        </CardHeader>
        
        <CardContent className="text-center space-y-6">
          <p className="text-lg">{card.description}</p>
          
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Financial Impact:</div>
            <div className={`text-2xl font-bold ${
              card.moneyChange >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {formatMoneyChange(card.moneyChange)}
            </div>
          </div>
          
          <Button 
            onClick={() => onExecute(card)}
            className="w-full animate-glow-pulse"
            variant={card.moneyChange >= 0 ? "default" : "destructive"}
          >
            {card.moneyChange >= 0 ? 'Collect Reward' : 'Pay Cost'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventCardModal;
