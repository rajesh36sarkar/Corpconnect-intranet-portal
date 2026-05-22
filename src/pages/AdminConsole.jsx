import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Removed unused imports: Layers, Bell
import { Shield, Trash2, CheckCircle2, XCircle, Megaphone, Trophy, ShieldAlert, Plus, Sparkles, Users, Settings, Eye, MessageCircle, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
// Removed unused 'colleagues'
import { initialAnnouncements } from '../data/mockData';

const AdminConsole = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('announcements');
  const [announcements, setAnnouncements] = useState([]);
  const [moderationQueue, setModerationQueue] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '', important: false });
  // Removed unused isMobile state and its useEffect

  useEffect(() => {
    if (user?.role !== 'admin') return;

    // Helper to safely parse JSON from localStorage
    const safeParse = (key, fallback) => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
      } catch (e) {
        console.error(`Failed to parse ${key} from storage:`, e);
        return fallback;
      }
    };

    setAnnouncements(safeParse('announcements', initialAnnouncements));

    const celebrations = safeParse('celebrations', []);
    const forumPosts = safeParse('forumPosts', []);
    const appreciations = safeParse('appreciations', []);
    
    setModerationQueue([
      ...celebrations.slice(0, 2).map(c => ({ ...c, type: 'Celebration', status: 'pending' })),
      ...forumPosts.slice(0, 2).map(f => ({ ...f, type: 'Forum Post', status: 'pending' })),
      ...appreciations.slice(0, 2).map(a => ({ ...a, type: 'Appreciation', status: 'pending' }))
    ]);
  }, [user]);

  const handleAddAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.content) return;
    const announcement = {
      id: Date.now().toString(),
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      date: new Date().toISOString().split('T')[0],
      important: newAnnouncement.important,
      author: user?.name
    };
    const updated = [announcement, ...announcements];
    setAnnouncements(updated);
    localStorage.setItem('announcements', JSON.stringify(updated));
    setNewAnnouncement({ title: '', content: '', important: false });
  };

  const handleDeleteAnnouncement = (id) => {
    const updated = announcements.filter(a => a.id !== id);
    setAnnouncements(updated);
    localStorage.setItem('announcements', JSON.stringify(updated));
  };

  const handleModerate = (id, action) => {
    // Currently only removes from UI queue. Real implementation would update the item's status in storage.
    setModerationQueue(prev => prev.filter(item => item.id !== id));
  };

  // Access Denied for non-admin
  if (user?.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 min-h-[60vh]">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="p-4 bg-rose-50 rounded-2xl inline-block mb-4 border border-rose-200">
            <ShieldAlert className="h-12 w-12 text-rose-500" />
          </div>
          <h2 className="text-xl font-black text-text-primary">Access Restricted</h2>
          <p className="text-text-muted mt-2 max-w-sm">
            This area is for administrators only. Please contact HR if you need access.
          </p>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'moderation', label: 'Moderation', icon: Shield },
    { id: 'analytics', label: 'Analytics', icon: Users }
  ];

  // Analytics data with safe fallback
  const analyticsData = {
    activeUsers: 156,
    totalRecognitions: 342,
    forumPosts: 89,
    pageViews: '1.2k',
    engagementRate: '78%',
    newUsers: 24
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-brand-accent pb-5"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-brand-secondary rounded-xl border border-brand-accent shrink-0">
            <Shield className="h-5 w-5 text-text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-black text-text-primary tracking-tight">Admin Console</h1>
            <p className="text-xs text-text-muted">Manage platform content and settings</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-secondary/50 rounded-full w-fit">
          <Settings className="h-3.5 w-3.5 text-text-muted" />
          <span className="text-xs font-medium text-text-primary">Admin Access</span>
        </div>
      </motion.div>

      {/* Tabs - Scrollable on mobile */}
      <div className="overflow-x-auto custom-scrollbar-horizontal pb-2 -mx-1 px-1">
        <div className="flex gap-1 bg-brand-secondary/30 p-1 rounded-xl min-w-max">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white shadow-sm text-text-primary border border-brand-accent'
                  : 'text-text-muted hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-highlight focus:ring-inset'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          
          {/* Announcements Tab */}
          {activeTab === 'announcements' && (
            <motion.div
              key="announcements"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col lg:flex-row gap-6"
            >
              {/* Create Announcement Form */}
              <div className="lg:w-1/3 w-full">
                <div className="card">
                  <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                    <Megaphone className="h-4 w-4" />
                    Create Announcement
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      className="w-full bg-brand-bg border border-brand-accent rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-highlight"
                      placeholder="Announcement title"
                      value={newAnnouncement.title}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                    />
                    <textarea
                      className="w-full bg-brand-bg border border-brand-accent rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-highlight resize-none"
                      rows="4"
                      placeholder="Announcement content..."
                      value={newAnnouncement.content}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                    />
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-brand-accent text-brand-highlight focus:ring-brand-highlight"
                        checked={newAnnouncement.important}
                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, important: e.target.checked })}
                      />
                      <span className="text-sm text-text-primary">Mark as important</span>
                    </label>
                    <button onClick={handleAddAnnouncement} className="btn-primary w-full py-2.5">
                      <Plus className="h-4 w-4" />
                      <span>Publish Announcement</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Announcements List */}
              <div className="lg:w-2/3 w-full">
                <div className="card">
                  <h3 className="font-bold text-text-primary mb-4">Recent Announcements</h3>
                  <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
                    <AnimatePresence>
                      {announcements.map(ann => (
                        <motion.div
                          key={ann.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className={`p-4 rounded-xl border ${
                            ann.important ? 'bg-amber-50 border-amber-200' : 'bg-brand-secondary/30 border-brand-accent'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h4 className="font-bold text-text-primary">{ann.title}</h4>
                                {ann.important && (
                                  <span className="badge bg-amber-100 text-amber-700 border-amber-200">Important</span>
                                )}
                              </div>
                              <p className="text-sm text-text-secondary break-words">{ann.content}</p>
                              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-text-muted">
                                <span>{new Date(ann.date).toLocaleDateString()}</span>
                                <span>by {ann.author || 'Admin'}</span>
                              </div>
                            </div>
                            <button
                              onClick={() => handleDeleteAnnouncement(ann.id)}
                              aria-label="Delete announcement"
                              className="p-1.5 rounded-lg hover:bg-rose-50 transition-colors text-rose-500 shrink-0 self-end sm:self-start focus:outline-none focus:ring-2 focus:ring-rose-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {announcements.length === 0 && (
                      <div className="text-center py-8 text-text-muted">
                        No announcements yet. Create your first one!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Moderation Tab */}
          {activeTab === 'moderation' && (
            <motion.div
              key="moderation"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="card"
            >
              <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Content Moderation Queue ({moderationQueue.length})
              </h3>
              <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
                <AnimatePresence>
                  {moderationQueue.map(item => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-4 rounded-xl bg-brand-secondary/30 border border-brand-accent"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="badge">{item.type}</span>
                            <span className="text-xs text-text-muted">by {item.author || 'Anonymous'}</span>
                          </div>
                          <h4 className="font-bold text-text-primary break-words">{item.title || 'Untitled'}</h4>
                          <p className="text-sm text-text-secondary mt-1 break-words">{item.content}</p>
                        </div>
                        <div className="flex gap-2 shrink-0 self-end sm:self-start">
                          <button
                            onClick={() => handleModerate(item.id, 'approve')}
                            aria-label="Approve content"
                            className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                          >
                            <CheckCircle2 className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleModerate(item.id, 'reject')}
                            aria-label="Reject content"
                            className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 transition-colors text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400"
                          >
                            <XCircle className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {moderationQueue.length === 0 && (
                  <div className="text-center py-12 text-text-muted">
                    <Shield className="h-10 w-10 mx-auto mb-2 opacity-30" />
                    <p>No items pending moderation</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="card text-center p-4">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-text-primary mx-auto mb-2" />
                  <div className="text-xl sm:text-2xl font-black text-text-primary">{analyticsData.activeUsers}</div>
                  <div className="text-[10px] sm:text-xs text-text-muted">Active Users</div>
                </div>
                <div className="card text-center p-4">
                  <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-rose-500 mx-auto mb-2" />
                  <div className="text-xl sm:text-2xl font-black text-text-primary">{analyticsData.totalRecognitions}</div>
                  <div className="text-[10px] sm:text-xs text-text-muted">Total Recognitions</div>
                </div>
                <div className="card text-center p-4">
                  <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-xl sm:text-2xl font-black text-text-primary">{analyticsData.forumPosts}</div>
                  <div className="text-[10px] sm:text-xs text-text-muted">Forum Posts</div>
                </div>
                <div className="card text-center p-4">
                  <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-500 mx-auto mb-2" />
                  <div className="text-xl sm:text-2xl font-black text-text-primary">{analyticsData.pageViews}</div>
                  <div className="text-[10px] sm:text-xs text-text-muted">Page Views</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="card">
                  <h3 className="font-bold text-text-primary mb-3 flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-amber-500" />
                    Engagement Overview
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Engagement Rate</span>
                      <span className="font-bold text-text-primary">{analyticsData.engagementRate}</span>
                    </div>
                    <div className="w-full bg-brand-secondary rounded-full h-2">
                      <div className="bg-brand-highlight h-2 rounded-full" style={{ width: analyticsData.engagementRate }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">New Users (This Month)</span>
                      <span className="font-bold text-text-primary">{analyticsData.newUsers}</span>
                    </div>
                  </div>
                </div>
                
                <div className="card">
                  <h3 className="font-bold text-text-primary mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    Quick Insights
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm text-text-secondary">📈 Platform usage increased by 23% this month</p>
                    <p className="text-sm text-text-secondary">🎉 45 recognitions sent in the last week</p>
                    <p className="text-sm text-text-secondary">💬 Most active in #general forum channel</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminConsole;