
import { useState } from 'react';
import { QuizQuestion } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

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

  const question = questions[currentQuestion];

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) {
      toast({
        title: "Choose an answer",
        description: "Please select an option before continuing.",
        variant: "destructive",
      });
      return;
    }

    // Check if answer is correct
    if (selectedOption === question.correctAnswer) {
      setScore(score + 1);
      toast({
        title: "Correct!",
        description: "Great job! That's the right answer.",
      });
    } else {
      toast({
        title: "Not quite right",
        description: `The correct answer was: ${question.options[question.correctAnswer]}`,
        variant: "destructive",
      });
    }

    // Move to next question or complete quiz
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setIsCompleted(true);
      onComplete();
    }
  };

  if (isCompleted) {
    return (
      <Card className="my-4">
        <CardContent className="py-6">
          <h2 className="text-2xl font-bold text-center mb-4">Quiz Complete!</h2>
          <p className="text-center text-lg">
            You scored {score} out of {questions.length}
          </p>
          <div className="flex justify-center mt-6">
            <div className="text-6xl animate-bounce">
              {score === questions.length ? '🎉' : score >= questions.length / 2 ? '👍' : '🤔'}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="my-4">
      <CardContent className="py-6">
        <h2 className="text-xl font-bold mb-4">
          Question {currentQuestion + 1} of {questions.length}
        </h2>
        <p className="text-lg mb-6">{question.question}</p>

        <RadioGroup
          value={selectedOption?.toString()}
          onValueChange={(value) => handleOptionSelect(parseInt(value))}
        >
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted/50 transition-colors">
                <RadioGroupItem 
                  value={index.toString()} 
                  id={`option-${index}`}
                />
                <Label 
                  htmlFor={`option-${index}`}
                  className="w-full cursor-pointer"
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>

        <Button 
          onClick={handleNextQuestion} 
          className="mt-6 w-full"
        >
          {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default Quiz;
