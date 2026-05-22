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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Invalid credentials. Please try again.');
        setIsSubmitting(false);
      }
    }, 400);
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
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-highlight/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-secondary/30 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/10 rounded-full blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
      >
        {/* LEFT PANEL - Brand Section */}
        <div className="relative hidden lg:flex flex-col justify-between p-8 lg:p-10 bg-gradient-to-br from-brand-bg via-white to-brand-secondary/30 border-r border-brand-accent">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-3">
            <div className="p-2.5 bg-brand-highlight rounded-xl shadow-sm">
              <Building2 className="h-5 w-5 text-text-primary" />
            </div>
            <span className="text-xs font-black tracking-[0.2em] text-text-secondary uppercase">Corporate Portal</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-4">
            <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-text-primary leading-tight">
              Connect.<br />
              Collaborate.<br />
              Celebrate.
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Your centralized hub for team collaboration, knowledge sharing, and workplace recognition.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex items-center gap-4 text-xs text-text-muted">
            <div className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /><span>500+ Members</span></div>
            <div className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" /><span>24/7 Access</span></div>
          </motion.div>
        </div>

        {/* RIGHT PANEL - Login Form */}
        <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center bg-white">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-center lg:text-left mb-6 lg:mb-8">
            <div className="mx-auto lg:mx-0 h-10 w-10 lg:h-12 lg:w-12 bg-brand-highlight rounded-2xl flex items-center justify-center mb-4 shadow-sm">
              <Sparkles className="h-5 w-5 lg:h-6 lg:w-6 text-text-primary" />
            </div>
            <h1 className="text-xl lg:text-2xl font-black text-text-primary tracking-tight">Welcome Back</h1>
            <p className="text-xs lg:text-sm text-text-secondary mt-1">Sign in to access your workspace</p>
          </motion.div>

          <form className="space-y-4 lg:space-y-5" onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-rose-50 border border-rose-200 text-rose-600 p-3 rounded-xl text-xs font-semibold flex items-start gap-2">
                  <span>⚠️</span><span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-3">
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-text-primary h-4 w-4 transition-colors" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-brand-bg border border-brand-accent rounded-xl pl-11 pr-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-highlight transition-all" placeholder="Email address" required disabled={isSubmitting} />
              </div>
              
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-text-primary h-4 w-4 transition-colors" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-brand-bg border border-brand-accent rounded-xl pl-11 pr-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-highlight transition-all" placeholder="Password" required disabled={isSubmitting} />
              </div>
            </div>

            <motion.button type="submit" disabled={isSubmitting} className="w-full btn-primary py-3 text-sm" whileTap={{ scale: 0.98 }}>
              {isSubmitting ? <div className="h-5 w-5 border-2 border-text-primary border-t-transparent rounded-full animate-spin" /> : <><LogIn className="h-5 w-5" /><span>Sign In</span></>}
            </motion.button>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="bg-brand-secondary/30 border border-brand-accent rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-text-secondary uppercase tracking-wider"><Sparkles className="h-3.5 w-3.5" /><span>Demo Access</span></div>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => handleQuickFill('employee')} className="p-2.5 text-left bg-white border border-brand-accent hover:border-brand-highlight rounded-xl transition-all group">
                  <span className="text-xs font-bold text-text-primary group-hover:text-text-primary block">👨‍💻 Employee</span>
                  <span className="text-[10px] text-text-muted truncate">employee@demo.com</span>
                </button>
                <button type="button" onClick={() => handleQuickFill('admin')} className="p-2.5 text-left bg-white border border-brand-accent hover:border-brand-highlight rounded-xl transition-all group">
                  <span className="text-xs font-bold text-text-primary group-hover:text-text-primary block">👩‍💼 Admin</span>
                  <span className="text-[10px] text-text-muted truncate">admin@demo.com</span>
                </button>
              </div>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;