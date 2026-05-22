import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Removed unused 'Filter' import
import { MessageCircle, ThumbsUp, Send, HelpCircle, MessagesSquare, Sparkles, User, Pin, Users as UsersIcon } from 'lucide-react';
import { initialForumPosts } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [newAnswer, setNewAnswer] = useState({});
  const [activeCategory, setActiveCategory] = useState('all');
  const { user } = useAuth();

  useEffect(() => {
    // Safe JSON parsing to prevent fatal crashes
    try {
      const stored = localStorage.getItem('forumPosts');
      setPosts(stored ? JSON.parse(stored) : initialForumPosts);
    } catch (e) {
      console.error('Failed to parse forum posts from storage:', e);
      setPosts(initialForumPosts);
    }
  }, []);

  const handleAddPost = () => {
    if (!newPost.title || !newPost.content) return;
    const post = {
      id: Date.now().toString(),
      author: user?.name || 'Team Member',
      authorAvatar: user?.role === 'admin' ? '👩‍💼' : '👨‍💻',
      title: newPost.title,
      content: newPost.content,
      answers: [],
      upvotes: 0,
      // Inherit the active category, default to general if viewing 'all'
      category: activeCategory === 'all' ? 'general' : activeCategory,
      timestamp: new Date().toISOString(),
      isPinned: false
    };
    const updated = [post, ...posts];
    setPosts(updated);
    localStorage.setItem('forumPosts', JSON.stringify(updated));
    setNewPost({ title: '', content: '' });
  };

  const handleAddAnswer = (postId) => {
    const answerText = newAnswer[postId];
    if (!answerText) return;
    
    const updated = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          answers: [...(post.answers || []), { 
            id: Date.now().toString(), 
            author: user?.name || 'Team Member', 
            content: answerText, 
            upvotes: 0,
            timestamp: new Date().toISOString()
          }]
        };
      }
      return post;
    });
    setPosts(updated);
    localStorage.setItem('forumPosts', JSON.stringify(updated));
    setNewAnswer({ ...newAnswer, [postId]: '' });
  };

  const handleUpvote = (postId) => {
    const updated = posts.map(post => 
      post.id === postId ? { ...post, upvotes: (post.upvotes || 0) + 1 } : post
    );
    setPosts(updated);
    localStorage.setItem('forumPosts', JSON.stringify(updated));
  };

  const categories = [
    { id: 'all', label: 'All Discussions', icon: MessagesSquare },
    { id: 'general', label: 'General', icon: MessageCircle },
    { id: 'tech', label: 'Tech', icon: Sparkles },
    { id: 'hr', label: 'HR', icon: UsersIcon }
  ];

  // Helper to safely format dates
  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Recently' : date.toLocaleDateString();
  };

  // Actually filter the posts based on the active category
  const filteredPosts = posts.filter(post => {
    if (activeCategory === 'all') return true;
    // Fallback to 'general' if a mock post doesn't have a category
    return (post.category || 'general') === activeCategory;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 border-b border-brand-accent pb-5"
      >
        <div className="p-2.5 bg-brand-secondary rounded-xl border border-brand-accent">
          <MessagesSquare className="h-5 w-5 text-text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-black text-text-primary tracking-tight">Discussion Forum</h1>
          <p className="text-xs text-text-muted">Ask questions, share knowledge, and collaborate</p>
        </div>
      </motion.div>

      {/* New Post Form */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
          <HelpCircle className="h-4 w-4" />
          <span>Start a Discussion</span>
        </h2>
        
        <div className="space-y-3">
          <input
            type="text"
            aria-label="Discussion Title"
            className="w-full bg-brand-bg border border-brand-accent rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-highlight focus:ring-1 focus:ring-brand-highlight transition-colors"
            placeholder="What would you like to discuss?"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <textarea
            aria-label="Discussion Content"
            className="w-full bg-brand-bg border border-brand-accent rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-highlight focus:ring-1 focus:ring-brand-highlight transition-colors resize-none"
            rows="3"
            placeholder="Share details, context, or questions..."
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          />
          <button 
            onClick={handleAddPost} 
            className="btn-primary py-2.5 px-5 focus:outline-none focus:ring-2 focus:ring-brand-highlight focus:ring-offset-2"
          >
            <Send className="h-4 w-4" />
            <span>Post Discussion</span>
          </button>
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        role="group"
        aria-label="Filter discussions by category"
        className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar-horizontal"
      >
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            aria-pressed={activeCategory === cat.id}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-brand-highlight ${
              activeCategory === cat.id
                ? 'bg-brand-highlight text-text-primary border border-brand-accent'
                : 'bg-white border border-brand-accent text-text-muted hover:bg-brand-secondary'
            }`}
          >
            <cat.icon className="h-3.5 w-3.5" />
            <span>{cat.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Posts Feed */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: idx * 0.05 }}
              className="card hover:shadow-md transition-all"
            >
              {/* Post Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="h-10 w-10 bg-brand-secondary rounded-xl flex items-center justify-center text-lg border border-brand-accent shrink-0" aria-hidden="true">
                    {post.authorAvatar || (post.author === 'Admin' ? '👩‍💼' : '👨‍💻')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-bold text-text-primary">{post.title}</h3>
                      {post.isPinned && (
                        <span className="badge text-[9px] bg-amber-50 text-amber-700 border-amber-200">
                          <Pin className="h-3 w-3" />
                          Pinned
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary mb-2">{post.content}</p>
                    <div className="flex items-center gap-4 text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author}
                      </span>
                      <span aria-hidden="true">•</span>
                      <span>{formatDate(post.timestamp)}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => handleUpvote(post.id)}
                  aria-label={`Upvote post by ${post.author}`}
                  className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl bg-brand-secondary/50 hover:bg-brand-accent transition-colors focus:outline-none focus:ring-2 focus:ring-brand-highlight"
                >
                  <ThumbsUp className="h-4 w-4 text-text-muted" />
                  <span className="text-xs font-bold text-text-primary">{post.upvotes || 0}</span>
                </button>
              </div>

              {/* Answers Section */}
              <div className="mt-4 pt-4 border-t border-brand-accent pl-4">
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle className="h-3.5 w-3.5 text-text-muted" />
                  <span className="text-xs font-semibold text-text-muted">
                    {(post.answers || []).length} {(post.answers || []).length === 1 ? 'Response' : 'Responses'}
                  </span>
                </div>

                <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar mb-3 pr-2">
                  {(post.answers || []).map(answer => (
                    <div key={answer.id} className="p-3 bg-brand-secondary/30 rounded-xl border border-brand-accent">
                      <p className="text-sm text-text-secondary">{answer.content}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-text-muted">
                        <span className="font-semibold">— {answer.author}</span>
                        <span aria-hidden="true">•</span>
                        <span>{formatDate(answer.timestamp)}</span>
                      </div>
                    </div>
                  ))}
                  {(post.answers || []).length === 0 && (
                    <p className="text-xs text-text-muted italic">No responses yet. Be the first to answer!</p>
                  )}
                </div>

                {/* Add Answer */}
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    aria-label={`Write a response to ${post.title}`}
                    className="flex-1 bg-brand-bg border border-brand-accent rounded-xl px-3.5 py-2 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-highlight focus:ring-1 focus:ring-brand-highlight transition-colors"
                    placeholder="Write a response..."
                    value={newAnswer[post.id] || ''}
                    onChange={(e) => setNewAnswer({ ...newAnswer, [post.id]: e.target.value })}
                    // Upgraded from deprecated onKeyPress to onKeyDown
                    onKeyDown={(e) => e.key === 'Enter' && handleAddAnswer(post.id)}
                  />
                  <button 
                    onClick={() => handleAddAnswer(post.id)} 
                    aria-label="Submit response"
                    className="p-2 bg-brand-highlight hover:bg-brand-accent rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-brand-highlight focus:ring-offset-1"
                  >
                    <Send className="h-4 w-4 text-text-primary" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 card">
            <MessageCircle className="h-12 w-12 text-text-muted mx-auto mb-3" />
            <p className="text-text-muted">No discussions found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forum;