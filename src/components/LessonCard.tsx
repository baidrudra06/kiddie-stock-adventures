
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LessonContent } from "@/types";
import { CheckCircle, ChevronRight, Book, Video, PlayCircle } from "lucide-react";

interface LessonCardProps {
  lesson: LessonContent;
  isCompleted: boolean;
}

const LessonCard = ({ lesson, isCompleted }: LessonCardProps) => {
  const navigate = useNavigate();
  
  const getLessonIcon = () => {
    switch (lesson.lessonType) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'tutorial':
        return <PlayCircle className="h-4 w-4" />;
      default:
        return <Book className="h-4 w-4" />;
    }
  };
  
  const getLessonBadgeColor = () => {
    switch (lesson.lessonType) {
      case 'video':
        return "bg-blue-100 text-blue-800";
      case 'tutorial':
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <div 
          className="h-40 flex items-center justify-center bg-slate-100"
          style={{ 
            backgroundColor: isCompleted ? "#dcfce7" : "#f1f5f9"
          }}
        >
          <span className="text-6xl">{lesson.image || "📚"}</span>
          {lesson.lessonType !== 'text' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
              <div className="bg-white p-3 rounded-full">
                {lesson.lessonType === 'video' ? 
                  <Video className="h-8 w-8 text-blue-500" /> : 
                  <PlayCircle className="h-8 w-8 text-purple-500" />
                }
              </div>
            </div>
          )}
        </div>
        
        {isCompleted && (
          <div className="absolute top-2 right-2 bg-white p-1 rounded-full">
            <CheckCircle className="h-6 w-6 text-green-500" />
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg mb-1">{lesson.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{lesson.description}</p>
          </div>
        </div>
        <div className="flex items-center">
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center ${getLessonBadgeColor()}`}>
            {getLessonIcon()}
            <span className="ml-1">
              {lesson.lessonType === 'text' ? 'Reading' : 
               lesson.lessonType === 'video' ? 'Video' : 'Tutorial'}
            </span>
          </span>
          {isCompleted && (
            <span className="ml-auto text-xs text-green-600 font-medium flex items-center">
              <CheckCircle className="h-3 w-3 mr-1" />
              Completed
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="px-4 pt-0 pb-4">
        <Button 
          onClick={() => navigate(`/learn/${lesson.id}`)}
          variant="outline" 
          className="w-full"
        >
          {isCompleted ? "Review Lesson" : "Start Learning"}
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LessonCard;
