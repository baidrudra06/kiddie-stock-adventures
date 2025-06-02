
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, DollarSign, TrendingUp } from 'lucide-react';
import { BusinessProperty, BusinessPlayer } from './businessData';

interface PropertyModalProps {
  property: BusinessProperty;
  player: BusinessPlayer;
  onBuy: (propertyId: number) => void;
  onSkip: () => void;
}

const PropertyModal = ({ property, player, onBuy, onSkip }: PropertyModalProps) => {
  const canAfford = player.money >= property.price;
  
  const getColorGroupColor = (colorGroup: string): string => {
    const colors = {
      purple: 'from-purple-50 to-purple-100 border-purple-200',
      lightblue: 'from-blue-50 to-blue-100 border-blue-200',
      pink: 'from-pink-50 to-pink-100 border-pink-200',
      orange: 'from-orange-50 to-orange-100 border-orange-200',
      red: 'from-red-50 to-red-100 border-red-200',
      yellow: 'from-yellow-50 to-yellow-100 border-yellow-200',
      green: 'from-green-50 to-green-100 border-green-200',
      blue: 'from-blue-50 to-blue-100 border-blue-200',
      transportation: 'from-gray-50 to-gray-100 border-gray-200',
      utilities: 'from-amber-50 to-amber-100 border-amber-200'
    };
    return colors[colorGroup as keyof typeof colors] || 'from-gray-50 to-gray-100 border-gray-200';
  };

  const formatCurrency = (amount: number): string => {
    return `${amount.toLocaleString()} BC`;
  };

  const getPropertyTypeIcon = () => {
    switch (property.type) {
      case 'startup':
        return <TrendingUp className="h-6 w-6 text-purple-500" />;
      case 'corporation':
        return <Building className="h-6 w-6 text-blue-500" />;
      default:
        return <DollarSign className="h-6 w-6 text-green-500" />;
    }
  };

  const estimateROI = (): string => {
    const annualRent = property.rent[0] * 12; // Assuming rent is monthly
    const roi = (annualRent / property.price) * 100;
    return `${roi.toFixed(1)}%`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className={`w-full max-w-lg bg-gradient-to-br ${getColorGroupColor(property.colorGroup)} shadow-2xl animate-scale-in`}>
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center items-center gap-2 mb-2">
            {getPropertyTypeIcon()}
            <CardTitle className="text-xl font-bold">
              Investment Opportunity
            </CardTitle>
          </div>
          <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {property.colorGroup.replace('_', ' ')} Sector
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">{property.name}</h3>
            <p className="text-muted-foreground">{property.description}</p>
          </div>
          
          {/* Investment Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white bg-opacity-50 rounded-lg">
              <div className="text-sm text-muted-foreground">Purchase Price</div>
              <div className="text-xl font-bold text-blue-600">
                {formatCurrency(property.price)}
              </div>
            </div>
            
            <div className="text-center p-3 bg-white bg-opacity-50 rounded-lg">
              <div className="text-sm text-muted-foreground">Base Rent</div>
              <div className="text-xl font-bold text-green-600">
                {formatCurrency(property.rent[0])}
              </div>
            </div>
            
            <div className="text-center p-3 bg-white bg-opacity-50 rounded-lg">
              <div className="text-sm text-muted-foreground">Est. ROI</div>
              <div className="text-xl font-bold text-purple-600">
                {estimateROI()}
              </div>
            </div>
            
            <div className="text-center p-3 bg-white bg-opacity-50 rounded-lg">
              <div className="text-sm text-muted-foreground">Your Cash</div>
              <div className={`text-xl font-bold ${canAfford ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(player.money)}
              </div>
            </div>
          </div>
          
          {/* Upgrade Potential */}
          {property.upgradeNames && (
            <div className="p-3 bg-white bg-opacity-50 rounded-lg">
              <div className="text-sm font-bold mb-2">Development Potential:</div>
              <div className="text-xs space-y-1">
                {property.upgradeNames.map((upgrade, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{upgrade}:</span>
                    <span className="font-bold">
                      {property.rent[index + 1] ? formatCurrency(property.rent[index + 1]) : 'N/A'} rent
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button 
              onClick={() => onBuy(property.id)}
              disabled={!canAfford}
              className="flex-1 animate-glow-pulse"
              variant={canAfford ? "default" : "secondary"}
            >
              {canAfford ? 'Invest Now!' : 'Insufficient Funds'}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={onSkip}
              className="flex-1"
            >
              Pass
            </Button>
          </div>
          
          {!canAfford && (
            <div className="text-center text-sm text-red-600 font-medium">
              You need {formatCurrency(property.price - player.money)} more to make this investment
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyModal;
