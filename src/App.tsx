
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import LessonDetail from "./pages/LessonDetail";
import Trade from "./pages/Trade";
import StockDetail from "./pages/StockDetail";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound";
import Parents from "./pages/Parents";
import Games from "./pages/Games";
import TradingGames from "./pages/TradingGames";
import StockNews from "./pages/StockNews";
import LoginPage from "./components/LoginPage";
import { AuthProvider } from "./components/AuthProvider";
import { GameProvider } from "./contexts/GameContext";
import { Suspense } from "react";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <GameProvider>
          <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center">Loading KiddieTrade...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/learn/:id" element={<LessonDetail />} />
              <Route path="/trade" element={<Trade />} />
              <Route path="/trade/:id" element={<StockDetail />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/games" element={<Games />} />
              <Route path="/trading-games" element={<TradingGames />} />
              <Route path="/parents" element={<Parents />} />
              <Route path="/news" element={<StockNews />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </GameProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
