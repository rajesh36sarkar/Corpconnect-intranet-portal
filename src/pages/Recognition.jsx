import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Removed unused 'Sparkles' import
import { Heart, Send, Award, MessageCircle, Users, Flame, PartyPopper, Calendar, ThumbsUp } from 'lucide-react';
import { initialAppreciations, initialCelebrations, colleagues } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';

const Recognition = () => {
  const [appreciations, setAppreciations] = useState([]);
  const [celebrations, setCelebrations] = useState([]);
  const [newAppreciation, setNewAppreciation] = useState({ to: '', message: '', badge: '🌟 Star Performer' });
  const [newCelebration, setNewCelebration] = useState({ title: '', content: '' });
  const [activeToast, setActiveToast] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    try {
      const storedApp = localStorage.getItem('appreciations');
      const storedCel = localStorage.getItem('celebrations');
      setAppreciations(storedApp ? JSON.parse(storedApp) : initialAppreciations);
      setCelebrations(storedCel ? JSON.parse(storedCel) : initialCelebrations);
    } catch (e) {
      console.error('Failed to load recognition data:', e);
      setAppreciations(initialAppreciations);
      setCelebrations(initialCelebrations);
    }
  }, []);

  const triggerToast = (message, type = 'success') => {
    setActiveToast({ message, type });
  };

  const handleSendAppreciation = (e) => {
    e.preventDefault();
    if (!newAppreciation.to || !newAppreciation.message) return;
    const appreciation = {
      id: Date.now().toString(),
      from: user?.name || 'Anonymous',
      to: newAppreciation.to,
      message: newAppreciation.message,
      timestamp: new Date().toISOString(),
      badge: newAppreciation.badge,
      likes: 0
    };
    const updated = [appreciation, ...appreciations];
    setAppreciations(updated);
    localStorage.setItem('appreciations', JSON.stringify(updated));
    setNewAppreciation({ to: '', message: '', badge: '🌟 Star Performer' });
    triggerToast(`🎉 Appreciation sent to ${appreciation.to}!`);
  };

  const handleAddCelebration = (e) => {
    e.preventDefault();
    if (!newCelebration.title || !newCelebration.content) return;
    const celebration = {
      id: Date.now().toString(),
      author: user?.name || 'Team Member',
      title: newCelebration.title,
      content: newCelebration.content,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: []
    };
    const updated = [celebration, ...celebrations];
    setCelebrations(updated);
    localStorage.setItem('celebrations', JSON.stringify(updated));
    setNewCelebration({ title: '', content: '' });
    triggerToast('🎊 Milestone shared with the team!');
  };

  const handleLike = (id) => {
    const updated = celebrations.map(c => 
      c.id === id ? { ...c, likes: (c.likes || 0) + 1 } : c
    );
    setCelebrations(updated);
    localStorage.setItem('celebrations', JSON.stringify(updated));
  };

  const badgeOptions = [
    { value: '🌟 Star Performer', label: '🌟 Star Performer' },
    { value: '🤝 Team Player', label: '🤝 Team Player' },
    { value: '💡 Innovator', label: '💡 Innovator' },
    { value: '🚀 Execution Master', label: '🚀 Execution Master' }
  ];

  return (
    <div className="space-y-6 pb-12">
      <AnimatePresence>
        {activeToast && (
          <Toast message={activeToast.message} type={activeToast.type} onClose={() => setActiveToast(null)} />
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 border-b border-brand-accent pb-5">
        <div className="p-2.5 bg-brand-secondary rounded-xl border border-brand-accent">
          <Heart className="h-5 w-5 text-rose-500" />
        </div>
        <div>
          <h1 className="text-xl font-black text-text-primary tracking-tight">Recognition & Culture</h1>
          <p className="text-xs text-text-muted">Celebrate achievements and appreciate your colleagues</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {/* Appreciation Form */}
          <form onSubmit={handleSendAppreciation} className="card">
            <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
              <Heart className="h-4 w-4 text-rose-500" />
              <span>Appreciate a Colleague</span>
            </h2>
            <div className="space-y-3.5">
              <div>
                <label htmlFor="recipient" className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-1">Recipient</label>
                <select id="recipient" required className="w-full bg-brand-bg border border-brand-accent rounded-xl px-3.5 py-2.5 text-sm text-text-primary focus:ring-2 focus:ring-brand-highlight outline-none" value={newAppreciation.to} onChange={(e) => setNewAppreciation({ ...newAppreciation, to: e.target.value })}>
                  <option value="">Select colleague...</option>
                  {(colleagues || []).filter(c => c.name !== user?.name).map(c => (
                    <option key={c.id} value={c.name}>{c.name} ({c.department})</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="badge" className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-1">Badge</label>
                <select id="badge" className="w-full bg-brand-bg border border-brand-accent rounded-xl px-3.5 py-2.5 text-sm text-text-primary focus:ring-2 focus:ring-brand-highlight outline-none" value={newAppreciation.badge} onChange={(e) => setNewAppreciation({ ...newAppreciation, badge: e.target.value })}>
                  {badgeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="ap-msg" className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-1">Message</label>
                <textarea id="ap-msg" required className="w-full bg-brand-bg border border-brand-accent rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:ring-2 focus:ring-brand-highlight outline-none resize-none" rows="3" placeholder="Why do you appreciate this person?" value={newAppreciation.message} onChange={(e) => setNewAppreciation({ ...newAppreciation, message: e.target.value })} />
              </div>
              <button type="submit" className="btn-primary w-full py-2.5"><Send className="h-4 w-4" /> <span>Send Appreciation</span></button>
            </div>
          </form>

          {/* Celebration Form */}
          <form onSubmit={handleAddCelebration} className="card">
            <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
              <PartyPopper className="h-4 w-4 text-amber-500" />
              <span>Share a Milestone</span>
            </h2>
            <div className="space-y-3.5">
              <input type="text" required className="w-full bg-brand-bg border border-brand-accent rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:ring-2 focus:ring-brand-highlight outline-none" placeholder="What are you celebrating?" value={newCelebration.title} onChange={(e) => setNewCelebration({ ...newCelebration, title: e.target.value })} />
              <textarea required className="w-full bg-brand-bg border border-brand-accent rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:ring-2 focus:ring-brand-highlight outline-none resize-none" rows="3" placeholder="Share the details of this achievement..." value={newCelebration.content} onChange={(e) => setNewCelebration({ ...newCelebration, content: e.target.value })} />
              <button type="submit" className="btn-primary w-full py-2.5"><PartyPopper className="h-4 w-4" /> <span>Share Celebration</span></button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-3 space-y-5">
          {/* Appreciations Feed */}
          <motion.div className="card">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4 flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> <span>Recent Appreciations</span></h3>
            <ul className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-1">
              {appreciations.map((ap, idx) => (
                <motion.li key={ap.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }} className="list-none p-3 bg-brand-secondary/30 rounded-xl border border-brand-accent">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1"><span className="text-xs font-bold text-text-primary">{ap.from}</span><span className="text-text-muted text-xs">→</span><span className="text-xs font-bold text-text-primary">{ap.to}</span></div>
                      <p className="text-sm text-text-secondary">{ap.message}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-text-muted"><Calendar className="h-3 w-3" /> {new Date(ap.timestamp).toLocaleDateString()} <span className="badge text-[10px]">{ap.badge}</span></div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Celebrations Feed */}
          <motion.div className="card">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4 flex items-center gap-1.5"><Flame className="h-3.5 w-3.5" /> <span>Milestones & Celebrations</span></h3>
            <ul className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-1">
              {celebrations.map((celeb, idx) => (
                <motion.li key={celeb.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }} className="list-none p-3 bg-brand-secondary/30 rounded-xl border border-brand-accent">
                  <h4 className="font-bold text-text-primary mb-1">{celeb.title}</h4>
                  <p className="text-sm text-text-secondary mb-2">{celeb.content}</p>
                  <div className="flex items-center justify-between"><div className="text-xs text-text-muted">by {celeb.author} • {new Date(celeb.timestamp).toLocaleDateString()}</div><button aria-label="Like celebration" onClick={() => handleLike(celeb.id)} className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/50 hover:bg-brand-accent transition-colors text-xs font-semibold text-text-muted"><Heart className="h-3.5 w-3.5" /> <span>{celeb.likes}</span></button></div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Recognition;