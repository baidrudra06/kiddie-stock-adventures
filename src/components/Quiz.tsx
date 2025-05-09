
import { useState } from 'react';
import { QuizQuestion } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';
import { Check, AlertCircle } from 'lucide-react';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: () => void;
}

const Quiz = ({ questions, onComplete }: QuizProps) => {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean | null>(null);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleOptionSelect = (optionIndex: number) => {
    if (showExplanation) return; // Prevent changing answer after showing explanation
    setSelectedOption(optionIndex);
  };

  const handleAnswer = () => {
    if (selectedOption === null) {
      toast({
        title: "Choose an answer",
        description: "Please select an option before continuing.",
        variant: "destructive",
      });
      return;
    }

    const isCorrect = selectedOption === question.correctAnswer;
    setAnsweredCorrectly(isCorrect);
    
    // Check if answer is correct
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    // Move to next question or complete quiz
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowExplanation(false);
      setAnsweredCorrectly(null);
    } else {
      setIsCompleted(true);
      onComplete();
    }
  };

  if (isCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <Card className="my-4">
        <CardContent className="py-6">
          <h2 className="text-2xl font-bold text-center mb-4">Quiz Complete!</h2>
          <div className="mb-6 text-center">
            <div className="text-4xl font-bold mb-2">{percentage}%</div>
            <Progress value={percentage} className="h-2 mb-2" />
            <p className="text-center text-lg">
              You scored {score} out of {questions.length}
            </p>
          </div>
          <div className="flex justify-center mt-6">
            <div className="text-6xl animate-bounce">
              {score === questions.length ? '🎉' : score >= questions.length / 2 ? '👍' : '🤔'}
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="mb-4 text-gray-600">
              {score === questions.length 
                ? "Perfect score! You're a financial genius!" 
                : score >= questions.length / 2 
                ? "Good job! You're on your way to becoming a financial expert." 
                : "Keep learning! Financial knowledge takes time to build."}
            </p>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline"
              className="mr-2"
            >
              Try Again
            </Button>
            <Button 
              onClick={() => onComplete()}
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="my-4">
      <CardContent className="py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            Question {currentQuestion + 1} of {questions.length}
          </h2>
          <div className="text-sm font-medium">
            Score: {score}/{currentQuestion + (answeredCorrectly !== null ? 1 : 0)}
          </div>
        </div>
        
        <Progress 
          value={progress} 
          className="h-2 mb-6" 
        />
        
        <p className="text-lg mb-6 font-medium">{question.question}</p>

        <RadioGroup
          value={selectedOption?.toString()}
          onValueChange={(value) => handleOptionSelect(parseInt(value))}
          className="mb-4"
        >
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <div 
                key={index} 
                className={`flex items-center space-x-2 border p-3 rounded-md transition-colors
                  ${showExplanation && index === question.correctAnswer ? 'bg-green-50 border-green-300' : ''} 
                  ${showExplanation && selectedOption === index && index !== question.correctAnswer ? 'bg-red-50 border-red-300' : ''}
                  ${!showExplanation ? 'hover:bg-muted/50' : ''}
                `}
              >
                <RadioGroupItem 
                  value={index.toString()} 
                  id={`option-${index}`}
                  disabled={showExplanation}
                />
                <Label 
                  htmlFor={`option-${index}`}
                  className="w-full cursor-pointer flex justify-between items-center"
                >
                  <span>{option}</span>
                  {showExplanation && index === question.correctAnswer && (
                    <Check className="h-5 w-5 text-green-500" />
                  )}
                  {showExplanation && selectedOption === index && index !== question.correctAnswer && (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>

        {showExplanation && question.explanation && (
          <div className={`p-4 rounded-md mb-4 ${answeredCorrectly ? 'bg-green-50' : 'bg-amber-50'}`}>
            <h3 className="font-medium mb-1">Explanation:</h3>
            <p>{question.explanation}</p>
          </div>
        )}

        {!showExplanation ? (
          <Button 
            onClick={handleAnswer} 
            className="mt-4 w-full"
          >
            Check Answer
          </Button>
        ) : (
          <Button 
            onClick={handleNextQuestion} 
            className="mt-4 w-full"
          >
            {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default Quiz;
