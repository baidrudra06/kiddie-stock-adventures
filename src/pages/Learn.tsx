
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { lessonData } from "@/data/lessonData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import LessonCard from "@/components/LessonCard";
import { useGameContext } from "@/contexts/GameContext";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Learn = () => {
  const navigate = useNavigate();
  const { userProgress } = useGameContext();
  const [searchTerm, setSearchTerm] = useState("");
  
  const isLessonCompleted = (lessonId: string): boolean => {
    return userProgress.completedLessons.includes(lessonId);
  };
  
  const filteredLessons = lessonData.filter(
    lesson => 
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
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
      </main>
      
      <Footer />
      <Navigation />
    </div>
  );
};

export default Learn;
