
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Calculator, Trophy, Clock } from 'lucide-react';

interface Question {
  question: string;
  answer: number;
  options: number[];
}

const MathQuizGame = ({ onComplete }: { onComplete: (coins: number) => void }) => {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    generateQuestions();
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const generateQuestions = () => {
    const newQuestions: Question[] = [];
    
    for (let i = 0; i < 10; i++) {
      const a = Math.floor(Math.random() * 20) + 1;
      const b = Math.floor(Math.random() * 20) + 1;
      const operation = Math.random() > 0.5 ? '+' : '-';
      
      let answer: number;
      let question: string;
      
      if (operation === '+') {
        answer = a + b;
        question = `${a} + ${b} = ?`;
      } else {
        // Ensure positive result for subtraction
        const larger = Math.max(a, b);
        const smaller = Math.min(a, b);
        answer = larger - smaller;
        question = `${larger} - ${smaller} = ?`;
      }

      // Generate wrong options
      const wrongOptions = [
        answer + Math.floor(Math.random() * 5) + 1,
        answer - Math.floor(Math.random() * 5) - 1,
        answer + Math.floor(Math.random() * 10) + 5
      ].filter(opt => opt > 0 && opt !== answer);

      const options = [answer, ...wrongOptions.slice(0, 3)]
        .sort(() => Math.random() - 0.5);

      newQuestions.push({ question, answer, options });
    }
    
    setQuestions(newQuestions);
  };

  const handleAnswer = (selectedOption: number) => {
    setSelectedAnswer(selectedOption);
    setShowResult(true);

    const isCorrect = selectedOption === questions[currentQuestion].answer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      toast({
        title: "Correct! 🎉",
        description: "Great job!",
      });
    } else {
      toast({
        title: "Not quite right 🤔",
        description: `The answer was ${questions[currentQuestion].answer}`,
        variant: "destructive",
      });
    }

    setTimeout(() => {
      if (currentQuestion + 1 >= questions.length) {
        endGame();
      } else {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }, 2000);
  };

  const endGame = () => {
    const percentage = (score / questions.length) * 100;
    const coinsEarned = Math.floor(percentage) + (timeLeft > 30 ? 20 : 10);
    
    setGameCompleted(true);
    onComplete(coinsEarned);
    
    toast({
      title: "Quiz Complete! 🏆",
      description: `You scored ${score}/${questions.length} and earned ${coinsEarned} coins!`,
    });
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(60);
    setGameCompleted(false);
    setSelectedAnswer(null);
    setShowResult(false);
    generateQuestions();
  };

  if (gameCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="text-center space-y-6 p-8">
        <div className="text-6xl animate-bounce">
          {percentage >= 80 ? '🏆' : percentage >= 60 ? '🎉' : '💪'}
        </div>
        <h2 className="text-3xl font-bold gradient-text">
          {percentage >= 80 ? 'Excellent!' : percentage >= 60 ? 'Good Job!' : 'Keep Practicing!'}
        </h2>
        <div className="space-y-2">
          <p className="text-xl">Score: {score}/{questions.length}</p>
          <p className="text-lg">{percentage}% Correct</p>
        </div>
        <Button onClick={resetGame} className="animate-glow-pulse">
          <Calculator className="mr-2 h-4 w-4" />
          Play Again
        </Button>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div className="text-center">Loading questions...</div>;
  }

  const question = questions[currentQuestion];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calculator className="h-6 w-6 text-blue-500" />
          <h2 className="text-2xl font-bold gradient-text">Math Quiz</h2>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span className={timeLeft <= 10 ? 'text-red-500 animate-pulse' : ''}>
              {timeLeft}s
            </span>
          </div>
          <span>Question {currentQuestion + 1}/{questions.length}</span>
          <span>Score: {score}</span>
        </div>
      </div>

      <Card className="glass-effect">
        <CardContent className="p-8 text-center">
          <h3 className="text-3xl font-bold mb-8 gradient-text">
            {question.question}
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant={
                  showResult
                    ? option === question.answer
                      ? "default"
                      : option === selectedAnswer
                      ? "destructive"
                      : "outline"
                    : "outline"
                }
                size="lg"
                onClick={() => !showResult && handleAnswer(option)}
                disabled={showResult}
                className={`text-xl py-6 transition-all duration-300 ${
                  !showResult ? 'hover:scale-105 hover-glow' : ''
                } ${
                  showResult && option === question.answer
                    ? 'animate-bounce-in bg-green-500'
                    : ''
                }`}
              >
                {option}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MathQuizGame;
