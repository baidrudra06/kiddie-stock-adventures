
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useGameContext } from "@/contexts/GameContext";

const Parents = () => {
  const navigate = useNavigate();
  const { resetGame, userProgress } = useGameContext();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  
  const handleResetGame = () => {
    resetGame();
    setShowResetConfirm(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Game
        </Button>
        
        <h1 className="text-3xl font-bold mb-2">Parents Area</h1>
        <p className="text-gray-600 mb-8">
          Monitor your child's progress and manage settings
        </p>
        
        <Tabs defaultValue="progress">
          <TabsList className="mb-6">
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="about">About the Game</TabsTrigger>
          </TabsList>
          
          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="border rounded-md p-4">
                    <h3 className="text-sm text-gray-500 mb-1">Current Level</h3>
                    <p className="font-bold text-2xl">{userProgress.level}</p>
                  </div>
                  <div className="border rounded-md p-4">
                    <h3 className="text-sm text-gray-500 mb-1">Experience Points</h3>
                    <p className="font-bold text-2xl">{userProgress.experience}</p>
                  </div>
                  <div className="border rounded-md p-4">
                    <h3 className="text-sm text-gray-500 mb-1">Lessons Completed</h3>
                    <p className="font-bold text-2xl">{userProgress.completedLessons.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>What Your Child is Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold mb-2">Financial Literacy</h3>
                    <p className="text-gray-600">
                      Understanding the basics of money, saving, and spending responsibility.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Stock Market Concepts</h3>
                    <p className="text-gray-600">
                      Introduction to stocks, companies, and how the stock market works.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Investment Strategy</h3>
                    <p className="text-gray-600">
                      Simple strategies for long-term investing and portfolio diversification.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Decision Making</h3>
                    <p className="text-gray-600">
                      Critical thinking skills to make informed financial decisions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Game Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold mb-4">Reset Game Progress</h3>
                    <p className="text-gray-600 mb-4">
                      This will reset all progress, portfolio, and transactions. This action cannot be undone.
                    </p>
                    <Dialog open={showResetConfirm} onOpenChange={setShowResetConfirm}>
                      <DialogTrigger asChild>
                        <Button variant="destructive">Reset Game</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you sure?</DialogTitle>
                          <DialogDescription>
                            This will reset all game progress including cash, portfolio, lessons completed, 
                            and transaction history. This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setShowResetConfirm(false)}>
                            Cancel
                          </Button>
                          <Button variant="destructive" onClick={handleResetGame}>
                            Yes, Reset Game
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About Kiddie Stock Adventures</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold mb-2">Educational Approach</h3>
                    <p className="text-gray-600">
                      Kiddie Stock Adventures uses a play-based learning approach to introduce children to 
                      important financial concepts. Through interactive lessons, simulated trading, and rewards, 
                      kids learn valuable skills that will benefit them throughout their lives.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold mb-2">Safe Learning Environment</h3>
                    <p className="text-gray-600">
                      This is a completely safe environment for children to learn about stocks and investing. 
                      The game uses virtual money and simplified concepts appropriate for young learners. 
                      No real money is involved, and there are no in-app purchases.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold mb-2">How to Support Your Child's Learning</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      <li>Ask them to explain what they're learning about money and stocks</li>
                      <li>Discuss real-world examples of companies they know</li>
                      <li>Talk about your own experiences with saving and investing</li>
                      <li>Set goals together for what they want to achieve in the game</li>
                      <li>Celebrate their achievements as they complete lessons</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Parents;
