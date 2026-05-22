import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, CheckCircle2, XCircle, Clock, User, MessageCircle, Heart, Megaphone, Search, Flag, Ban, Eye, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Moderation = () => {
  const { user } = useAuth();
  const [moderationQueue, setModerationQueue] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  // Load content
  useEffect(() => {
    try {
      const celebrations = JSON.parse(localStorage.getItem('celebrations') || '[]');
      const forumPosts = JSON.parse(localStorage.getItem('forumPosts') || '[]');
      const appreciations = JSON.parse(localStorage.getItem('appreciations') || '[]');
      
      const allItems = [
        ...celebrations.map(c => ({ ...c, contentType: 'Celebration', status: 'pending', flagged: false })),
        ...forumPosts.map(f => ({ ...f, contentType: 'Forum Post', status: 'pending', flagged: false })),
        ...appreciations.map(a => ({ ...a, contentType: 'Appreciation', status: 'pending', flagged: false }))
      ];
      
      setModerationQueue(allItems);
    } catch (e) {
      console.error('Failed to load moderation data:', e);
    }
  }, []);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedItem]);

  const handleApprove = (id) => setModerationQueue(prev => prev.filter(item => item.id !== id));
  const handleReject = (id) => setModerationQueue(prev => prev.filter(item => item.id !== id));
  const handleFlag = (id) => {
    setModerationQueue(prev => prev.map(item => item.id === id ? { ...item, flagged: true, status: 'review' } : item));
  };

  const filteredItems = moderationQueue.filter(item => {
    const matchesFilter = filter === 'all' || item.contentType === filter || 
                          (filter === 'flagged' && item.flagged) ||
                          (filter === 'pending' && item.status === 'pending');
    const matchesSearch = (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.content || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.author || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: moderationQueue.length,
    pending: moderationQueue.filter(i => i.status === 'pending').length,
    flagged: moderationQueue.filter(i => i.flagged).length,
    approved: moderationQueue.filter(i => i.status === 'approved').length
  };

  const getContentIcon = (type) => {
    switch(type) {
      case 'Celebration': return <Heart className="h-4 w-4 text-rose-500" />;
      case 'Forum Post': return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case 'Appreciation': return <Megaphone className="h-4 w-4 text-emerald-500" />;
      default: return <Shield className="h-4 w-4 text-text-muted" />;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-brand-accent pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-brand-secondary rounded-xl border border-brand-accent">
            <Shield className="h-5 w-5 text-text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-black text-text-primary tracking-tight">Content Moderation</h1>
            <p className="text-xs text-text-muted">Review and manage user-generated content</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="card text-center p-4"><div className="text-2xl font-black text-text-primary">{stats.total}</div><div className="text-xs text-text-muted">Total Items</div></div>
        <div className="card text-center p-4 bg-amber-50 border-amber-200"><div className="text-2xl font-black text-amber-600">{stats.pending}</div><div className="text-xs text-amber-600 font-medium">Pending Review</div></div>
        <div className="card text-center p-4 bg-rose-50 border-rose-200"><div className="text-2xl font-black text-rose-600">{stats.flagged}</div><div className="text-xs text-rose-600 font-medium">Flagged</div></div>
        <div className="card text-center p-4 bg-emerald-50 border-emerald-200"><div className="text-2xl font-black text-emerald-600">{stats.approved}</div><div className="text-xs text-emerald-600 font-medium">Approved</div></div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted h-4 w-4" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search by title, content, or author..."
            className="w-full bg-white border border-brand-accent rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-highlight"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar-horizontal">
          {['all', 'Celebration', 'Forum Post', 'Appreciation', 'pending', 'flagged'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${filter === type ? 'bg-brand-highlight text-text-primary border border-brand-accent' : 'bg-white border border-brand-accent text-text-muted'}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {filteredItems.map((item, idx) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} className="card">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-brand-secondary rounded-full text-xs">
                      {getContentIcon(item.contentType)}
                      <span className="font-medium">{item.contentType}</span>
                    </div>
                    {item.flagged && <div className="flex items-center gap-1 px-2 py-0.5 bg-rose-100 rounded-full text-xs text-rose-600"><Flag className="h-3 w-3" /> Flagged</div>}
                  </div>
                  <h3 className="font-bold text-text-primary text-lg">{item.title || 'Untitled'}</h3>
                  <p className="text-sm text-text-secondary mt-1">{item.content}</p>
                </div>
                
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => handleApprove(item.id)} aria-label="Approve" className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600"><CheckCircle2 className="h-5 w-5" /></button>
                  <button onClick={() => handleReject(item.id)} aria-label="Reject" className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600"><XCircle className="h-5 w-5" /></button>
                  <button onClick={() => handleFlag(item.id)} aria-label="Flag" className="p-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-600"><Flag className="h-5 w-5" /></button>
                  <button onClick={() => setSelectedItem(item)} aria-label="View Details" className="p-2 rounded-lg bg-brand-secondary hover:bg-brand-accent text-text-muted"><Eye className="h-5 w-5" /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedItem(null)} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div role="dialog" aria-modal="true" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white rounded-2xl p-6 max-w-2xl w-full border border-brand-accent max-h-[80vh] overflow-y-auto">
              <button onClick={() => setSelectedItem(null)} aria-label="Close" className="absolute top-4 right-4 p-1 rounded-lg hover:bg-brand-secondary"><X className="h-5 w-5" /></button>
              <h2 className="text-xl font-black mb-4">{selectedItem.title || 'Untitled'}</h2>
              <p className="text-text-primary p-4 bg-brand-secondary/30 rounded-xl mb-4">{selectedItem.content}</p>
              <div className="flex gap-3">
                <button onClick={() => { handleApprove(selectedItem.id); setSelectedItem(null); }} className="flex-1 btn-primary py-2.5">Approve Content</button>
                <button onClick={() => { handleReject(selectedItem.id); setSelectedItem(null); }} className="flex-1 btn-secondary py-2.5">Reject Content</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Moderation;