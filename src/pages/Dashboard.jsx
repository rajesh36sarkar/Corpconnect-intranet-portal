import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Announcements from '../components/Announcements';
import DepartmentUpdates from '../components/DepartmentUpdates';
import NewJoineeCarousel from '../components/NewJoineeCarousel';
import Leaderboard from '../components/Leaderboard';
import { leadershipMessages, calendarEvents } from '../data/mockData';
import { Calendar, Quote, Sparkles, MapPin, Clock, TrendingUp, Award } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } } };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5 md:space-y-6">
      {/* Welcome Hero Section */}
      <motion.div variants={itemVariants} className="relative overflow-hidden rounded-xl md:rounded-2xl bg-gradient-to-r from-brand-highlight via-brand-secondary to-brand-bg p-4 md:p-6 lg:p-8">
        <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-36 md:w-48 h-36 md:h-48 bg-brand-accent/30 rounded-full blur-2xl" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full text-xs font-bold text-text-primary mb-3 md:mb-4">
            <Sparkles className="h-3.5 w-3.5" /><span>Welcome Back</span>
          </div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-text-primary tracking-tight">Hello, {user?.name}! 👋</h1>
          <p className="text-text-secondary mt-1 md:mt-2 text-sm md:text-base max-w-2xl">Here's what's happening across your organization today.</p>
        </div>
      </motion.div>

      {/* Leadership Messages Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {leadershipMessages.map((msg, idx) => (
          <motion.div key={msg.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="card group hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-3 mb-3">
              <div className="text-2xl md:text-3xl bg-brand-secondary rounded-xl p-2 border border-brand-accent">{msg.image}</div>
              <div className="flex-1">
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-text-muted block">{msg.title}</span>
                <h3 className="font-bold text-text-primary text-sm md:text-base">{msg.author}</h3>
              </div>
            </div>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed italic">"{msg.message}"</p>
            <div className="mt-3 pt-3 border-t border-brand-accent"><Quote className="h-3.5 w-3.5 text-text-muted" /></div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
        <div className="lg:col-span-8 space-y-5 md:space-y-6">
          <motion.div variants={itemVariants}><Announcements /></motion.div>
          <motion.div variants={itemVariants}><DepartmentUpdates /></motion.div>
          <motion.div variants={itemVariants}><NewJoineeCarousel /></motion.div>
        </div>

        <div className="lg:col-span-4 space-y-5 md:space-y-6">
          <motion.div variants={itemVariants}><Leaderboard /></motion.div>
          
          <motion.div variants={itemVariants} className="card">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-brand-accent">
              <Calendar className="h-5 w-5 text-text-primary" />
              <h3 className="font-black text-text-primary uppercase text-sm">Upcoming Events</h3>
            </div>
            <div className="space-y-3">
              {calendarEvents.slice(0, 4).map((event, idx) => (
                <motion.div key={event.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} className="p-3 bg-brand-secondary/30 rounded-xl border border-brand-accent hover:border-brand-highlight transition-all">
                  <p className="font-bold text-sm text-text-primary mb-2">{event.title}</p>
                  <div className="flex flex-col gap-1 text-xs text-text-muted">
                    <div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" /><span>{new Date(event.date).toLocaleDateString()} at {event.time}</span></div>
                    <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /><span>{event.location}</span></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="card bg-gradient-to-br from-brand-secondary to-brand-bg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-text-primary" /><h3 className="font-black text-text-primary text-sm uppercase">Quick Stats</h3></div>
              <Award className="h-4 w-4 text-text-muted" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-2 bg-white/50 rounded-xl"><div className="text-xl md:text-2xl font-black text-text-primary">24</div><div className="text-[9px] md:text-[10px] font-bold text-text-muted uppercase">Recognitions</div></div>
              <div className="text-center p-2 bg-white/50 rounded-xl"><div className="text-xl md:text-2xl font-black text-text-primary">156</div><div className="text-[9px] md:text-[10px] font-bold text-text-muted uppercase">Active Users</div></div>
              <div className="text-center p-2 bg-white/50 rounded-xl"><div className="text-xl md:text-2xl font-black text-text-primary">8</div><div className="text-[9px] md:text-[10px] font-bold text-text-muted uppercase">New Joinees</div></div>
              <div className="text-center p-2 bg-white/50 rounded-xl"><div className="text-xl md:text-2xl font-black text-text-primary">12</div><div className="text-[9px] md:text-[10px] font-bold text-text-muted uppercase">Events</div></div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;