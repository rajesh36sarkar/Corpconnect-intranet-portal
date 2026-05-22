import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

import {
  LayoutDashboard,
  Heart,
  Library,
  Camera,
  MessagesSquare,
  Users,
  Calendar,
  Shield,
  LogOut,
  Menu,
  ChevronRight,
  X
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

    return () =>
      window.removeEventListener('resize', checkScreenSize);
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
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard
    },
    {
      path: '/recognition',
      label: 'Recognition',
      icon: Heart
    },
    {
      path: '/knowledge',
      label: 'Knowledge Hub',
      icon: Library
    },
    {
      path: '/gallery',
      label: 'Gallery',
      icon: Camera
    },
    {
      path: '/forum',
      label: 'Forum',
      icon: MessagesSquare
    },
    {
      path: '/colleagues',
      label: 'Colleagues',
      icon: Users
    },
    {
      path: '/calendar',
      label: 'Calendar',
      icon: Calendar
    }
  ];

  if (user?.role === 'admin') {
    navItems.push({
      path: '/admin',
      label: 'Admin',
      icon: Shield
    });
  }

  if (!user) return null;

  return (
    <div className="flex h-screen bg-brand-bg overflow-hidden">

      {/* MOBILE TOP NAVBAR */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-brand-accent z-50 flex items-center px-4 md:hidden shadow-sm">

        {/* LEFT MENU */}
        <div className="w-10 flex items-center justify-start">

          <button
            onClick={() => setSidebarOpen(true)}
            className="h-10 w-10 rounded-xl bg-brand-secondary border border-brand-accent flex items-center justify-center shrink-0"
          >
            <Menu className="h-5 w-5 text-text-primary" />
          </button>

        </div>

        {/* CENTER BRAND */}
        <div
          className={`
            flex-1 flex items-center justify-center
            transition-all duration-300
            ${sidebarOpen
              ? 'opacity-0 scale-95 pointer-events-none'
              : 'opacity-100 scale-100'
            }
          `}
        >

          <img
            src="/brand-name.png"
            alt="CorpConnect"
            className="h-6 object-contain"
          />

        </div>

        {/* RIGHT PROFILE */}
        <div className="w-10 flex items-center justify-end">

          <button
            onClick={handleViewProfile}
            className="relative"
          >

            <div className="h-10 w-10 rounded-full bg-brand-highlight border border-brand-accent flex items-center justify-center text-base shadow-sm">
              {user?.role === 'admin'
                ? '👩‍💼'
                : '👨‍💻'}
            </div>

          </button>

        </div>

      </header>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>

        {sidebarOpen && isMobile && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          />

        )}

      </AnimatePresence>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white border-r border-brand-accent flex flex-col z-50
          transition-transform duration-300 ease-in-out shadow-xl
          ${sidebarOpen
            ? 'translate-x-0'
            : '-translate-x-full'
          }
          md:translate-x-0 md:relative md:z-40 md:shadow-none
        `}
      >

        {/* SIDEBAR HEADER */}
        <div className="relative h-20 flex items-center justify-center px-5 border-b border-brand-accent shrink-0">

          {/* CENTER LOGO */}
          <div className="flex items-center justify-center w-full">

            <img
              src="/brand-name.png"
              alt="CorpConnect"
              className="h-8 object-contain"
            />

          </div>

          {/* CLOSE BUTTON */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden absolute right-1 top-1/2 -translate-y-1/2"
          >
            <X className="h-5 w-5 text-text-primary" />
          </button>

        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 overflow-y-auto custom-scrollbar p-3">

          <ul className="space-y-1">

            {navItems.map((item) => (

              <li key={item.path}>

                <NavLink
                  to={item.path}
                  onClick={() =>
                    isMobile && setSidebarOpen(false)
                  }
                  className={({ isActive }) =>
                    `
                      flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200
                      ${isActive
                      ? 'bg-brand-highlight text-text-primary'
                      : 'text-text-secondary hover:bg-brand-secondary'
                    }
                    `
                  }
                >

                  {({ isActive }) => (
                    <>
                      <item.icon
                        className={`h-5 w-5 shrink-0 ${isActive
                          ? 'text-text-primary'
                          : 'text-text-muted'
                          }`}
                      />

                      <span>{item.label}</span>
                    </>
                  )}

                </NavLink>

              </li>

            ))}

          </ul>

        </nav>

        {/* USER FOOTER */}
        <div className="p-4 border-t border-brand-accent">

          <button
            onClick={handleViewProfile}
            className="w-full text-left"
          >

            <div className="flex items-center gap-3 p-2 rounded-xl bg-brand-secondary/50 hover:bg-brand-secondary transition-all">

              <div className="h-10 w-10 rounded-xl bg-brand-highlight border border-brand-accent flex items-center justify-center text-lg">
                {user?.role === 'admin'
                  ? '👩‍💼'
                  : '👨‍💻'}
              </div>

              <div className="flex-1 min-w-0">

                <p className="text-sm font-semibold text-text-primary truncate">
                  {user?.name}
                </p>

                <p className="text-xs text-text-muted truncate">
                  {user?.department}
                </p>

              </div>

              <ChevronRight className="h-4 w-4 text-text-muted" />

            </div>

          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 mt-3 px-3 py-3 rounded-xl text-sm font-semibold text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-all"
          >

            <LogOut className="h-4 w-4" />

            <span>Sign Out</span>

          </button>

        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto w-full min-w-0 pt-16 md:pt-0">

        <div className="p-4 md:p-6 max-w-7xl mx-auto pb-24 md:pb-6">

          <Outlet />

        </div>

      </main>

    </div>
  );
};

export default Layout;