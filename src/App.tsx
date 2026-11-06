/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CMSProvider, useCMS } from './context/CMSContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { ToastContainer } from './components/common/ToastContainer';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { InnovationPage } from './pages/public/InnovationPage';
import { ProjectsPage } from './pages/public/ProjectsPage';
import { CommunityPage } from './pages/public/CommunityPage';
import { AchievementsPage } from './pages/public/AchievementsPage';
import { PartnershipsPage } from './pages/public/PartnershipsPage';
import { JoinPage } from './pages/public/JoinPage';
import { ContactPage } from './pages/public/ContactPage';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';

function AppContent() {
  const { isAuthenticated } = useAuth();

  // Normalize initial path
  const getInitialPath = () => {
    const path = window.location.pathname;
    if (path.startsWith('/admin')) {
      return path;
    }
    return path === '' ? '/' : path;
  };

  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admin route handling
  if (currentPath === '/admin/login') {
    return (
      <>
        <AdminLogin
          onSuccess={() => navigate('/admin')}
          onBackToSite={() => navigate('/')}
        />
        <ToastContainer />
      </>
    );
  }

  if (currentPath.startsWith('/admin')) {
    if (!isAuthenticated) {
      return (
        <>
          <AdminLogin
            onSuccess={() => navigate('/admin')}
            onBackToSite={() => navigate('/')}
          />
          <ToastContainer />
        </>
      );
    }
    return (
      <>
        <AdminLayout onViewLiveSite={() => navigate('/')} />
        <ToastContainer />
      </>
    );
  }

  // Public website route rendering
  const renderPublicPage = () => {
    switch (currentPath) {
      case '/about':
        return <AboutPage onNavigate={navigate} />;
      case '/innovation':
        return <InnovationPage onNavigate={navigate} />;
      case '/projects':
        return <ProjectsPage />;
      case '/community':
        return <CommunityPage onNavigate={navigate} />;
      case '/achievements':
        return <AchievementsPage onNavigate={navigate} />;
      case '/partnerships':
        return <PartnershipsPage />;
      case '/join':
        return <JoinPage onNavigate={navigate} />;
      case '/contact':
        return <ContactPage />;
      case '/':
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <>
      <PublicLayout currentPath={currentPath} onNavigate={navigate}>
        {renderPublicPage()}
      </PublicLayout>
      <ToastContainer />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CMSProvider>
          <AppContent />
        </CMSProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
