import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Target, Coins, TrendingUp, Building, Users, AlertTriangle } from 'lucide-react';

interface GameRulesProps {
  onClose: () => void;
}

const GameRules = ({ onClose }: GameRulesProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl">
        <CardHeader className="text-center border-b">
          <div className="flex justify-center mb-4">
            <BookOpen className="h-8 w-8 text-blue-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Business Empire Monopoly Rules</CardTitle>
          <p className="text-muted-foreground">Master the art of business and build your empire!</p>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {/* Objective */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-500" />
              <h3 className="text-lg font-bold">Objective</h3>
            </div>
            <p className="text-muted-foreground ml-7">
              Build the most successful business empire by acquiring properties, collecting rent, 
              and strategically investing your Business Credits (BC) to bankrupt your opponents.
            </p>
          </div>

          {/* Setup */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-bold">Game Setup</h3>
            </div>
            <ul className="text-muted-foreground ml-7 space-y-1">
              <li>• Each player starts with 15,000 Business Credits (BC)</li>
              <li>• Choose your unique business token and role</li>
              <li>• All players begin at the Business Incubator (GO)</li>
              <li>• 2-6 players can participate</li>
            </ul>
          </div>

          {/* Currency System */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-yellow-500" />
              <h3 className="text-lg font-bold">Business Credits (BC) System</h3>
            </div>
            <div className="ml-7 space-y-2">
              <p className="text-muted-foreground">
                Our unique currency represents your business capital:
              </p>
              <ul className="text-muted-foreground space-y-1">
                <li>• Denominations: 1, 5, 10, 20, 50, 100, 500, 1K, 5K BC</li>
                <li>• Collect 2,000 BC each time you pass GO</li>
                <li>• Use BC to purchase properties and pay expenses</li>
                <li>• Track your net worth including cash + property values</li>
              </ul>
            </div>
          </div>

          {/* Property Types */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-purple-500" />
              <h3 className="text-lg font-bold">Property Categories</h3>
            </div>
            <div className="ml-7 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <div className="font-medium">🔹 Tech Startups (Purple)</div>
                <div className="font-medium">🔹 E-commerce (Light Blue)</div>
                <div className="font-medium">🔹 Entertainment (Pink)</div>
                <div className="font-medium">🔹 Manufacturing (Orange)</div>
              </div>
              <div className="space-y-2">
                <div className="font-medium">🔹 Real Estate (Red)</div>
                <div className="font-medium">🔹 Financial Services (Yellow)</div>
                <div className="font-medium">🔹 Healthcare (Green)</div>
                <div className="font-medium">🔹 Luxury Premium (Blue)</div>
              </div>
            </div>
          </div>

          {/* Gameplay */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-bold">Gameplay Mechanics</h3>
            </div>
            <div className="ml-7 space-y-3">
              <div>
                <div className="font-medium mb-1">🎲 Movement & Actions</div>
                <ul className="text-muted-foreground text-sm space-y-1">
                  <li>• Roll two dice to move around the board</li>
                  <li>• Rolling doubles gives you another turn</li>
                  <li>• Land on unowned properties to purchase them</li>
                  <li>• Pay rent when landing on opponent's properties</li>
                </ul>
              </div>

              <div>
                <div className="font-medium mb-1">🏢 Property Development</div>
                <ul className="text-muted-foreground text-sm space-y-1">
                  <li>• Own all properties in a color group to create a monopoly</li>
                  <li>• Develop properties with business upgrades (Marketing, R&D, HQ)</li>
                  <li>• Higher development = higher rent income</li>
                  <li>• Strategic placement maximizes returns</li>
                </ul>
              </div>

              <div>
                <div className="font-medium mb-1">📋 Special Spaces</div>
                <ul className="text-muted-foreground text-sm space-y-1">
                  <li>• Innovation Fund/Market Opportunity: Draw event cards</li>
                  <li>• Corporate Tax: Pay business taxes</li>
                  <li>• Compliance Review: Regulatory oversight (jail)</li>
                  <li>• Logistics Hubs: Transportation investments</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Event Cards */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <h3 className="text-lg font-bold">Event Cards (30 Types)</h3>
            </div>
            <div className="ml-7 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <div className="font-medium text-green-600 mb-1">Opportunities (10)</div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• IPO Success, Viral Marketing</li>
                  <li>• Government Contracts, Patents</li>
                  <li>• Celebrity Endorsements</li>
                </ul>
              </div>
              <div>
                <div className="font-medium text-red-600 mb-1">Crises (10)</div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Supply Chain Disruption</li>
                  <li>• Cybersecurity Breaches</li>
                  <li>• Regulatory Fines</li>
                </ul>
              </div>
              <div>
                <div className="font-medium text-yellow-600 mb-1">Market Events (5)</div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Bull/Bear Market Swings</li>
                  <li>• Interest Rate Changes</li>
                </ul>
              </div>
              <div>
                <div className="font-medium text-blue-600 mb-1">Innovation (5)</div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Quantum Computing Breakthrough</li>
                  <li>• Green Energy Subsidies</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Player Roles */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-500" />
              <h3 className="text-lg font-bold">Player Roles & Tokens</h3>
            </div>
            <div className="ml-7 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="space-y-2">
                <div>💻 <span className="font-medium">Laptop (Entrepreneur):</span> +10% tech returns</div>
                <div>💼 <span className="font-medium">Briefcase (Executive):</span> +500 BC at GO</div>
                <div>🚗 <span className="font-medium">Electric Car (Innovator):</span> Half transport costs</div>
                <div>🚀 <span className="font-medium">Rocket (Pioneer):</span> Double move on 6+</div>
              </div>
              <div className="space-y-2">
                <div>💎 <span className="font-medium">Diamond (Mogul):</span> +20% luxury rent</div>
                <div>🤖 <span className="font-medium">Robot (AI Specialist):</span> Tech crisis immunity</div>
                <div>🌍 <span className="font-medium">Globe (Trader):</span> No international penalties</div>
                <div>📈 <span className="font-medium">Chart (Analyst):</span> Preview event cards</div>
              </div>
            </div>
          </div>

          {/* Winning */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-500" />
              <h3 className="text-lg font-bold">Victory Conditions</h3>
            </div>
            <ul className="text-muted-foreground ml-7 space-y-1">
              <li>• Last player remaining with positive net worth wins</li>
              <li>• Bankruptcy occurs when unable to pay debts</li>
              <li>• Strategic property trading can change the game</li>
              <li>• Build monopolies for maximum income generation</li>
            </ul>
          </div>

          <div className="text-center pt-4 border-t">
            <Button onClick={onClose} className="px-8">
              Start Building Your Empire!
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameRules;
