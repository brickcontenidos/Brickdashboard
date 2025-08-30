import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import CalendarPage from './pages/CalendarPage.jsx';
import PackagesPage from './pages/PackagesPage.jsx';
import BrandsPage from './pages/BrandsPage.jsx';
import LeadsPage from './pages/LeadsPage.jsx';
import QuizPage from './pages/QuizPage.jsx';
import PlaceholderPage from './pages/PlaceholderPage.jsx';
import AuthPage from './pages/AuthPage.jsx'; // ⬅️ NUEVO

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#0a0a0a] to-gray-800 text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="/auth" element={<AuthPage />} /> {/* ⬅️ NUEVO */}
        <Route path="*" element={<PlaceholderPage title="404" />} />
      </Routes>
    </div>
  );
}
