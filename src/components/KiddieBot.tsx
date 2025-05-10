
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Mic, MicOff, Volume, VolumeOff } from "lucide-react";

interface KiddieBotProps {
  onClose?: () => void;
}

const KiddieBot: React.FC<KiddieBotProps> = ({ onClose }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [apiKey, setApiKey] = useState<string>("");
  const { toast } = useToast();

  // Simple responses for demo purposes - would be replaced with actual API calls
  const botResponses = [
    "Hi there! I'm Kiddie, your financial learning buddy! How can I help you learn about money today?",
    "Did you know that saving is like planting seeds? The more you save, the more your money can grow over time!",
    "Stocks are like tiny pieces of a company that you can buy. When the company does well, your stocks might be worth more!",
    "A budget is like a plan for your money. It helps you decide how much to save and how much to spend.",
    "Investing means using your money to buy things that might be worth more in the future. It's like planting a money tree!",
    "I love teaching about money! Try our trading games to practice what you've learned!",
    "Remember, it's important to save some of your money for things you might want in the future."
  ];

  useEffect(() => {
    // Clean up function to cancel any speech when component unmounts
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleListen = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition. Try Chrome or Edge!",
        variant: "destructive"
      });
      return;
    }

    setIsListening(true);
    setMessage("Listening...");
    
    // Simple timeout to simulate listening (would be replaced with actual speech recognition)
    setTimeout(() => {
      setIsListening(false);
      setMessage("What would you like to learn about money?");
      
      // In a real implementation, we would process the speech recognition result here
    }, 3000);
  };

  const handleStopListening = () => {
    setIsListening(false);
    setMessage("What would you like to learn about money?");
  };

  const handleAskQuestion = () => {
    // In a real implementation, this would send the question to an API
    // For now, we'll just randomly select a response
    const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
    setResponse(randomResponse);
    
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(randomResponse);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Temporary function to save API key - in a production app, this would be more securely handled
  const saveApiKey = () => {
    if (apiKey) {
      localStorage.setItem('elevenLabsApiKey', apiKey);
      toast({
        title: "API Key Saved",
        description: "Your ElevenLabs API key has been saved for this session."
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="bg-primary text-white rounded-t-lg">
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👧</span>
            <span>Kiddie - Your Money Buddy</span>
          </div>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white">
              &times;
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4">
          <p className="text-sm mb-2">{message || "Hi! I'm Kiddie, your financial learning buddy!"}</p>
        </div>

        {response && (
          <div className="bg-primary/10 p-3 rounded-lg mb-4">
            <p className="text-sm">{response}</p>
          </div>
        )}

        <div className="space-y-4">
          {/* API Key input for ElevenLabs - would be removed in production with proper backend */}
          <div className="space-y-2">
            <label htmlFor="apiKey" className="text-sm font-medium">
              ElevenLabs API Key (for better voice)
            </label>
            <div className="flex gap-2">
              <input
                type="password"
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
                placeholder="Enter your API key"
              />
              <Button variant="outline" size="sm" onClick={saveApiKey}>
                Save
              </Button>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            {isListening ? (
              <Button 
                variant="destructive" 
                onClick={handleStopListening} 
                className="flex items-center gap-2"
              >
                <MicOff size={16} />
                Stop Listening
              </Button>
            ) : (
              <Button 
                onClick={handleListen} 
                className="flex items-center gap-2"
              >
                <Mic size={16} />
                Start Listening
              </Button>
            )}
            
            {isSpeaking ? (
              <Button 
                variant="destructive" 
                onClick={handleStopSpeaking} 
                className="flex items-center gap-2"
              >
                <VolumeOff size={16} />
                Stop Speaking
              </Button>
            ) : (
              <Button 
                variant="secondary" 
                onClick={handleAskQuestion} 
                className="flex items-center gap-2"
              >
                <Volume size={16} />
                Ask Kiddie
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KiddieBot;
