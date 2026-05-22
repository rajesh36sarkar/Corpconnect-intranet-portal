import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// Removed unused 'Star' import
import { Trophy, Medal, Sparkles, Flame, Crown } from 'lucide-react';
import { initialAppreciations, colleagues } from '../data/mockData';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  
  useEffect(() => {
    // Safely parse localStorage to prevent app crashes on invalid JSON
    let appreciations = initialAppreciations;
    try {
      const stored = localStorage.getItem('appreciations');
      if (stored) {
        appreciations = JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse appreciations, falling back to initial data');
    }
    
    const counts = {};
    (appreciations || []).forEach(ap => {
      if (ap?.to) {
        counts[ap.to] = (counts[ap.to] || 0) + 1;
      }
    });
    
    const ranked = Object.entries(counts)
      .map(([name, count]) => {
        const colleague = (colleagues || []).find(c => c?.name === name);
        return { 
          name, 
          count, 
          avatar: colleague?.avatar || '👤', 
          role: colleague?.role || 'Team Member' 
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    setLeaderboard(ranked);
  }, []);

  const getRankStyles = (index) => {
    switch(index) {
      case 0:
        return { bg: 'bg-gradient-to-r from-amber-50 to-transparent', border: 'border-amber-200', icon: <Crown className="h-5 w-5 text-amber-500" /> };
      case 1:
        return { bg: 'bg-gradient-to-r from-slate-100 to-transparent', border: 'border-slate-200', icon: <Medal className="h-5 w-5 text-slate-400" /> };
      case 2:
        return { bg: 'bg-gradient-to-r from-amber-100/50 to-transparent', border: 'border-amber-200/50', icon: <Medal className="h-5 w-5 text-amber-600" /> };
      default:
        return { bg: 'bg-brand-secondary/30', border: 'border-brand-accent', icon: <span className="text-xs font-bold text-text-muted w-5 text-center">{index + 1}</span> };
    }
  };

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-50 rounded-lg border border-amber-200">
            <Trophy className="h-4 w-4 text-amber-600" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-text-primary uppercase tracking-wide">
              Top Recognized
            </h3>
            <p className="text-xs text-text-muted">Most appreciated colleagues</p>
          </div>
        </div>

        <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 rounded-md text-[10px] font-bold text-emerald-600">
          <Flame className="h-3 w-3" />
          <span>Hot Streak</span>
        </div>
      </div>

      {/* Leaderboard List - Changed to <ol> */}
      <ol className="space-y-2">
        {leaderboard.map((person, idx) => {
          const styles = getRankStyles(idx);
          return (
            <motion.li
              key={person.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ x: 4 }}
              className={`flex items-center justify-between p-3 rounded-xl border ${styles.bg} ${styles.border} transition-all`}
            >
              <div className="flex items-center gap-3">
                <div className="w-7 flex justify-center">{styles.icon}</div>
                <div className="text-xl bg-brand-secondary rounded-full h-9 w-9 flex items-center justify-center border border-brand-accent">
                  {person.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm text-text-primary">{person.name}</p>
                  <p className="text-xs text-text-muted">{person.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 bg-brand-highlight rounded-full">
                <Sparkles className="h-3 w-3 text-text-primary" />
                <span className="text-xs font-bold text-text-primary">{person.count}</span>
              </div>
            </motion.li>
          );
        })}

        {/* Empty State */}
        {leaderboard.length === 0 && (
          <div className="text-center py-8 list-none">
            <Trophy className="h-8 w-8 text-text-muted mx-auto mb-2" />
            <p className="text-text-muted">No recognitions yet</p>
            <p className="text-xs text-text-muted mt-1">Be the first to appreciate someone!</p>
          </div>
        )}
      </ol>
    </div>
  );
};

export default Leaderboard;