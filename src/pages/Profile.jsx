import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Mail, Briefcase, Calendar, Award, MapPin, Phone, User, Edit, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <div className="flex items-center justify-center min-h-[60vh]"><p className="text-text-muted">Loading profile...</p></div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5 md:space-y-6 pb-12">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 border-b border-brand-accent pb-5">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-brand-secondary border border-brand-accent hover:bg-brand-accent transition-colors"><ArrowLeft className="h-5 w-5 text-text-primary" /></button>
        <div className="p-2.5 bg-brand-secondary rounded-xl border border-brand-accent"><User className="h-5 w-5 text-text-primary" /></div>
        <div><h1 className="text-xl font-black text-text-primary tracking-tight">My Profile</h1><p className="text-xs text-text-muted">View your personal information</p></div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card">
        <div className="text-center pb-6 border-b border-brand-accent"><div className="relative inline-block"><div className="text-5xl md:text-6xl bg-brand-secondary rounded-full w-24 h-24 md:w-28 md:h-28 flex items-center justify-center mx-auto border-4 border-brand-highlight shadow-lg">{user?.avatar || (user?.role === 'admin' ? '👩‍💼' : '👨‍💻')}</div>
        <button className="absolute bottom-0 right-0 p-1.5 bg-brand-highlight rounded-full border-2 border-white hover:scale-110 transition-transform"><Edit className="h-3 w-3 text-text-primary" /></button></div>
        <h2 className="text-xl md:text-2xl font-black text-text-primary mt-4">{user?.name}</h2><p className="text-text-muted">{user?.role === 'admin' ? 'Administrator' : 'Team Member'}</p>
        <div className="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-emerald-50 rounded-full"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /><span className="text-xs text-emerald-600">Active</span></div></div>

        <div className="pt-6 space-y-4"><div className="flex items-center gap-3 p-3 rounded-xl bg-brand-secondary/30 hover:bg-brand-secondary/50 transition-colors"><Mail className="h-5 w-5 text-text-muted" /><div><p className="text-xs text-text-muted">Email Address</p><p className="text-text-primary font-medium">{user?.email || 'user@company.com'}</p></div></div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-brand-secondary/30 hover:bg-brand-secondary/50 transition-colors"><Briefcase className="h-5 w-5 text-text-muted" /><div><p className="text-xs text-text-muted">Department</p><p className="text-text-primary font-medium">{user?.department || 'Operations'}</p></div></div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-brand-secondary/30 hover:bg-brand-secondary/50 transition-colors"><Calendar className="h-5 w-5 text-text-muted" /><div><p className="text-xs text-text-muted">Member Since</p><p className="text-text-primary font-medium">{user?.joinDate || 'January 2024'}</p></div></div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-brand-secondary/30 hover:bg-brand-secondary/50 transition-colors"><MapPin className="h-5 w-5 text-text-muted" /><div><p className="text-xs text-text-muted">Location</p><p className="text-text-primary font-medium">Remote / HQ</p></div></div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-brand-secondary/30 hover:bg-brand-secondary/50 transition-colors"><Phone className="h-5 w-5 text-text-muted" /><div><p className="text-xs text-text-muted">Phone Number</p><p className="text-text-primary font-medium">+91 XXXXX XXXXX</p></div></div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-brand-secondary/30 hover:bg-brand-secondary/50 transition-colors"><Award className="h-5 w-5 text-text-muted" /><div><p className="text-xs text-text-muted">Recognition Points</p><p className="text-text-primary font-medium">🏆 247 points</p></div></div></div>
      </motion.div>
    </div>
  );
};

export default Profile;