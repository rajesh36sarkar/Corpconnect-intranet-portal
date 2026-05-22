import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Building2, LogIn, Mail, Lock, Sparkles, Users, CalendarDays } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const result = await login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Invalid credentials. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleQuickFill = (type) => {
    if (type === 'employee') {
      setEmail('employee@demo.com');
      setPassword('emp123');
    } else {
      setEmail('admin@demo.com');
      setPassword('admin123');
    }
    setError('');
  };

  return (
    <div className="min-h-screen bg-brand-bg font-sans flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-highlight/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-secondary/30 rounded-full blur-3xl" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/10 rounded-full blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
      >
        {/* LEFT PANEL - Brand Section */}
        <div className="relative hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-brand-bg via-white to-brand-secondary/30 border-r border-brand-accent">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-brand-highlight rounded-xl shadow-sm">
              <Building2 className="h-5 w-5 text-text-primary" />
            </div>
            <span className="text-xs font-black tracking-[0.2em] text-text-secondary uppercase">Corpconnect Intranet Portal</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-black tracking-tight text-text-primary leading-tight">
              Connect.<br />
              Collaborate.<br />
              Celebrate.
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Your centralized hub for team collaboration, knowledge sharing, and workplace recognition.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-text-muted">
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              <span>500+ Team Members</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              <span>24/7 Access</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - Login Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-center bg-white">
          <div className="text-center lg:text-left mb-8">
            <div className="mx-auto lg:mx-0 h-12 w-12 bg-brand-highlight rounded-2xl flex items-center justify-center mb-4 shadow-sm">
              <Sparkles className="h-6 w-6 text-text-primary" />
            </div>
            <h1 className="text-2xl font-black text-text-primary tracking-tight">Welcome Back</h1>
            <p className="text-sm text-text-secondary mt-1">Sign in to access your workspace</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  role="alert"
                  aria-live="polite"
                  className="bg-rose-50 border border-rose-200 text-rose-600 p-3 rounded-xl text-xs font-semibold flex items-start gap-2"
                >
                  <span aria-hidden="true">⚠️</span>
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-3">
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-text-primary h-4 w-4 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-brand-bg border border-brand-accent rounded-xl pl-11 pr-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-highlight focus:ring-2 focus:ring-brand-highlight/20 transition-all"
                  placeholder="Email address"
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-text-primary h-4 w-4 transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-brand-bg border border-brand-accent rounded-xl pl-11 pr-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-highlight focus:ring-2 focus:ring-brand-highlight/20 transition-all"
                  placeholder="Password"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full btn-primary py-3 text-sm flex items-center justify-center gap-2 ${isSubmitting ? 'cursor-not-allowed opacity-80' : ''}`}
            >
              {isSubmitting ? (
                <div className="h-5 w-5 border-2 border-text-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>

            {/* Demo Access Panel */}
            <div className="bg-brand-secondary/30 border border-brand-accent rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-text-secondary uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Demo Access</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleQuickFill('employee')}
                  className="p-2.5 text-left bg-white border border-brand-accent hover:border-brand-highlight rounded-xl transition-all group focus:outline-none focus:ring-2 focus:ring-brand-highlight"
                >
                  <span className="text-xs font-bold text-text-primary block">👨‍💻 Employee</span>
                  <span className="text-[10px] text-text-muted truncate">employee@demo.com</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFill('admin')}
                  className="p-2.5 text-left bg-white border border-brand-accent hover:border-brand-highlight rounded-xl transition-all group focus:outline-none focus:ring-2 focus:ring-brand-highlight"
                >
                  <span className="text-xs font-bold text-text-primary block">👩‍💼 Admin</span>
                  <span className="text-[10px] text-text-muted truncate">admin@demo.com</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;