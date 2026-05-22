import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Heart, Library, Camera, MessagesSquare,
  Users, Calendar, Shield, LogOut, Menu, Sparkles, User,
  ChevronRight, X
} from 'lucide-react';

const Layout = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (sidebarOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen, isMobile]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleViewProfile = () => {
    setSidebarOpen(false);
    navigate('/profile');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/recognition', label: 'Recognition', icon: Heart },
    { path: '/knowledge', label: 'Knowledge Hub', icon: Library },
    { path: '/gallery', label: 'Gallery', icon: Camera },
    { path: '/forum', label: 'Forum', icon: MessagesSquare },
    { path: '/colleagues', label: 'Colleagues', icon: Users },
    { path: '/calendar', label: 'Calendar', icon: Calendar },
  ];

  if (user?.role === 'admin') {
    navItems.push({ path: '/admin', label: 'Admin', icon: Shield });
  }

  if (!user) return null;

  return (
    <div className="flex h-screen bg-brand-bg overflow-hidden w-full">

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 flex items-center justify-between px-3 py-2 bg-white/95 backdrop-blur-md border-b border-brand-accent z-50">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={sidebarOpen}
            className="p-1.5 rounded-lg bg-brand-bg border border-brand-accent text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-highlight"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div className="h-7 w-7 rounded-lg bg-brand-highlight flex items-center justify-center">
            <Sparkles className="h-3.5 w-3.5 text-text-primary" />
          </div>
          <span className="font-black text-text-primary tracking-tight text-sm">CorpConnect</span>
        </div>
        <button
          onClick={handleViewProfile}
          aria-label="View user profile"
          className="p-1.5 rounded-lg bg-brand-highlight border border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-highlight focus:ring-offset-1"
        >
          <User className="h-4 w-4 text-text-primary" />
        </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white border-r border-brand-accent p-3 flex flex-col justify-between z-50
        transition-transform duration-300 ease-in-out shadow-xl
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:z-40 md:shadow-none
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-brand-accent md:hidden">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-brand-highlight border border-brand-accent flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-text-primary" />
            </div>
            <div>
              <span className="font-black text-text-primary tracking-tight block text-sm">CorpConnect</span>
              <span className="text-[9px] text-text-muted">Portal</span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation menu"
            className="p-1.5 rounded-lg bg-brand-secondary border border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-highlight"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Desktop Logo */}
        <div className="hidden md:flex items-center gap-2 pb-4 border-b border-brand-accent mb-4">
          <div className="h-8 w-8 rounded-lg bg-brand-highlight border border-brand-accent flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-text-primary" />
          </div>
          <div>
            <span className="font-black text-text-primary tracking-tight block text-base">CorpConnect</span>
            <span className="text-[9px] text-text-muted">Enterprise Portal</span>
          </div>
        </div>

        {/* Navigation - Structured as a Semantic List */}
        <nav aria-label="Main Navigation" className="flex-1 overflow-y-auto custom-scrollbar">
          <ul className="space-y-0.5">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => isMobile && setSidebarOpen(false)}
                  // Added 'relative' class here so the absolute active indicator positions correctly
                  className={({ isActive }) => `
                    relative flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group w-full
                    ${isActive
                      ? 'bg-brand-highlight text-text-primary'
                      : 'text-text-secondary hover:text-text-primary hover:bg-brand-secondary/50'}
                  `}
                >
                  {({ isActive }) => (
                    <div className="flex items-center gap-2.5 w-full">
                      <item.icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-text-primary' : 'text-text-muted'}`} />
                      <span className="text-sm">{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute left-0 -ml-3 w-0.5 h-5 bg-brand-highlight rounded-r-full"
                        />
                      )}
                    </div>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile Section */}
        <div className="pt-3 border-t border-brand-accent space-y-2">
          <button
            onClick={handleViewProfile}
            aria-label="View profile details"
            className="w-full text-left focus:outline-none focus:ring-2 focus:ring-brand-highlight rounded-lg"
          >
            <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg bg-brand-secondary/50 hover:bg-brand-secondary transition-all group">
              <div className="h-8 w-8 rounded-lg bg-brand-highlight border border-brand-accent flex items-center justify-center text-base">
                {user?.role === 'admin' ? '👩‍💼' : '👨‍💻'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-text-primary truncate">{user?.name}</p>
                <p className="text-xs text-text-muted truncate">{user?.department}</p>
              </div>
              <ChevronRight className="h-3 w-3 text-text-muted group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-all focus:outline-none focus:ring-2 focus:ring-rose-400"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full min-w-0 pt-14 md:pt-0 pb-safe">
        <div className="p-3 md:p-4 lg:p-6 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;