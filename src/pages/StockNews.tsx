
import { useEffect } from "react";
import StockNewsChannel from "@/components/games/news/StockNewsChannel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LiveStockUpdates from "@/components/LiveStockUpdates";
import { Newspaper, BarChart3 } from "lucide-react";
import { Helmet } from "react-helmet";

const StockNews = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Set document title as a fallback in case Helmet isn't working
    document.title = "Stock News | KiddieTrade";
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Helmet>
        <title>Stock News | KiddieTrade</title>
        <meta name="description" content="Stay updated with the latest stock market news for kids" />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Newspaper className="h-8 w-8" />
          <span>Stock News</span>
        </h1>
        
        <Tabs defaultValue="news" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="news" className="flex items-center gap-2">
              <Newspaper className="h-4 w-4" /> News Channel
            </TabsTrigger>
            <TabsTrigger value="live" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" /> Live Updates
            </TabsTrigger>
          </TabsList>
          <TabsContent value="news">
            <StockNewsChannel />
          </TabsContent>
          <TabsContent value="live">
            <LiveStockUpdates />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
      <Navigation />
    </div>
  );
};

export default StockNews;
