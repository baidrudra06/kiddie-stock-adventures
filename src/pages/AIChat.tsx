
import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import AIChatBot from "@/components/games/business/AIChatBot";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, MessageCircle, Globe, Zap, Shield } from 'lucide-react';

const AIChat = () => {
  const [showChat, setShowChat] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 pb-20 md:pb-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
              <Bot className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-4">
            AI Assistant
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Chat with our advanced AI assistant powered by ChatGPT. Get answers to any question, 
            business advice, and enhanced responses with Google search integration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="glass-effect border-white/10 hover-lift">
            <CardHeader className="text-center">
              <MessageCircle className="h-8 w-8 mx-auto text-blue-500 mb-2" />
              <CardTitle className="text-lg">Smart Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Engage in natural conversations with ChatGPT. Ask questions about business, 
                get game strategies, or discuss any topic you're curious about.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/10 hover-lift">
            <CardHeader className="text-center">
              <Globe className="h-8 w-8 mx-auto text-green-500 mb-2" />
              <CardTitle className="text-lg">Google Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Get enhanced responses with real-time Google search results. 
                Perfect for current events, latest trends, and up-to-date information.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/10 hover-lift">
            <CardHeader className="text-center">
              <Zap className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
              <CardTitle className="text-lg">Instant Responses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Get quick, intelligent responses to help you make better decisions 
                in your business game and real-life scenarios.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-8">
          <Card className="glass-effect border-white/10 max-w-2xl mx-auto">
            <CardContent className="p-6">
              <Shield className="h-8 w-8 mx-auto text-purple-500 mb-4" />
              <h3 className="text-lg font-bold mb-2">Privacy & Security</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your conversations are private and secure. API keys are stored locally in your browser 
                and never sent to our servers. You have full control over your data.
              </p>
              <div className="space-y-2 text-xs text-muted-foreground">
                <p>• API keys stored locally in browser storage</p>
                <p>• No conversation data saved on our servers</p>
                <p>• Direct communication with OpenAI</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          {!showChat ? (
            <Button 
              onClick={() => setShowChat(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 h-auto animate-glow-pulse"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Start Chatting with AI
            </Button>
          ) : (
            <div className="space-y-4">
              <p className="text-lg font-medium text-muted-foreground">
                AI Assistant is now active! Look for the chat window in the bottom-right corner.
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  variant="outline"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  {isMinimized ? 'Show Chat' : 'Minimize Chat'}
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => setShowChat(false)}
                >
                  Close Chat
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <Card className="glass-effect border-white/10 max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="gradient-text">Example Questions You Can Ask</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <p className="font-medium text-blue-600">Business & Strategy:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• "What's the best business strategy for startups?"</li>
                    <li>• "How do I build a monopoly in the game?"</li>
                    <li>• "Explain different investment strategies"</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-purple-600">Current Affairs:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• "What are the latest market trends?"</li>
                    <li>• "Current news about technology stocks"</li>
                    <li>• "Recent developments in AI industry"</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-green-600">Learning:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• "Explain compound interest simply"</li>
                    <li>• "How does the stock market work?"</li>
                    <li>• "What is risk management?"</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-orange-600">General Questions:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• "Help me with homework"</li>
                    <li>• "Explain quantum computing"</li>
                    <li>• "What's the weather like today?"</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {showChat && (
        <AIChatBot 
          onClose={() => setShowChat(false)}
          isMinimized={isMinimized}
          onToggleMinimize={() => setIsMinimized(!isMinimized)}
        />
      )}
      
      <Footer />
      <Navigation />
    </div>
  );
};

export default AIChat;
