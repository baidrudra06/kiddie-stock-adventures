
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
import { AuthProvider, useAuth } from "./components/AuthProvider";
import { GameProvider } from "./contexts/GameContext";
import { Suspense } from "react";
import { Toaster } from "sonner";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="h-screen w-screen flex items-center justify-center">Loading KiddieTrade...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/learn" element={
        <ProtectedRoute>
          <Learn />
        </ProtectedRoute>
      } />
      <Route path="/learn/:id" element={
        <ProtectedRoute>
          <LessonDetail />
        </ProtectedRoute>
      } />
      <Route path="/trade" element={
        <ProtectedRoute>
          <Trade />
        </ProtectedRoute>
      } />
      <Route path="/trade/:id" element={
        <ProtectedRoute>
          <StockDetail />
        </ProtectedRoute>
      } />
      <Route path="/portfolio" element={
        <ProtectedRoute>
          <Portfolio />
        </ProtectedRoute>
      } />
      <Route path="/games" element={
        <ProtectedRoute>
          <Games />
        </ProtectedRoute>
      } />
      <Route path="/trading-games" element={
        <ProtectedRoute>
          <TradingGames />
        </ProtectedRoute>
      } />
      <Route path="/parents" element={
        <ProtectedRoute>
          <Parents />
        </ProtectedRoute>
      } />
      <Route path="/news" element={
        <ProtectedRoute>
          <StockNews />
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <GameProvider>
          <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center bg-background">Loading KiddieTrade...</div>}>
            <AppRoutes />
            <Toaster />
          </Suspense>
        </GameProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
