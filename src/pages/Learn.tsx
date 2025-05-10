import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { lessonData } from "@/data/lessonData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import LessonCard from "@/components/LessonCard";
import KiddieBot from "@/components/KiddieBot";
import { useGameContext } from "@/contexts/GameContext";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, Book, Video, Gamepad, ChevronRight } from "lucide-react";

const Learn = () => {
  const navigate = useNavigate();
  const { userProgress } = useGameContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showKiddieBot, setShowKiddieBot] = useState(false);
  
  const isLessonCompleted = (lessonId: string): boolean => {
    return userProgress.completedLessons.includes(lessonId);
  };
  
  const filteredLessons = lessonData.filter(
    lesson => 
      (lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (activeTab === "all" || 
       (activeTab === "text" && lesson.lessonType === "text") ||
       (activeTab === "video" && lesson.lessonType === "video") ||
       (activeTab === "tutorial" && lesson.lessonType === "tutorial"))
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 pb-20 md:pb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Learn About Money & Stocks</h1>
            <p className="text-gray-600">
              Complete fun lessons to earn coins and build your knowledge
            </p>
          </div>
          
          <div className="relative w-full md:w-auto md:min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search lessons..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={() => navigate('/trading-games')} 
            variant="outline"
            className="flex items-center gap-2 border-primary text-primary hover:bg-primary/5"
          >
            <Gamepad className="h-5 w-5" />
            Go to Trading Games
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={() => setShowKiddieBot(!showKiddieBot)}
            variant={showKiddieBot ? "secondary" : "default"}
            className="flex items-center gap-2"
          >
            {showKiddieBot ? "Hide Kiddie Bot" : "Talk to Kiddie Bot"}
          </Button>
        </div>
        
        {showKiddieBot && (
          <div className="mb-8">
            <KiddieBot onClose={() => setShowKiddieBot(false)} />
          </div>
        )}
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All Lessons</TabsTrigger>
            <TabsTrigger value="text" className="flex items-center gap-1">
              <Book className="w-4 h-4" /> Text
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-1">
              <Video className="w-4 h-4" /> Videos
            </TabsTrigger>
            <TabsTrigger value="tutorial" className="flex items-center gap-1">
              <Gamepad className="w-4 h-4" /> Tutorials
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLessons.map(lesson => (
                <LessonCard 
                  key={lesson.id} 
                  lesson={lesson} 
                  isCompleted={isLessonCompleted(lesson.id)} 
                />
              ))}
              
              {filteredLessons.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-xl text-gray-500">No lessons found matching "{searchTerm}"</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="text" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLessons.map(lesson => (
                <LessonCard 
                  key={lesson.id} 
                  lesson={lesson} 
                  isCompleted={isLessonCompleted(lesson.id)} 
                />
              ))}
              
              {filteredLessons.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-xl text-gray-500">No text lessons found matching "{searchTerm}"</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="video" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLessons.map(lesson => (
                <LessonCard 
                  key={lesson.id} 
                  lesson={lesson} 
                  isCompleted={isLessonCompleted(lesson.id)} 
                />
              ))}
              
              {filteredLessons.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-xl text-gray-500">No video lessons found matching "{searchTerm}"</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="tutorial" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLessons.map(lesson => (
                <LessonCard 
                  key={lesson.id} 
                  lesson={lesson} 
                  isCompleted={isLessonCompleted(lesson.id)} 
                />
              ))}
              
              {filteredLessons.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-xl text-gray-500">No tutorial lessons found matching "{searchTerm}"</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
      <Navigation />
    </div>
  );
};

export default Learn;
