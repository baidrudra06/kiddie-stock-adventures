
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { useGameContext } from "@/contexts/GameContext";

const Home = () => {
  const navigate = useNavigate();
  const { userProgress } = useGameContext();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 pb-20 md:pb-8">
        {/* Hero Section */}
        <section className="mb-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Learn Stocks & Trading the Fun Way!
              </h1>
              <p className="text-xl mb-6 text-gray-600">
                Join our friendly characters on an adventure through the world of money, stocks, and investing. Perfect for kids ages 8-12!
              </p>
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/learn")}
                  className="text-lg group"
                >
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate("/trade")}
                  className="text-lg"
                >
                  Try Trading
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 bg-accent/20 rounded-full flex items-center justify-center">
                  <div className="text-9xl animate-float">🚀</div>
                </div>
                <div className="absolute -top-4 -right-2 text-4xl animate-float" style={{animationDelay: '0.5s'}}>💰</div>
                <div className="absolute -bottom-2 -left-4 text-4xl animate-float" style={{animationDelay: '1s'}}>📈</div>
                <div className="absolute top-1/2 -right-6 text-4xl animate-float" style={{animationDelay: '1.5s'}}>💎</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Learn With Fun Activities</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="overflow-hidden hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="text-5xl mb-4 animate-float">📚</div>
                <h3 className="text-xl font-bold mb-2">Fun Lessons</h3>
                <p className="text-gray-600 mb-4">Simple explanations about money, stocks, and trading that are easy to understand.</p>
                <Button onClick={() => navigate("/learn")} variant="outline" size="sm">
                  Start Lessons
                </Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="text-5xl mb-4 animate-float" style={{animationDelay: '0.3s'}}>🎮</div>
                <h3 className="text-xl font-bold mb-2">Stock Simulator</h3>
                <p className="text-gray-600 mb-4">Practice buying and selling stocks with virtual money in our safe, kid-friendly environment.</p>
                <Button onClick={() => navigate("/trade")} variant="outline" size="sm">
                  Try Trading
                </Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="text-5xl mb-4 animate-float" style={{animationDelay: '0.6s'}}>🏆</div>
                <h3 className="text-xl font-bold mb-2">Earn Rewards</h3>
                <p className="text-gray-600 mb-4">Complete lessons and activities to earn virtual coins and track your progress.</p>
                <Button onClick={() => navigate("/portfolio")} variant="outline" size="sm">
                  View Portfolio
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Progress Section */}
        <section>
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Your Progress</h2>
                <div className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                  Level {userProgress.level}
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span>Experience</span>
                  <span>{userProgress.experience}/{userProgress.level * 20} XP</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${Math.min(100, (userProgress.experience / (userProgress.level * 20)) * 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span>Lessons Completed</span>
                  <span>{userProgress.completedLessons.length}/3</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-secondary rounded-full"
                    style={{ width: `${(userProgress.completedLessons.length / 3) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      
      <Footer />
      <Navigation />
    </div>
  );
};

export default Home;
