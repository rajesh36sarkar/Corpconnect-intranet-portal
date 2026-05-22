import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

import {
  LayoutDashboard,
  Heart,
  BookOpen,
  Users,
  Calendar,
  MessageCircle,
  Image,
  Shield,
  LogOut,
  ChevronRight,
  User,
  Mail,
  Briefcase,
  X,
  Award
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/recognition', icon: Heart, label: 'Recognition' },
    { to: '/knowledge', icon: BookOpen, label: 'Knowledge Hub' },
    { to: '/colleagues', icon: Users, label: 'Colleagues' },
    { to: '/calendar', icon: Calendar, label: 'Calendar' },
    { to: '/forum', icon: MessageCircle, label: 'Forum' },
    { to: '/gallery', icon: Image, label: 'Gallery' },
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

  const handleViewProfile = () => {
    setShowProfilePopup(false);
    navigate('/profile');
  };

  if (!user) return null;

  return (
    <>
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-brand-accent flex flex-col z-40 hidden md:flex shadow-sm">

        {/* BRAND */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-brand-accent">

          <img
            src="/brand-logo.svg"
            alt="CorpConnect"
            className="h-11 w-11 object-contain shrink-0"
          />

          <img
            src="/brand-name.png"
            alt="CorpConnect"
            className="h-7 object-contain"
          />

        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 overflow-y-auto custom-scrollbar">
          <ul className="space-y-1">

            {navItems.map((item, idx) => (
              <li key={item.to}>

                <NavLink to={item.to} className="block w-full">

                  {({ isActive }) => (

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      whileHover={{ x: 4 }}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-brand-highlight/30 to-brand-secondary text-text-primary shadow-sm'
                          : 'text-text-muted hover:bg-brand-secondary hover:text-text-primary'
                      }`}
                    >

                      <div className="flex items-center gap-3">
                        <item.icon
                          className={`h-4 w-4 ${
                            isActive ? 'text-brand-highlight' : ''
                          }`}
                        />

                        <span>{item.label}</span>
                      </div>

                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="h-1.5 w-1.5 rounded-full bg-brand-highlight"
                        />
                      )}

                    </motion.div>

                  )}

                </NavLink>

              </li>
            ))}

          </ul>
        </nav>

        {/* USER FOOTER */}
        <div className="p-4 border-t border-brand-accent">

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowProfilePopup(true)}
            className="w-full text-left rounded-xl"
          >

            <div className="flex items-center gap-3 p-2 rounded-xl bg-gradient-to-r from-brand-secondary to-brand-secondary/50 hover:from-brand-highlight/20 hover:to-brand-secondary transition-all duration-300">

              <div className="relative">

                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-brand-highlight to-brand-accent flex items-center justify-center text-lg shadow-sm">
                  {user?.avatar || user?.name?.charAt(0)}
                </div>

                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />

              </div>

              <div className="flex-1 min-w-0">

                <p className="text-sm font-semibold text-text-primary truncate">
                  {user?.name}
                </p>

                <p className="text-xs text-text-muted truncate">
                  {user?.department}
                </p>

              </div>

              <ChevronRight className="h-3.5 w-3.5 text-text-muted" />

            </div>

          </motion.button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 w-full rounded-xl text-sm text-rose-600 hover:bg-rose-50 transition-all duration-200 mt-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>

        </div>

      </aside>

      {/* PROFILE POPUP */}
      <AnimatePresence>

        {showProfilePopup && user && (

          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProfilePopup(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -20 }}
              className="fixed left-72 top-24 z-50 w-80"
            >

              <div className="bg-white rounded-2xl shadow-2xl border border-brand-accent overflow-hidden">

                <div className="bg-gradient-to-r from-brand-highlight to-brand-secondary p-5 text-center relative">

                  <button
                    onClick={() => setShowProfilePopup(false)}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20"
                  >
                    <X className="h-4 w-4 text-text-primary" />
                  </button>

                  <div className="text-5xl bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto border-4 border-white shadow-lg">
                    {user?.avatar || '👤'}
                  </div>

                  <h3 className="font-bold text-text-primary text-lg mt-3">
                    {user?.name}
                  </h3>

                </div>

                <div className="p-4 space-y-3">

                  <div className="flex items-center gap-3 p-2 rounded-xl bg-brand-secondary/30">
                    <Mail className="h-4 w-4 text-text-muted" />

                    <div>
                      <p className="text-[10px] text-text-muted uppercase">
                        Email
                      </p>

                      <p className="text-sm font-medium text-text-primary">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                </div>

                <div className="p-4 border-t border-brand-accent flex gap-3">

                  <button
                    onClick={handleViewProfile}
                    className="flex-1 btn-primary py-2 text-sm"
                  >
                    <User className="h-4 w-4" />
                    View Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-600 py-2 rounded-xl text-sm font-semibold"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>

                </div>

              </div>

            </motion.div>
          </>
        )}

      </AnimatePresence>
    </>
  );
};

export default Sidebar;