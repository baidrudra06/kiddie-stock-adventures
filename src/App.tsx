
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import LessonDetail from "./pages/LessonDetail";
import Trade from "./pages/Trade";
import StockDetail from "./pages/StockDetail";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound";
import Parents from "./pages/Parents";
import LoginPage from "./components/LoginPage";
import { AuthProvider } from "./components/AuthProvider";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:id" element={<LessonDetail />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/trade/:id" element={<StockDetail />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/parents" element={<Parents />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
