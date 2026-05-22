import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
// Cleaned up unused imports
import { 
  LayoutDashboard, Heart, Users, Shield, BookOpen, 
  User, LogOut, X, Mail, Briefcase, Calendar as CalendarIcon, Award 
} from 'lucide-react';

const MobileNav = () => {
  const { user, logout } = useAuth();
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMobile) return null;
  if (!user) return null;
  
  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Home' },
    { to: '/recognition', icon: Heart, label: 'Kudos' },
    { to: '/colleagues', icon: Users, label: 'Team' },
    { to: '/knowledge', icon: BookOpen, label: 'Hub' },
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

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/98 backdrop-blur-xl border-t border-brand-accent z-50 block md:hidden pb-safe shadow-lg">
        <div className="flex justify-around items-center h-16 px-2 relative">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                relative flex flex-col items-center justify-center gap-0.5 py-1 px-3 rounded-xl transition-all duration-200
                ${isActive ? 'text-text-primary' : 'text-text-muted hover:text-text-secondary'}
              `}
            >
              {({ isActive }) => (
                <>
                  <motion.div
                    animate={isActive ? { y: -3, scale: 1.15 } : { y: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="relative"
                  >
                    <item.icon className={`h-5 w-5 transition-colors duration-200 ${isActive ? 'text-brand-highlight' : ''}`} />
                    {isActive && (
                      <motion.div
                        layoutId="mobileActiveIndicator"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-highlight"
                        transition={{ type: 'spring', stiffness: 500 }}
                      />
                    )}
                  </motion.div>
                  <span className={`text-[10px] font-medium transition-all duration-200 ${isActive ? 'font-bold text-text-primary scale-105' : ''}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="mobileActiveTab"
                      className="absolute -top-0.5 h-0.5 w-8 bg-gradient-to-r from-brand-highlight to-brand-accent rounded-full"
                      transition={{ type: 'spring', stiffness: 500 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Floating Profile Button - Added aria-label */}
      <button
        onClick={() => setShowProfilePopup(true)}
        aria-label="Open User Profile"
        className="fixed bottom-20 right-4 z-50 md:hidden bg-gradient-to-r from-brand-highlight to-brand-accent p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
      >
        <User className="h-5 w-5 text-text-primary" />
      </button>

      {/* Mobile Profile Popup Modal */}
      <AnimatePresence>
        {showProfilePopup && user && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProfilePopup(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
            />
            
            {/* Popup Content - Added accessibility roles */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="User Profile Details"
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed bottom-28 right-4 left-4 z-50 md:hidden"
            >
              <div className="bg-white rounded-2xl shadow-2xl border border-brand-accent overflow-hidden">
                {/* Header with gradient */}
                <div className="bg-gradient-to-r from-brand-highlight to-brand-secondary p-5 text-center relative">
                  <button
                    onClick={() => setShowProfilePopup(false)}
                    aria-label="Close Profile Popup"
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <X className="h-4 w-4 text-text-primary" />
                  </button>
                  
                  {/* Avatar */}
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-brand-highlight rounded-full blur-md opacity-50" />
                    <div className="relative text-5xl bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto border-4 border-white shadow-lg">
                      {user?.avatar || (user?.role === 'admin' ? '👩‍💼' : '👨‍💻')}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
                  </div>
                  
                  <h3 className="font-bold text-text-primary text-lg mt-3">{user?.name || 'Guest User'}</h3>
                  <p className="text-xs text-text-muted">{user?.role === 'admin' ? 'Administrator' : 'Team Member'}</p>
                </div>
                
                {/* User Details */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded-xl bg-brand-secondary/30">
                    <Mail className="h-4 w-4 text-text-muted" />
                    <div className="flex-1">
                      <p className="text-xs text-text-muted">Email</p>
                      <p className="text-sm font-medium text-text-primary">{user?.email || 'user@company.com'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-2 rounded-xl bg-brand-secondary/30">
                    <Briefcase className="h-4 w-4 text-text-muted" />
                    <div className="flex-1">
                      <p className="text-xs text-text-muted">Department</p>
                      <p className="text-sm font-medium text-text-primary">{user?.department || 'Operations'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-2 rounded-xl bg-brand-secondary/30">
                    <CalendarIcon className="h-4 w-4 text-text-muted" />
                    <div className="flex-1">
                      <p className="text-xs text-text-muted">Member Since</p>
                      <p className="text-sm font-medium text-text-primary">{user?.joinDate || 'Jan 2024'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-2 rounded-xl bg-brand-secondary/30">
                    <Award className="h-4 w-4 text-text-muted" />
                    <div className="flex-1">
                      <p className="text-xs text-text-muted">Recognition Points</p>
                      <p className="text-sm font-medium text-text-primary">🏆 247 points</p>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="p-4 border-t border-brand-accent flex gap-3">
                  <button
                    onClick={handleViewProfile}
                    className="flex-1 btn-primary py-2 text-sm flex items-center justify-center gap-2 rounded-xl bg-brand-highlight text-white font-medium"
                  >
                    <User className="h-4 w-4" />
                    View Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-600 py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
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

export default MobileNav;