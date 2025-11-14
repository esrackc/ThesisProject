import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { DarkModeProvider } from './context/DarkModeContext';
import { LanguageProvider } from './context/LanguageContext';
import Navigation from './components/Navigation';
import QuickActions from './components/QuickActions';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import Candidates from './pages/Candidates';
import AITools from './pages/AITools';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

function App() {
  return (
    <LanguageProvider>
      <DarkModeProvider>
        <BrowserRouter>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/ai-tools" element={<AITools />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
          <QuickActions />
          <Toaster position="top-right" />
        </div>
        </BrowserRouter>
      </DarkModeProvider>
    </LanguageProvider>
  );
}

export default App;
