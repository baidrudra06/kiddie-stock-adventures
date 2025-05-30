
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Property {
  id: number;
  name: string;
  price: number;
  rent: number;
  owner: 'player' | 'ai' | null;
  color: string;
}

interface PurchaseDialogProps {
  property: Property | null;
  onBuy: (propertyId: number) => void;
  onSkip: () => void;
}

const PurchaseDialog = ({ property, onBuy, onSkip }: PurchaseDialogProps) => {
  if (!property) return null;

  return (
    <Card className="glass-effect border-2 border-primary">
      <CardHeader>
        <CardTitle className="text-center">Purchase Property?</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div>
          <h3 className="font-bold text-lg">{property.name}</h3>
          <p className="text-sm text-muted-foreground">
            Price: ${property.price} | Rent: ${property.rent}
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => onBuy(property.id)}>
            Buy Property
          </Button>
          <Button variant="outline" onClick={onSkip}>
            Skip
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PurchaseDialog;
