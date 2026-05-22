import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-[#f6f7f9] flex items-center justify-center p-4 overflow-hidden relative">

      {/* Background Blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-brand-highlight/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-secondary/30 rounded-full blur-3xl" />
      </div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-7xl bg-white rounded-[32px] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-[720px]"
      >

        {/* LEFT SIDE IMAGE SECTION */}
        <div className="relative hidden lg:flex overflow-hidden">

          {/* Background Image */}
          <img
            src="/login-image.png"
            alt="Workspace"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-brand-highlight/30" />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-between w-full p-10 text-white">

            {/* Logo */}
            <div>
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl">

                <img
                  src="/brand-logo.svg"
                  alt="CorpConnect"
                  className="h-10 w-10 object-contain"
                />

                <div>
                  <img
                    src="/brand-name.svg"
                    alt="CorpConnect"
                    className="h-6 object-contain brightness-0 invert"
                  />

                  <p className="text-xs text-white/70 mt-1 tracking-wide">
                    Enterprise Portal
                  </p>
                </div>
              </div>
            </div>

            {/* Hero Text */}
            <div className="max-w-lg">
              <h1 className="text-6xl font-black leading-tight tracking-tight">
                Connect.<br />
                Collaborate.<br />
                Celebrate.
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-white/80">
                Your centralized digital workspace for communication,
                teamwork, recognition, and productivity.
              </p>

              {/* Stats */}
              <div className="flex gap-4 mt-10">

                <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5">
                  <h2 className="text-4xl font-black">500+</h2>
                  <p className="text-sm text-white/70 mt-2">
                    Team Members
                  </p>
                </div>

                <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5">
                  <h2 className="text-4xl font-black">24/7</h2>
                  <p className="text-sm text-white/70 mt-2">
                    Collaboration
                  </p>
                </div>

              </div>
            </div>

            {/* Bottom Features */}
            <div className="grid grid-cols-3 gap-4">

              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4">
                <p className="font-bold text-sm">
                  Secure Access
                </p>

                <p className="text-xs text-white/70 mt-1">
                  Enterprise-grade protection
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4">
                <p className="font-bold text-sm">
                  Team Sync
                </p>

                <p className="text-xs text-white/70 mt-1">
                  Real-time collaboration
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4">
                <p className="font-bold text-sm">
                  Productivity
                </p>

                <p className="text-xs text-white/70 mt-1">
                  Everything in one place
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT SIDE LOGIN PANEL */}
        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14 bg-white">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="flex lg:hidden flex-col items-center justify-center w-full mb-10">

              <img
                src="/brand-name.png"
                alt="CorpConnect"
                className="h-16 m-4 object-contain"
              />

            </div>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-black text-text-primary tracking-tight">
                Welcome Back
              </h1>

              <p className="text-text-secondary mt-2">
                Sign in to access your workspace
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-rose-50 border border-rose-200 text-rose-600 p-4 rounded-2xl text-sm"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />

                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  required
                  className="w-full bg-[#f8fafb] border border-brand-accent rounded-2xl pl-12 pr-4 py-4 text-sm text-text-primary focus:outline-none focus:border-brand-highlight focus:ring-4 focus:ring-brand-highlight/20 transition-all"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                  required
                  className="w-full bg-[#f8fafb] border border-brand-accent rounded-2xl pl-12 pr-4 py-4 text-sm text-text-primary focus:outline-none focus:border-brand-highlight focus:ring-4 focus:ring-brand-highlight/20 transition-all"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-highlight hover:bg-brand-accent text-text-primary py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-text-primary border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="h-5 w-5" />
                    Sign In
                  </>
                )}
              </button>

              {/* Demo Access */}
              <div className="bg-brand-secondary/30 border border-brand-accent rounded-2xl p-5 space-y-4">

                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-secondary">
                  <Sparkles className="h-4 w-4" />
                  Demo Access
                </div>

                <div className="grid grid-cols-2 gap-3">

                  <button
                    type="button"
                    onClick={() => handleQuickFill('employee')}
                    className="p-3 bg-white border border-brand-accent rounded-2xl hover:border-brand-highlight transition-all text-left"
                  >
                    <span className="block text-sm font-bold text-text-primary">
                      👨‍💻 Employee
                    </span>


                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickFill('admin')}
                    className="p-3 bg-white border border-brand-accent rounded-2xl hover:border-brand-highlight transition-all text-left"
                  >
                    <span className="block text-sm font-bold text-text-primary">
                      👩‍💼 Admin
                    </span>


                  </button>

                </div>
              </div>

            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;