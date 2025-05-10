
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { FinancialQuizGame, FinancialQuizQuestion } from "@/types";
import { Check, X } from "lucide-react";

// Sample quiz questions
const quizQuestions: FinancialQuizQuestion[] = [
  {
    id: "q1",
    question: "What is a stock?",
    options: [
      "A type of sandwich",
      "A small piece of ownership in a company",
      "Money that a bank holds for you",
      "A type of store where you buy things"
    ],
    correctAnswer: 1,
    explanation: "A stock represents a small piece of ownership in a company. When you buy a stock, you become a partial owner of that company!",
    difficulty: "easy"
  },
  {
    id: "q2",
    question: "What is a dividend?",
    options: [
      "Money a company gives to shareholders",
      "A type of bank account",
      "A bonus you get for opening a savings account",
      "The price of a stock"
    ],
    correctAnswer: 0,
    explanation: "A dividend is money that a company gives to its shareholders (people who own the company's stock) from its profits.",
    difficulty: "medium"
  },
  {
    id: "q3",
    question: "What does 'diversify' mean when talking about investments?",
    options: [
      "Buying only tech stocks",
      "Putting all your money in one company",
      "Spreading your money across different types of investments",
      "Saving all your money in a piggy bank"
    ],
    correctAnswer: 2,
    explanation: "Diversifying means spreading your money across different types of investments to reduce risk. It's like not putting all your eggs in one basket!",
    difficulty: "medium"
  },
  {
    id: "q4",
    question: "What is a savings account?",
    options: [
      "An account that lets you buy things with a card",
      "An account where you keep money that earns interest",
      "An account only adults can have",
      "An account for buying stocks"
    ],
    correctAnswer: 1,
    explanation: "A savings account is a bank account where you can keep your money safe and it earns a small amount of interest over time.",
    difficulty: "easy"
  },
  {
    id: "q5",
    question: "What is compound interest?",
    options: [
      "Interest that only banks earn",
      "Interest you earn on both your original money AND the interest you've already earned",
      "A special type of loan",
      "Interest that compounds your debt"
    ],
    correctAnswer: 1,
    explanation: "Compound interest is when you earn interest not just on your original money, but also on the interest you've already earned. It's like a snowball that gets bigger as it rolls!",
    difficulty: "hard"
  },
  {
    id: "q6",
    question: "What is a budget?",
    options: [
      "A list of things you want to buy",
      "A plan for how to spend and save your money",
      "A type of bank account",
      "A loan from a bank"
    ],
    correctAnswer: 1,
    explanation: "A budget is a plan that helps you keep track of your money. It shows how much money you have coming in, how you're spending it, and helps you save for your goals.",
    difficulty: "easy"
  },
  {
    id: "q7",
    question: "What is inflation?",
    options: [
      "When prices go up over time",
      "When you inflate a balloon",
      "When bank interest rates go up",
      "When the stock market goes up"
    ],
    correctAnswer: 0,
    explanation: "Inflation is when the prices of goods and services increase over time, which means your money can buy less than it could before.",
    difficulty: "medium"
  }
];

const initialGame: FinancialQuizGame = {
  currentQuestion: 0,
  score: 0,
  questions: quizQuestions,
  gameCompleted: false
};

