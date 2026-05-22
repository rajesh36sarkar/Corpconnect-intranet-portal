import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Calendar, Radio, Pin, ArrowUpRight, Bell } from 'lucide-react';
import { initialAnnouncements } from '../data/mockData';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  
  useEffect(() => {
    const stored = localStorage.getItem('announcements');
    setAnnouncements(stored ? JSON.parse(stored) : initialAnnouncements);
  }, []);

  const getCategoryStyles = (category) => {
    const term = category?.toLowerCase() || '';
    if (term.includes('urgent') || term.includes('critical')) {
      return 'bg-rose-100 text-rose-700 border-rose-200';
    }
    if (term.includes('leadership') || term.includes('vision')) {
      return 'bg-amber-100 text-amber-700 border-amber-200';
    }
    return 'bg-brand-secondary text-text-primary border-brand-accent';
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4 md:mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-brand-secondary rounded-lg border border-brand-accent">
            <Megaphone className="h-4 w-4 text-text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-text-primary uppercase tracking-wide">Announcements</h3>
            <p className="text-xs text-text-muted">Company updates & news</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-1 bg-brand-secondary rounded-md text-[10px] font-bold text-text-primary">
          <Radio className="h-3 w-3 animate-pulse" />
          <span className="hidden sm:inline">Live</span>
        </div>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
        {announcements.map((ann, idx) => (
          <motion.div
            key={ann.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ x: 4 }}
            className="p-3 md:p-4 bg-brand-secondary/30 rounded-xl border border-brand-accent hover:border-brand-highlight transition-all"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase border ${getCategoryStyles(ann.category)}`}>
                  {ann.category || 'Update'}
                </span>
                {ann.pinned && (
                  <Pin className="h-3 w-3 text-text-muted rotate-45" />
                )}
              </div>
              <ArrowUpRight className="h-3.5 w-3.5 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <h4 className="font-bold text-text-primary text-sm mb-1">{ann.title}</h4>
            <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">{ann.content}</p>
            
            <div className="flex items-center gap-2 mt-3 text-xs text-text-muted">
              <Calendar className="h-3 w-3" />
              <span>{new Date(ann.date).toLocaleDateString()}</span>
            </div>
          </motion.div>
        ))}

        {announcements.length === 0 && (
          <div className="text-center py-8">
            <Bell className="h-8 w-8 text-text-muted mx-auto mb-2" />
            <p className="text-text-muted">No announcements yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;