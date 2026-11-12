import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import PricingPage from './pages/PricingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage'; 
import SettingsPage from './pages/SettingsPage'; 
import NotificationsPage from './pages/NotificationsPage'; 
import MyLearningPage from './pages/MyLearningPage';
import CommunityPage from './pages/CommunityPage';
import ActualCommunityPage from './pages/ActualCommunityPage';
import SupportPage from './pages/SupportPage';
import SupportArticlePage from './pages/SupportArticlePage';
import FlashcardsPage from './pages/FlashcardsPage';
import StudySessionPage from './pages/StudySessionPage';
import SniperArenaPage from './pages/SniperArenaPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import TestimonialsPage from './pages/TestimonialsPage';
import AITutorPage from './pages/AITutorPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminCoursesPage from './pages/AdminCoursesPage'; // New
import AdminDecksPage from './pages/AdminDecksPage';     // New
import AdminStaticPagesPage from './pages/AdminStaticPagesPage'; // New
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FaqPage from './pages/FaqPage';
import InstructorsPage from './pages/InstructorsPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import CertificationsPage from './pages/CertificationsPage';
import LiveSessionsPage from './pages/LiveSessionsPage';
import CompetitionsPage from './pages/CompetitionsPage';
import { APP_NAME_KEY } from './constants';
import { User, SessionLog } from './types';
import usePersistentState from './hooks/usePersistentState';
import { I18nProvider } from './contexts/I18nContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import LoadingSpinner from './components/LoadingSpinner';
import useI18n from './hooks/useI18n';
import { trackPageView, trackLogout } from './src/utils/analytics';

const AppContentWrapper: React.FC = () => {
  const { language } = useI18n();

  useEffect(() => {
    const rootHtmlElement = document.documentElement;
    rootHtmlElement.lang = language;
    rootHtmlElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  return <AppContent />;
}

const AppContent: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [sessionLogs, setSessionLogs] = useState<SessionLog[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useI18n();
  const { resolvedTheme, setTheme } = useTheme();

  // Track SPA route changes as GA4 page views
  useEffect(() => {
    trackPageView(location.pathname + location.search, document.title);
  }, [location.pathname, location.search]);

  const handleLogin = useCallback((user: User) => {
    setCurrentUser(user);
    const newSessionLog: SessionLog = {
      id: `session-${Date.now()}`,
      userId: user.id,
      userEmail: user.email,
      userRole: user.role,
      loginTime: new Date(),
    };
    setSessionLogs(prevLogs => [...prevLogs, newSessionLog]);
    if (user.role === 'System Admin') {
        navigate('/admin');
    } else {
        navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogout = useCallback(() => {
    if (currentUser) {
      setSessionLogs(prevLogs => 
        prevLogs.map(log => 
          log.userId === currentUser.id && !log.logoutTime 
          ? { 
              ...log, 
              logoutTime: new Date(), 
              durationMinutes: Math.round((new Date().getTime() - log.loginTime.getTime()) / 60000) 
            } 
          : log
        )
      );
    }
    setCurrentUser(null);
    trackLogout();
    navigate('/');
  }, [navigate, currentUser]);

  const ProtectedRoute: React.FC<{ children: React.ReactElement, roles?: string[] }> = ({ children, roles }) => {
    if (!currentUser) {
      return <Navigate to="/auth" replace />;
    }
    if (roles && !roles.includes(currentUser.role)) {
      return <Navigate to="/dashboard" replace />;
    }
    return children;
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {isLoading && <LoadingSpinner />}
      <Navbar 
        appName={t(APP_NAME_KEY)} 
        currentUser={currentUser} 
        onLogout={handleLogout} 
      />
      <main className={`flex-grow pt-16 ${isLoading ? 'opacity-60 blur-sm' : 'transition-opacity duration-300'}`}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/instructors" element={<InstructorsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/live-sessions" element={<LiveSessionsPage />} />
          <Route path="/competitions" element={<CompetitionsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/success-stories" element={<TestimonialsPage />} />
          <Route 
            path="/auth" 
            element={currentUser ? <Navigate to="/dashboard" replace /> : <AuthPage onLogin={handleLogin} />} 
          />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage currentUser={currentUser!} sessionLogs={sessionLogs} /></ProtectedRoute>} />
          <Route path="/courses/:id" element={<ProtectedRoute><CourseDetailPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage currentUser={currentUser!} /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage currentUser={currentUser!} currentTheme={resolvedTheme} setTheme={setTheme} /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
          <Route path="/my-learning" element={<ProtectedRoute><MyLearningPage /></ProtectedRoute>} />
          <Route path="/community" element={<ProtectedRoute><CommunityPage /></ProtectedRoute>} />
          <Route path="/community/hub" element={<ProtectedRoute><ActualCommunityPage /></ProtectedRoute>} />
          <Route path="/support" element={<ProtectedRoute><SupportPage /></ProtectedRoute>} />
          <Route path="/support/:slug" element={<ProtectedRoute><SupportArticlePage /></ProtectedRoute>} />
          <Route path="/flashcards" element={<ProtectedRoute><FlashcardsPage /></ProtectedRoute>} />
          <Route path="/flashcards/deck/:deckId" element={<ProtectedRoute><StudySessionPage /></ProtectedRoute>} />
          <Route path="/sniper-arena" element={<ProtectedRoute><SniperArenaPage /></ProtectedRoute>} />
          <Route path="/ai-tutor" element={<ProtectedRoute><AITutorPage /></ProtectedRoute>} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute roles={['System Admin']}><AdminDashboardPage /></ProtectedRoute>} />
          <Route path="/admin/courses" element={<ProtectedRoute roles={['System Admin']}><AdminCoursesPage /></ProtectedRoute>} />
          <Route path="/admin/decks" element={<ProtectedRoute roles={['System Admin']}><AdminDecksPage /></ProtectedRoute>} />
          <Route path="/admin/pages" element={<ProtectedRoute roles={['System Admin']}><AdminStaticPagesPage /></ProtectedRoute>} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer appName={t(APP_NAME_KEY)} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || undefined}>
      <I18nProvider>
        <ThemeProvider>
          <AppContentWrapper />
        </ThemeProvider>
      </I18nProvider>
    </BrowserRouter>
  );
};

export default App;