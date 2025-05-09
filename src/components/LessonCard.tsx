
import { LessonContent } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LessonCardProps {
  lesson: LessonContent;
  isCompleted: boolean;
}

const LessonCard = ({ lesson, isCompleted }: LessonCardProps) => {
  const navigate = useNavigate();
  
  const handleStartLesson = () => {
    navigate(`/learn/${lesson.id}`);
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all h-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="text-3xl animate-float">{lesson.image || '📚'}</div>
          {isCompleted && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              <span>Completed</span>
            </Badge>
          )}
        </div>
        
        <h3 className="text-xl font-bold mb-2">{lesson.title}</h3>
        <p className="text-gray-600">{lesson.description}</p>
      </CardContent>
      
      <CardFooter className="px-6 pb-6 pt-0">
        <Button 
          onClick={handleStartLesson} 
          className={isCompleted ? "bg-secondary hover:bg-secondary/90" : "bg-primary"}
          size="sm"
        >
          {isCompleted ? "Review Lesson" : "Start Lesson"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LessonCard;
