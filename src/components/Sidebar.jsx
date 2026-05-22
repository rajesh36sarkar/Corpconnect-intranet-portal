import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
// Removed unused 'Settings' import
import { 
  LayoutDashboard, Heart, BookOpen, Users, Calendar, 
  MessageCircle, Image, Shield, LogOut, Sparkles, ChevronRight,
  User, Mail, Briefcase, X, Award 
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
    navItems.push({ to: '/admin', icon: Shield, label: 'Admin' });
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

  // Don't render if no user
  if (!user) return null;

  return (
    <>
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-brand-accent flex flex-col z-40 hidden md:flex shadow-sm">
        {/* Logo Section with Animation */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 border-b border-brand-accent"
        >
          <div className="flex items-center gap-2.5">
            <motion.div 
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="p-2 bg-gradient-to-br from-brand-highlight to-brand-accent rounded-xl shadow-sm"
            >
              <Sparkles className="h-5 w-5 text-text-primary" />
            </motion.div>
            <div>
              <h1 className="text-lg font-black text-text-primary tracking-tight">CorpConnect</h1>
              <p className="text-[10px] font-semibold text-text-muted">Intranet Portal</p>
            </div>
          </div>
        </motion.div>

        {/* Navigation - Converted to a semantic list */}
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
                        <item.icon className={`h-4 w-4 transition-colors ${isActive ? 'text-brand-highlight' : ''}`} />
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

        {/* User Footer - Clickable Profile */}
        <div className="p-4 border-t border-brand-accent">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowProfilePopup(true)}
            aria-expanded={showProfilePopup}
            aria-haspopup="dialog"
            className="w-full text-left focus:outline-none focus:ring-2 focus:ring-brand-highlight rounded-xl"
          >
            <div className="flex items-center gap-3 p-2 rounded-xl bg-gradient-to-r from-brand-secondary to-brand-secondary/50 hover:from-brand-highlight/20 hover:to-brand-secondary transition-all duration-300 group">
              <div className="relative">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-brand-highlight to-brand-accent flex items-center justify-center text-lg shadow-sm group-hover:scale-105 transition-transform">
                  {user?.avatar || (user?.name?.charAt(0) || '👤')}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text-primary truncate group-hover:text-text-primary transition-colors">
                  {user?.name || 'Guest User'}
                </p>
                <p className="text-xs text-text-muted truncate">{user?.department || 'Staff'}</p>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-text-muted group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>

          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 px-3 py-2 w-full rounded-xl text-sm text-rose-600 hover:bg-rose-50 transition-all duration-200 mt-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Desktop Profile Popup Modal */}
      <AnimatePresence>
        {showProfilePopup && user && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProfilePopup(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
              aria-hidden="true"
            />
            
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="User Profile Details"
              initial={{ opacity: 0, scale: 0.9, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-72 top-24 z-50 w-80"
            >
              <div className="bg-white rounded-2xl shadow-2xl border border-brand-accent overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-brand-highlight to-brand-secondary p-5 text-center relative">
                  <button
                    onClick={() => setShowProfilePopup(false)}
                    aria-label="Close Profile Popup"
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <X className="h-4 w-4 text-text-primary" />
                  </button>
                  
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-brand-highlight rounded-full blur-md opacity-50" />
                    <div className="relative text-5xl bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto border-4 border-white shadow-lg">
                      {user?.avatar || (user?.role === 'admin' ? '👩‍💼' : '👨‍💻')}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
                  </div>
                  
                  <h3 className="font-bold text-text-primary text-lg mt-3">{user?.name || 'Guest User'}</h3>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      user?.role === 'admin' 
                        ? 'bg-amber-100 text-amber-700' 
                        : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {user?.role === 'admin' ? 'Administrator' : 'Team Member'}
                    </span>
                  </div>
                </div>
                
                {/* Details */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded-xl bg-brand-secondary/30">
                    <Mail className="h-4 w-4 text-text-muted" />
                    <div className="flex-1">
                      <p className="text-[10px] text-text-muted uppercase tracking-wider">Email</p>
                      <p className="text-sm font-medium text-text-primary">{user?.email || 'user@company.com'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-2 rounded-xl bg-brand-secondary/30">
                    <Briefcase className="h-4 w-4 text-text-muted" />
                    <div className="flex-1">
                      <p className="text-[10px] text-text-muted uppercase tracking-wider">Department</p>
                      <p className="text-sm font-medium text-text-primary">{user?.department || 'Operations'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-2 rounded-xl bg-brand-secondary/30">
                    <Calendar className="h-4 w-4 text-text-muted" />
                    <div className="flex-1">
                      <p className="text-[10px] text-text-muted uppercase tracking-wider">Member Since</p>
                      <p className="text-sm font-medium text-text-primary">{user?.joinDate || 'January 2024'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-2 rounded-xl bg-brand-secondary/30">
                    <Award className="h-4 w-4 text-text-muted" />
                    <div className="flex-1">
                      <p className="text-[10px] text-text-muted uppercase tracking-wider">Recognition Points</p>
                      <p className="text-sm font-medium text-text-primary">🏆 247 points</p>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="p-4 border-t border-brand-accent flex gap-3">
                  <button
                    onClick={handleViewProfile}
                    className="flex-1 btn-primary py-2 text-sm flex items-center justify-center gap-2 rounded-xl bg-brand-highlight text-white font-medium focus:outline-none focus:ring-2 focus:ring-brand-highlight focus:ring-offset-2"
                  >
                    <User className="h-4 w-4" />
                    View Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-600 py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-300"
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