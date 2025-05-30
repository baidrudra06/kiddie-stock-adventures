
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import TradingGames from "@/components/TradingGames";

const TradingGamesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 pb-20 md:pb-8">
        <TradingGames />
      </main>
      
      <Footer />
      <Navigation />
    </div>
  );
};

export default TradingGamesPage;
