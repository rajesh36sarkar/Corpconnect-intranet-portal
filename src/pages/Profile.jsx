import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Mail, Briefcase, Calendar, Award, MapPin, User, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-text-muted">Loading profile...</p>
      </div>
    );
  }

  // Helper for displaying profile fields
  const ProfileItem = ({ icon: Icon, label, value }) => (
    <li className="flex items-center gap-3 p-3 rounded-xl bg-brand-secondary/30 hover:bg-brand-secondary/50 transition-colors">
      <div className="p-2 rounded-lg bg-white/50 border border-brand-accent">
        <Icon className="h-5 w-5 text-text-muted" aria-hidden="true" />
      </div>
      <div>
        <p className="text-xs text-text-muted">{label}</p>
        <p className="text-text-primary font-medium">{value}</p>
      </div>
    </li>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 border-b border-brand-accent pb-5"
      >
        <button 
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="p-2 rounded-lg bg-brand-secondary border border-brand-accent hover:bg-brand-accent transition-colors focus:outline-none focus:ring-2 focus:ring-brand-highlight"
        >
          <ArrowLeft className="h-5 w-5 text-text-primary" />
        </button>
        <div className="p-2.5 bg-brand-secondary rounded-xl border border-brand-accent">
          <User className="h-5 w-5 text-text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-black text-text-primary tracking-tight">My Profile</h1>
          <p className="text-xs text-text-muted">View your personal information</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        {/* Profile Header */}
        <div className="text-center pb-6 border-b border-brand-accent">
          <div className="relative inline-block">
            <div className="text-6xl bg-brand-secondary rounded-full w-28 h-28 flex items-center justify-center mx-auto border-4 border-brand-highlight shadow-lg">
              {user?.avatar || (user?.role === 'admin' ? '👩‍💼' : '👨‍💻')}
            </div>
          </div>
          <h2 className="text-2xl font-black text-text-primary mt-4">{user?.name}</h2>
          <p className="text-text-muted">{user?.role === 'admin' ? 'Administrator' : 'Team Member'}</p>
          <div className="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-emerald-50 rounded-full">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            <span className="text-xs text-emerald-600 font-medium">Active</span>
          </div>
        </div>

        {/* Profile Details */}
        <div className="pt-6">
          <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4">Contact & Role Info</h3>
          <ul className="space-y-4">
            <ProfileItem icon={Mail} label="Email Address" value={user?.email || 'user@company.com'} />
            <ProfileItem icon={Briefcase} label="Department" value={user?.department || 'Operations'} />
            <ProfileItem icon={Calendar} label="Member Since" value={user?.joinDate || 'January 2024'} />
            <ProfileItem icon={MapPin} label="Location" value={user?.location || 'Remote / HQ'} />
            <ProfileItem icon={Award} label="Recognition Points" value="🏆 247 points" />
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;