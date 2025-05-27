
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, GamepadIcon, Trophy, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { useGameContext } from "@/contexts/GameContext";
import HomeBanner3D from "@/components/3d/HomeBanner3D";
import { Suspense, useEffect, useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const { userProgress } = useGameContext();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 pb-20 md:pb-8">
        {/* Enhanced Hero Section with 3D Banner */}
        <section className="mb-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <Suspense fallback={<div className="h-96 bg-muted rounded-lg animate-pulse" />}>
              <HomeBanner3D />
            </Suspense>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center mt-12">
            <div className={`space-y-6 ${isVisible ? 'animate-slide-right stagger-1' : 'opacity-0'}`}>
              <h1 className="text-5xl md:text-6xl font-bold gradient-text leading-tight">
                Master Finance Through
                <span className="block text-secondary animate-glow-pulse">Adventure!</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Embark on an epic journey through the financial world with our AI-powered learning platform. 
                Perfect for young minds ready to conquer the markets!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/learn")}
                  className="text-lg group hover-lift glass-effect border-white/20"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate("/trade")}
                  className="text-lg hover-lift glass-effect"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Try Trading
                </Button>
              </div>
            </div>
            
            <div className={`flex justify-center ${isVisible ? 'animate-slide-left stagger-2' : 'opacity-0'}`}>
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center animate-morph hover-glow">
                  <div className="text-9xl animate-float">🚀</div>
                </div>
                <div className="absolute -top-6 -right-4 text-5xl animate-float-delay-1">💰</div>
                <div className="absolute -bottom-4 -left-6 text-5xl animate-float-delay-2">📈</div>
                <div className="absolute top-1/2 -right-8 text-5xl animate-float-delay-3">💎</div>
                <div className="absolute bottom-1/3 -left-8 text-4xl animate-spin-3d">⭐</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Enhanced Features Section */}
        <section className="mb-16">
          <div className={`text-center mb-12 ${isVisible ? 'animate-slide-down stagger-3' : 'opacity-0'}`}>
            <h2 className="text-4xl font-bold gradient-text mb-4">Unlock Your Financial Superpowers</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform learning into an adventure with our cutting-edge 3D environment and gamified experiences
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "📚",
                title: "Interactive Lessons",
                description: "Immersive 3D lessons that make complex financial concepts simple and fun to understand.",
                action: () => navigate("/learn"),
                buttonText: "Start Learning",
                delay: "stagger-4"
              },
              {
                icon: "🎮",
                title: "3D Stock Simulator",
                description: "Practice trading in our revolutionary 3D environment with real-time market simulations.",
                action: () => navigate("/trade"),
                buttonText: "Try Trading",
                delay: "stagger-5"
              },
              {
                icon: "🏆",
                title: "Achievement System",
                description: "Earn coins, unlock achievements, and track your progress through our comprehensive reward system.",
                action: () => navigate("/portfolio"),
                buttonText: "View Progress",
                delay: "stagger-6"
              }
            ].map((feature, index) => (
              <Card key={index} className={`overflow-hidden hover-lift glass-effect group cursor-pointer ${isVisible ? `animate-bounce-in ${feature.delay}` : 'opacity-0'}`}>
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-6 group-hover:animate-spin-3d transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 gradient-text">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{feature.description}</p>
                  <Button 
                    onClick={feature.action} 
                    variant="outline" 
                    size="lg"
                    className="w-full hover-glow glass-effect group"
                  >
                    {feature.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Enhanced Progress Section */}
        <section className={`${isVisible ? 'animate-slide-up stagger-6' : 'opacity-0'}`}>
          <Card className="glass-effect hover-lift">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-3xl font-bold gradient-text flex items-center gap-3">
                    <Trophy className="h-8 w-8 text-secondary animate-glow-pulse" />
                    Your Journey Progress
                  </h2>
                  <p className="text-muted-foreground mt-2">Track your path to financial mastery</p>
                </div>
                <div className="px-6 py-3 bg-primary/20 text-primary rounded-full border border-primary/30 animate-glow-pulse">
                  <span className="font-bold text-lg">Level {userProgress.level}</span>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-secondary" />
                      Experience Points
                    </span>
                    <span className="text-lg font-bold">{userProgress.experience}/{userProgress.level * 20} XP</span>
                  </div>
                  <div className="h-4 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out animate-glow-pulse"
                      style={{ width: `${Math.min(100, (userProgress.experience / (userProgress.level * 20)) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-secondary" />
                      Lessons Mastered
                    </span>
                    <span className="text-lg font-bold">{userProgress.completedLessons.length}/3</span>
                  </div>
                  <div className="h-4 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-secondary to-primary rounded-full transition-all duration-1000 ease-out animate-glow-pulse"
                      style={{ width: `${(userProgress.completedLessons.length / 3) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-3 gap-4">
                {userProgress.completedLessons.slice(0, 3).map((_, index) => (
                  <div key={index} className="text-center p-4 bg-primary/10 rounded-lg animate-bounce-in hover-glow" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="text-3xl mb-2">🎓</div>
                    <div className="text-sm font-semibold">Lesson {index + 1}</div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Floating Elements */}
        <div className="fixed top-20 left-10 text-4xl animate-float-complex opacity-20 pointer-events-none z-0">💰</div>
        <div className="fixed bottom-20 right-20 text-3xl animate-float-complex opacity-20 pointer-events-none z-0" style={{animationDelay: '1s'}}>📊</div>
        <div className="fixed top-1/2 right-10 text-2xl animate-float-complex opacity-20 pointer-events-none z-0" style={{animationDelay: '2s'}}>⚡</div>
      </main>
      
      <Footer />
      <Navigation />
    </div>
  );
};

export default Home;