const FinancialQuizGameComponent = ({ onComplete }: { onComplete: (coins: number) => void }) => {
  const { toast } = useToast();
  const [game, setGame] = useState<FinancialQuizGame>({ ...initialGame });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentQuestion = game.questions[game.currentQuestion];
  
  // Calculate progress percentage
  const progress = ((game.currentQuestion + 1) / game.questions.length) * 100;

  // Check answer
  const checkAnswer = () => {
    if (selectedOption === null) {
      toast({
        title: "Select an answer",
        description: "Please select an answer before continuing.",
        variant: "destructive"
      });
      return;
    }

    const correct = selectedOption === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setGame(prev => ({
        ...prev,
        score: prev.score + 1
      }));
    }
    
    setShowExplanation(true);
  };

  // Move to next question
  const nextQuestion = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    setIsCorrect(null);
    
    if (game.currentQuestion < game.questions.length - 1) {
      setGame(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }));
    } else {
      completeGame();
    }
  };

  // Complete the game
  const completeGame = () => {
    const scorePercentage = (game.score / game.questions.length) * 100;
    
    // Calculate coins earned based on performance (between 10 and 50)
    const coinsEarned = Math.max(10, Math.min(50, Math.floor(scorePercentage / 2)));
    
    setGame(prev => ({
      ...prev,
      gameCompleted: true
    }));
    
    // Call the completion handler
    onComplete(coinsEarned);
    
    toast({
      title: "Quiz Completed!",
      description: `You scored ${game.score} out of ${game.questions.length}. You earned ${coinsEarned} coins!`,
    });
  };

  // Reset the game
  const resetGame = () => {
    setGame({ ...initialGame });
    setSelectedOption(null);
    setShowExplanation(false);
    setIsCorrect(null);
  };

  // Shuffle and select questions
  useEffect(() => {
    // Shuffle algorithm (Fisher-Yates)
    const shuffleArray = (array: any[]) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };
    
    // Shuffle questions and take first 5
    const shuffled = shuffleArray(quizQuestions);
    const selected = shuffled.slice(0, 5);
    
    setGame(prev => ({
      ...prev,
      questions: selected
    }));
  }, []);

  return (
    <div className="container mx-auto p-4">
      {!game.gameCompleted ? (
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Financial Quiz</h2>
              <p className="text-gray-600">Test your financial knowledge!</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">{game.score}/{game.currentQuestion}</div>
              <div className="text-sm text-gray-600">Correct Answers</div>
            </div>
          </div>

          <Progress value={progress} className="h-2 mb-6" />

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl">
                Question {game.currentQuestion + 1} of {game.questions.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-medium mb-6">{currentQuestion?.question}</div>
              
              <RadioGroup value={selectedOption?.toString()} onValueChange={(v) => setSelectedOption(parseInt(v))}>
                <div className="space-y-3">
                  {currentQuestion?.options.map((option, index) => (
                    <div 
                      key={index}
                      className={`flex items-center space-x-2 p-3 rounded-lg border ${
                        showExplanation && index === currentQuestion.correctAnswer 
                          ? 'bg-green-50 border-green-200' 
                          : showExplanation && index === selectedOption && index !== currentQuestion.correctAnswer
                          ? 'bg-red-50 border-red-200'
                          : 'hover:bg-muted/50'
                      }`}
                    >
                      <RadioGroupItem 
                        value={index.toString()} 
                        id={`option-${index}`}
                        disabled={showExplanation}
                      />
                      <Label 
                        htmlFor={`option-${index}`}
                        className="flex-grow cursor-pointer flex justify-between"
                      >
                        {option}
                        {showExplanation && index === currentQuestion.correctAnswer && (
                          <Check className="h-5 w-5 text-green-500" />
                        )}
                        {showExplanation && index === selectedOption && index !== currentQuestion.correctAnswer && (
                          <X className="h-5 w-5 text-red-500" />
                        )}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
              
              {showExplanation && (
                <div className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-amber-50'}`}>
                  <h3 className="font-medium mb-1">
                    {isCorrect ? 'Correct! 🎉' : 'Not quite right'}
                  </h3>
                  <p>{currentQuestion.explanation}</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {!showExplanation ? (
                <Button 
                  onClick={checkAnswer} 
                  className="w-full"
                  disabled={selectedOption === null}
                >
                  Check Answer
                </Button>
              ) : (
                <Button 
                  onClick={nextQuestion} 
                  className="w-full"
                >
                  {game.currentQuestion < game.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className="text-center py-12 max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          <div className="text-5xl font-bold mb-4">{Math.round((game.score / game.questions.length) * 100)}%</div>
          <Progress value={(game.score / game.questions.length) * 100} className="h-3 mb-4" />
          <p className="mb-6">You scored {game.score} out of {game.questions.length} questions correctly.</p>
          <Button onClick={resetGame}>Play Again</Button>
        </div>
      )}
    </div>
  );
};

export default FinancialQuizGameComponent;
