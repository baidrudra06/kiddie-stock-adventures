
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { useGameContext } from "@/contexts/GameContext";
import { getLessonById } from "@/data/lessonData";
import { LessonContent } from "@/types";
import Quiz from "@/components/Quiz";

const LessonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { completeLesson, userProgress } = useGameContext();
  const [lesson, setLesson] = useState<LessonContent | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  
  const isCompleted = userProgress.completedLessons.includes(id || "");
  
  useEffect(() => {
    if (id) {
      const fetchedLesson = getLessonById(id);
      if (fetchedLesson) {
        setLesson(fetchedLesson);
      } else {
        navigate("/learn");
      }
    }
  }, [id, navigate]);
  
  const handleStartQuiz = () => {
    setShowQuiz(true);
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };
  
  const handleCompleteQuiz = () => {
    if (id && !isCompleted) {
      completeLesson(id);
    }
  };
  
  if (!lesson) {
    return null; // Loading state
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 pb-20 md:pb-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/learn")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Lessons
        </Button>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="text-5xl animate-float">{lesson.image || "📚"}</div>
          <div>
            <h1 className="text-3xl font-bold">{lesson.title}</h1>
            <p className="text-gray-600">{lesson.description}</p>
          </div>
          {isCompleted && (
            <div className="ml-auto flex items-center text-green-500 gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Completed</span>
            </div>
          )}
        </div>
        
        <Card className="p-6 mb-8">
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: lesson.content }}
          />
        </Card>
        
        {!showQuiz && lesson.quizQuestions && lesson.quizQuestions.length > 0 && (
          <div className="flex justify-center mt-8">
            <Button size="lg" onClick={handleStartQuiz}>
              {isCompleted ? "Take Quiz Again" : "Take Quiz"}
            </Button>
          </div>
        )}
        
        {showQuiz && lesson.quizQuestions && (
          <Quiz 
            questions={lesson.quizQuestions} 
            onComplete={handleCompleteQuiz} 
          />
        )}
      </main>
      
      <Footer />
      <Navigation />
    </div>
  );
};

export default LessonDetail;
