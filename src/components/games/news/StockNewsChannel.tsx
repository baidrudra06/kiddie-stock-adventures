
import { useState, useEffect } from "react";
import { StockNews } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, ArrowUp, ArrowDown, Minus, AlertCircle, Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { generateDailyNews } from "./StockNewsGenerator";
import { useToast } from "@/components/ui/use-toast";

const StockNewsChannel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [news, setNews] = useState<StockNews[]>([]);
  const [featuredNews, setFeaturedNews] = useState<StockNews | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load or generate news on component mount
  useEffect(() => {
    const loadNews = () => {
      // Try to get news from localStorage
      const savedNewsData = localStorage.getItem('stockNewsData');
      const savedTimestamp = localStorage.getItem('stockNewsTimestamp');
      
      const currentTime = new Date();
      
      // Check if saved news exists and is less than 24 hours old
      if (savedNewsData && savedTimestamp) {
        const lastUpdate = new Date(savedTimestamp);
        const hoursSinceUpdate = (currentTime.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);
        
        if (hoursSinceUpdate < 24) {
          // Use saved news if it's less than 24 hours old
          const parsedNews = JSON.parse(savedNewsData);
          setNews(parsedNews);
          setFeaturedNews(parsedNews[0] || null);
          setLastUpdated(lastUpdate);
          setIsLoading(false);
          return;
        }
      }
      
      // Generate new news if saved news doesn't exist or is too old
      const freshNews = generateDailyNews();
      
      // Save to localStorage
      localStorage.setItem('stockNewsData', JSON.stringify(freshNews));
      localStorage.setItem('stockNewsTimestamp', currentTime.toISOString());
      
      setNews(freshNews);
      setFeaturedNews(freshNews[0] || null);
      setLastUpdated(currentTime);
      setIsLoading(false);
      
      toast({
        title: "News Updated!",
        description: "The latest financial news has been generated."
      });
    };
    
    loadNews();
  }, [toast]);

  // Format the date for display
  const formatNewsDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  // Format the time for display
  const formatNewsTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Format the last updated time
  const formatLastUpdated = () => {
    return lastUpdated.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get next update time
  const getNextUpdateTime = () => {
    const nextUpdate = new Date(lastUpdated);
    nextUpdate.setHours(nextUpdate.getHours() + 24);
    
    return nextUpdate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Handle clicking on a news item
  const handleNewsClick = (newsItem: StockNews) => {
    if (newsItem.stockId) {
      navigate(`/trade/${newsItem.stockId}`);
    }
  };

  // Set the featured news
  const setFeatured = (newsItem: StockNews) => {
    setFeaturedNews(newsItem);
  };

  // Get appropriate icon based on impact
  const getImpactIcon = (impact: 'positive' | 'negative' | 'neutral') => {
    switch (impact) {
      case 'positive':
        return <ArrowUp className="h-5 w-5 text-green-500" />;
      case 'negative':
        return <ArrowDown className="h-5 w-5 text-red-500" />;
      default:
        return <Minus className="h-5 w-5 text-blue-500" />;
    }
  };

  // Get appropriate color based on impact
  const getImpactColor = (impact: 'positive' | 'negative' | 'neutral') => {
    switch (impact) {
      case 'positive':
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case 'negative':
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <Card className="w-full shadow-lg">
          <CardHeader className="bg-primary/10">
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <TrendingUp className="h-6 w-6" /> 
              <span>KiddieTrade News Network</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="flex items-center justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-6 w-64 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full shadow-lg">
        <CardHeader className="bg-primary/10">
          <CardTitle className="text-center flex items-center justify-center gap-2">
            <TrendingUp className="h-6 w-6" /> 
            <span>KiddieTrade News Network</span>
          </CardTitle>
        </CardHeader>
        
        <div className="p-4 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>Last Updated: {formatLastUpdated()}</span>
          <span className="mx-2">•</span>
          <Clock className="h-4 w-4" />
          <span>Next Update: {getNextUpdateTime()}</span>
        </div>
        
        <CardContent>
          {featuredNews && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Featured Story</h2>
              <Card className="border-2 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={getImpactColor(featuredNews.impact)}>
                      {featuredNews.impact.charAt(0).toUpperCase() + featuredNews.impact.slice(1)}
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      {formatNewsDate(featuredNews.date)} at {formatNewsTime(featuredNews.date)}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    {getImpactIcon(featuredNews.impact)} {featuredNews.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4">{featuredNews.content}</p>
                  
                  {featuredNews.stockId && (
                    <button 
                      onClick={() => handleNewsClick(featuredNews)}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                    >
                      View Stock
                    </button>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
          
          <h2 className="text-2xl font-bold mb-4">Latest News</h2>
          
          <div className="grid gap-4">
            {news.map(newsItem => (
              <div 
                key={newsItem.id} 
                className={`p-4 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors ${
                  featuredNews?.id === newsItem.id ? 'border-primary' : ''
                }`}
                onClick={() => setFeatured(newsItem)}
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getImpactColor(newsItem.impact)}>
                    {getImpactIcon(newsItem.impact)} 
                    <span className="ml-1">{newsItem.impact.charAt(0).toUpperCase() + newsItem.impact.slice(1)}</span>
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {formatNewsTime(newsItem.date)}
                  </span>
                </div>
                <h3 className="font-bold">{newsItem.title}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{formatNewsDate(newsItem.date)}</span>
                  {newsItem.stockId && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNewsClick(newsItem);
                      }}
                      className="text-xs text-primary hover:underline"
                    >
                      View Stock
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-muted rounded-lg text-center">
            <AlertCircle className="h-5 w-5 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              This is an educational stock news simulator. News is generated every 24 hours for learning purposes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockNewsChannel;
