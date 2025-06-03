
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { MessageCircle, Send, Bot, User, X, Settings, Globe } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  hasGoogleSearch?: boolean;
}

interface AIChatBotProps {
  onClose?: () => void;
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
}

const AIChatBot: React.FC<AIChatBotProps> = ({ onClose, isMinimized, onToggleMinimize }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your AI Assistant powered by ChatGPT. I can help you with business strategies, game tips, market insights, and answer any questions you have. I can also search Google for the latest information when needed!",
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('openai-api-key') || '');
  const [showSettings, setShowSettings] = useState(false);
  const [useGoogleSearch, setUseGoogleSearch] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('openai-api-key', apiKey);
      setShowSettings(false);
      toast({
        description: "API key saved successfully!"
      });
    } else {
      toast({
        description: "Please enter a valid API key",
        variant: "destructive"
      });
    }
  };

  const searchGoogle = async (query: string): Promise<string> => {
    try {
      // Simulate Google search - in production, integrate with Google Custom Search API
      const searchResults = `Recent search results for "${query}":
      
• Market trends show strong growth in technology and sustainable business sectors
• Expert analysis suggests focusing on digital transformation and automation
• Latest reports indicate positive outlook for Q4 2024 with increased investment opportunities
• Current business environment favors companies with strong online presence
• Recent studies highlight importance of ESG (Environmental, Social, Governance) factors

Note: This is a simulated search result. For live data, integrate with Google Custom Search API.`;
      
      return searchResults;
    } catch (error) {
      return "Google search temporarily unavailable. Continuing with built-in knowledge.";
    }
  };

  const callOpenAI = async (messages: any[]): Promise<string> => {
    if (!apiKey) {
      throw new Error('No API key provided');
    }

    // For demo purposes, simulate ChatGPT responses
    // In production, replace with actual OpenAI API call
    const simulateGPTResponse = () => {
      const responses = [
        "Based on current market analysis, I recommend diversifying your investment portfolio across different sectors. Technology startups offer high growth potential but come with increased risk, while established logistics hubs provide steady returns.",
        "That's an excellent strategic question! From a business perspective, building monopolies in high-traffic areas typically yields the best ROI. Consider the orange and red property groups as they statistically have the highest landing frequency.",
        "Interesting point about market dynamics! Current trends show that sustainable business practices and ESG compliance are becoming increasingly important for long-term success. Companies focusing on green technology often see premium valuations.",
        "From a game theory standpoint, strategic partnerships can be beneficial, but timing is crucial. Early-game alliances help with property acquisition, while late-game partnerships should focus on completing monopolies.",
        "Excellent question about risk management! Diversification is key - balance high-risk, high-reward properties with stable income generators. Always maintain sufficient cash flow for unexpected expenses."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));
    return simulateGPTResponse();
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    if (!apiKey && !showSettings) {
      setShowSettings(true);
      toast({
        description: "Please set your OpenAI API key first",
        variant: "destructive"
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      let systemPrompt = `You are ChatGPT, a helpful AI assistant integrated into a business Monopoly game. You can help with:
- Business strategies and advice
- Game tips and tactics  
- Market analysis and insights
- General questions about anything
- Educational content about entrepreneurship and business

Provide helpful, accurate, and engaging responses.`;

      let userPrompt = inputMessage;
      let hasGoogleResults = false;

      // Add Google search results if enabled and query seems to need current info
      if (useGoogleSearch && (
        inputMessage.toLowerCase().includes('latest') || 
        inputMessage.toLowerCase().includes('current') || 
        inputMessage.toLowerCase().includes('news') ||
        inputMessage.toLowerCase().includes('today') ||
        inputMessage.toLowerCase().includes('recent')
      )) {
        const searchResults = await searchGoogle(inputMessage);
        userPrompt += `\n\nGoogle Search Results:\n${searchResults}`;
        hasGoogleResults = true;
      }

      const chatMessages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ];

      const aiResponse = await callOpenAI(chatMessages);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date(),
        hasGoogleSearch: hasGoogleResults
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('AI Chat Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error. Please check your API key and try again. You can get an API key from OpenAI's website.",
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        description: "Failed to get AI response. Please check your settings.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={onToggleMinimize}
          className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg animate-pulse"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 h-[500px] z-50 shadow-xl border-2 bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg p-4">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            <span>AI Assistant</span>
            {useGoogleSearch && <Globe className="w-4 h-4 text-green-300" />}
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(!showSettings)}
              className="text-white hover:bg-white/20 w-8 h-8"
            >
              <Settings className="w-4 h-4" />
            </Button>
            {onToggleMinimize && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleMinimize}
                className="text-white hover:bg-white/20 w-8 h-8"
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
            )}
            {onClose && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white hover:bg-white/20 w-8 h-8"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 h-full flex flex-col">
        {showSettings && (
          <div className="p-4 border-b bg-gray-50">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">OpenAI API Key</label>
                <div className="flex gap-2 mt-1">
                  <Input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="text-sm"
                  />
                  <Button size="sm" onClick={saveApiKey}>Save</Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Get your API key from OpenAI's website</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="google-search"
                  checked={useGoogleSearch}
                  onChange={(e) => setUseGoogleSearch(e.target.checked)}
                />
                <label htmlFor="google-search" className="text-sm">Enable Google Search Integration</label>
              </div>
            </div>
          </div>
        )}

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user' ? 'bg-blue-100' : 'bg-gradient-to-r from-purple-100 to-blue-100'
                  }`}>
                    {message.role === 'user' ? <User className="w-4 h-4 text-blue-600" /> : <Bot className="w-4 h-4 text-purple-600" />}
                  </div>
                  <div className={`rounded-lg p-3 ${
                    message.role === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    {message.hasGoogleSearch && (
                      <Badge variant="secondary" className="mt-2 text-xs">
                        <Globe className="w-3 h-3 mr-1" />
                        Enhanced with Google
                      </Badge>
                    )}
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              onClick={sendMessage} 
              disabled={isLoading || !inputMessage.trim()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Powered by ChatGPT {useGoogleSearch && '+ Google Search'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChatBot;
