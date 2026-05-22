import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, CheckCircle2, XCircle, Eye, Clock, User, 
  MessageCircle, Heart, Megaphone, Filter, Search,
  Flag, AlertTriangle, Ban, CheckCheck, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Moderation = () => {
  const { user } = useAuth();
  const [moderationQueue, setModerationQueue] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Load all content types for moderation
    const celebrations = JSON.parse(localStorage.getItem('celebrations') || '[]');
    const forumPosts = JSON.parse(localStorage.getItem('forumPosts') || '[]');
    const appreciations = JSON.parse(localStorage.getItem('appreciations') || '[]');
    
    const allItems = [
      ...celebrations.map(c => ({ ...c, contentType: 'Celebration', status: 'pending', flagged: false })),
      ...forumPosts.map(f => ({ ...f, contentType: 'Forum Post', status: 'pending', flagged: false })),
      ...appreciations.map(a => ({ ...a, contentType: 'Appreciation', status: 'pending', flagged: false }))
    ];
    
    setModerationQueue(allItems);
  }, []);

  const handleApprove = (id) => {
    setModerationQueue(prev => prev.filter(item => item.id !== id));
  };

  const handleReject = (id) => {
    setModerationQueue(prev => prev.filter(item => item.id !== id));
  };

  const handleFlag = (id) => {
    setModerationQueue(prev => 
      prev.map(item => 
        item.id === id ? { ...item, flagged: true, status: 'review' } : item
      )
    );
  };

  const filteredItems = moderationQueue.filter(item => {
    const matchesFilter = filter === 'all' || item.contentType === filter || 
                          (filter === 'flagged' && item.flagged) ||
                          (filter === 'pending' && item.status === 'pending');
    const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.author?.toLowerCase().includes(searchTerm.toLowerCase());
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
    <div className="space-y-5 md:space-y-6 pb-12">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-brand-accent pb-5"
      >
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

      {/* Stats Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4"
      >
        <div className="card text-center p-3 md:p-4">
          <div className="text-xl md:text-2xl font-black text-text-primary">{stats.total}</div>
          <div className="text-[10px] md:text-xs text-text-muted">Total Items</div>
        </div>
        <div className="card text-center p-3 md:p-4 bg-amber-50 border-amber-200">
          <div className="text-xl md:text-2xl font-black text-amber-600">{stats.pending}</div>
          <div className="text-[10px] md:text-xs text-amber-600 font-medium">Pending Review</div>
        </div>
        <div className="card text-center p-3 md:p-4 bg-rose-50 border-rose-200">
          <div className="text-xl md:text-2xl font-black text-rose-600">{stats.flagged}</div>
          <div className="text-[10px] md:text-xs text-rose-600 font-medium">Flagged</div>
        </div>
        <div className="card text-center p-3 md:p-4 bg-emerald-50 border-emerald-200">
          <div className="text-xl md:text-2xl font-black text-emerald-600">{stats.approved}</div>
          <div className="text-[10px] md:text-xs text-emerald-600 font-medium">Approved</div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col sm:flex-row gap-3 md:gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted h-4 w-4" />
          <input
            type="text"
            placeholder="Search by title, content, or author..."
            className="w-full bg-white border border-brand-accent rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-highlight transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar-horizontal">
          {['all', 'Celebration', 'Forum Post', 'Appreciation', 'pending', 'flagged'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all capitalize ${
                filter === type 
                  ? 'bg-brand-highlight text-text-primary border border-brand-accent'
                  : 'bg-white border border-brand-accent text-text-muted hover:bg-brand-secondary'
              }`}
            >
              {type === 'all' ? 'All Content' : type}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Moderation Queue */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: idx * 0.03 }}
              className="card hover:shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-brand-secondary rounded-full text-xs">
                      {getContentIcon(item.contentType)}
                      <span className="font-medium">{item.contentType}</span>
                    </div>
                    {item.flagged && (
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-rose-100 rounded-full text-xs text-rose-600">
                        <Flag className="h-3 w-3" />
                        <span>Flagged for Review</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-text-muted text-xs">
                      <User className="h-3 w-3" />
                      <span>{item.author || 'Anonymous'}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-text-primary text-base md:text-lg mb-1">{item.title || 'Untitled'}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">{item.content}</p>
                  
                  <div className="flex items-center gap-3 mt-3 text-xs text-text-muted">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(item.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleApprove(item.id)}
                    className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors text-emerald-600"
                    title="Approve"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleReject(item.id)}
                    className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 transition-colors text-rose-600"
                    title="Reject"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleFlag(item.id)}
                    className="p-2 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors text-amber-600"
                    title="Flag"
                  >
                    <Flag className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="p-2 rounded-lg bg-brand-secondary hover:bg-brand-accent transition-colors text-text-muted"
                    title="View Details"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 card">
            <Shield className="h-12 w-12 text-text-muted mx-auto mb-3" />
            <p className="text-text-primary font-medium">All caught up!</p>
            <p className="text-text-muted text-sm">No items require moderation at this time.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl p-6 max-w-2xl w-full shadow-2xl border border-brand-accent max-h-[80vh] overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-1 rounded-lg hover:bg-brand-secondary transition-colors"
              >
                <X className="h-5 w-5 text-text-muted" />
              </button>
              
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 bg-brand-secondary rounded-full text-xs">
                    {getContentIcon(selectedItem.contentType)}
                    <span className="font-medium">{selectedItem.contentType}</span>
                  </div>
                  {selectedItem.flagged && (
                    <span className="badge bg-rose-100 text-rose-600 border-rose-200">Flagged</span>
                  )}
                </div>
                <h2 className="text-xl font-black text-text-primary">{selectedItem.title || 'Untitled'}</h2>
                <div className="flex items-center gap-2 mt-2 text-sm text-text-muted flex-wrap">
                  <User className="h-4 w-4" />
                  <span>{selectedItem.author || 'Anonymous'}</span>
                  <span>•</span>
                  <Clock className="h-4 w-4" />
                  <span>{new Date(selectedItem.timestamp).toLocaleString()}</span>
                </div>
              </div>
              
              <div className="p-4 bg-brand-secondary/30 rounded-xl mb-4">
                <p className="text-text-primary leading-relaxed whitespace-pre-wrap">{selectedItem.content}</p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handleApprove(selectedItem.id);
                    setSelectedItem(null);
                  }}
                  className="flex-1 btn-primary py-2.5"
                >
                  <CheckCheck className="h-4 w-4" />
                  <span>Approve Content</span>
                </button>
                <button
                  onClick={() => {
                    handleReject(selectedItem.id);
                    setSelectedItem(null);
                  }}
                  className="flex-1 btn-secondary py-2.5"
                >
                  <Ban className="h-4 w-4" />
                  <span>Reject Content</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Moderation;