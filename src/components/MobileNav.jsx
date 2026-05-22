import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { useAuth } from '../context/AuthContext';

import {
  LayoutDashboard,
  Heart,
  Users,
  Shield,
  BookOpen,
  User,
  LogOut,
  X
} from 'lucide-react';

const MobileNav = () => {
  const { user, logout } = useAuth();

  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () =>
      window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMobile || !user) return null;

  const navItems = [
    {
      to: '/dashboard',
      icon: LayoutDashboard,
      label: 'Home'
    },
    {
      to: '/recognition',
      icon: Heart,
      label: 'Kudos'
    },
    {
      to: '/colleagues',
      icon: Users,
      label: 'Team'
    },
    {
      to: '/knowledge',
      icon: BookOpen,
      label: 'Hub'
    }
  ];

  if (user?.role === 'admin') {
    navItems.push({
      to: '/admin',
      icon: Shield,
      label: 'Admin'
    });
  }

  const handleLogout = () => {
    logout();
    setShowProfilePopup(false);
    navigate('/login');
  };

  return (
    <>
      {/* TOP MOBILE NAVBAR */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-xl border-b border-brand-accent px-4 py-3 shadow-sm">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <img
              src="/brand-logo.svg"
              alt="CorpConnect"
              className="h-10 w-10 object-contain"
            />

            <img
              src="/brand-name.png"
              alt="CorpConnect"
              className="h-5 object-contain"
            />

          </div>

          <button
            onClick={() => setShowProfilePopup(true)}
            className="h-10 w-10 rounded-xl bg-gradient-to-r from-brand-highlight to-brand-accent flex items-center justify-center shadow-sm"
          >
            <User className="h-5 w-5 text-text-primary" />
          </button>

        </div>

      </div>

      {/* BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/98 backdrop-blur-xl border-t border-brand-accent z-50 block md:hidden pb-safe shadow-lg">

        <div className="flex justify-around items-center h-16 px-2 relative">

          {navItems.map((item) => (

            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center gap-0.5 py-1 px-3 rounded-xl ${
                  isActive
                    ? 'text-text-primary'
                    : 'text-text-muted'
                }`
              }
            >

              {({ isActive }) => (
                <>
                  <item.icon
                    className={`h-5 w-5 ${
                      isActive ? 'text-brand-highlight' : ''
                    }`}
                  />

                  <span className="text-[10px] font-medium">
                    {item.label}
                  </span>
                </>
              )}

            </NavLink>

          ))}

        </div>

      </nav>

      {/* FLOATING PROFILE */}
      <button
        onClick={() => setShowProfilePopup(true)}
        className="fixed bottom-20 right-4 z-50 md:hidden bg-gradient-to-r from-brand-highlight to-brand-accent p-3 rounded-full shadow-lg"
      >
        <User className="h-5 w-5 text-text-primary" />
      </button>

    </>
  );
};

export default MobileNav;