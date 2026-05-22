import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './layouts/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Recognition from './pages/Recognition';
import KnowledgeHub from './pages/KnowledgeHub';
import Gallery from './pages/Gallery';
import Forum from './pages/Forum';
import Colleagues from './pages/Colleagues';
import EngagementCalendar from './pages/EngagementCalendar';
import AdminConsole from './pages/AdminConsole';
import Moderation from './pages/Moderation';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import { Building2, Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-secondary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-highlight/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
          {/* Animated Logo */}
          <div className="relative">
            <div className="absolute inset-0 bg-brand-highlight rounded-full blur-xl opacity-50 animate-ping" />
            <div className="relative h-16 w-16 rounded-xl bg-gradient-to-br from-brand-highlight to-brand-accent flex items-center justify-center shadow-lg">
              <Building2 className="h-8 w-8 text-text-primary" />
            </div>
          </div>
          
          {/* Loading Spinner */}
          <div className="relative">
            <Loader2 className="h-8 w-8 text-brand-highlight animate-spin" />
          </div>
          
          {/* Loading Text */}
          <div className="space-y-1">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-text-primary">Loading Workspace</p>
            <p className="text-[10px] text-text-muted">Synchronizing your dashboard...</p>
          </div>
          
          {/* Decorative Dots */}
          <div className="flex gap-1.5 mt-2">
            <div className="h-1.5 w-1.5 rounded-full bg-brand-highlight animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="h-1.5 w-1.5 rounded-full bg-brand-accent animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="h-1.5 w-1.5 rounded-full bg-brand-secondary animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      
      {/* Protected Routes with Layout */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Redirect root to dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />
        
        {/* Main User Pages */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="recognition" element={<Recognition />} />
        <Route path="knowledge" element={<KnowledgeHub />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="forum" element={<Forum />} />
        <Route path="colleagues" element={<Colleagues />} />
        <Route path="calendar" element={<EngagementCalendar />} />
        <Route path="profile" element={<Profile />} />
        
        {/* Admin Routes - Nested to enforce protection */}
        <Route path="admin">
          <Route index element={
            <ProtectedRoute adminOnly>
              <AdminConsole />
            </ProtectedRoute>
          } />
          <Route path="moderation" element={
            <ProtectedRoute adminOnly>
              <Moderation />
            </ProtectedRoute>
          } />
          <Route path="analytics" element={
            <ProtectedRoute adminOnly>
              <Analytics />
            </ProtectedRoute>
          } />
        </Route>
        
        {/* 404 - Catch all unknown routes */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;