import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Cleaned up unused imports
import { Search, Mail, Users, Building2, X, MapPin, Calendar as CalendarIcon, Award } from 'lucide-react';
import { colleagues } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const Colleagues = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedColleague, setSelectedColleague] = useState(null);
  const { user } = useAuth();

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedColleague) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedColleague]);

  const safeColleagues = colleagues || [];
  const departments = ['all', ...new Set(safeColleagues.map(c => c.department).filter(Boolean))];
  
  const filteredColleagues = safeColleagues.filter(c => {
    // Added null-safety fallbacks before calling .toLowerCase()
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      (c.name || '').toLowerCase().includes(term) ||
      (c.role || '').toLowerCase().includes(term) ||
      (c.department || '').toLowerCase().includes(term);
      
    const matchesDept = selectedDept === 'all' || c.department === selectedDept;
    
    // Privacy: Sales team visible only to Sales members and admins
    if (c.department === 'Enterprise Sales' && user?.department !== 'Enterprise Sales' && user?.role !== 'admin') {
      return false;
    }
    
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-brand-accent pb-5"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-brand-secondary rounded-xl border border-brand-accent">
            <Users className="h-5 w-5 text-text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-black text-text-primary tracking-tight">Team Directory</h1>
            <p className="text-xs text-text-muted">Connect with colleagues across the organization</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-secondary/50 rounded-full">
            <Users className="h-3.5 w-3.5 text-text-muted" />
            <span className="text-sm font-semibold text-text-primary">{filteredColleagues.length}</span>
            <span className="text-xs text-text-muted">team members</span>
          </div>
        </div>
      </motion.div>

      {/* Search & Filters */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="space-y-3"
      >
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted h-4 w-4" aria-hidden="true" />
          <input
            type="text"
            aria-label="Search colleagues by name, role, or department"
            placeholder="Search by name, role, or department..."
            className="w-full bg-white border border-brand-accent rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-highlight focus:ring-2 focus:ring-brand-highlight/20 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div 
          className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar-horizontal"
          role="group" 
          aria-label="Filter by department"
        >
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              aria-pressed={selectedDept === dept}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-brand-highlight ${
                selectedDept === dept 
                  ? 'bg-brand-highlight text-text-primary border border-brand-accent' 
                  : 'bg-white border border-brand-accent text-text-muted hover:bg-brand-secondary'
              }`}
            >
              {dept === 'all' ? 'All Departments' : dept}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Colleagues Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <AnimatePresence>
          {filteredColleagues.map((colleague, idx) => (
            <motion.button
              key={colleague.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.03 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedColleague(colleague)}
              // Changed from div to button and added w-full/text-left for proper alignment
              className="w-full text-left card cursor-pointer hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-brand-highlight"
            >
              <div className="flex items-start gap-3">
                <div className="text-4xl bg-brand-secondary rounded-xl p-2 border border-brand-accent shrink-0">
                  {colleague.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-text-primary">{colleague.name}</h3>
                  <p className="text-sm text-text-muted truncate">{colleague.role}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Building2 className="h-3 w-3 text-text-muted shrink-0" />
                    <span className="text-xs text-text-muted truncate">{colleague.department}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-1">
                {(colleague.badges || []).slice(0, 2).map(badge => (
                  <span key={badge} className="badge text-[9px]">
                    {badge}
                  </span>
                ))}
                {(colleague.badges || []).length > 2 && (
                  <span className="badge text-[9px] text-text-muted">+{colleague.badges.length - 2}</span>
                )}
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredColleagues.length === 0 && (
        <div className="text-center py-12 card">
          <Users className="h-12 w-12 text-text-muted mx-auto mb-3" />
          <p className="text-text-muted">No colleagues found matching your search.</p>
        </div>
      )}

      {/* Profile Modal */}
      <AnimatePresence>
        {selectedColleague && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedColleague(null)}
              aria-hidden="true"
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div 
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-brand-accent overflow-hidden"
            >
              <button 
                onClick={() => setSelectedColleague(null)}
                aria-label="Close profile modal"
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-brand-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-brand-highlight"
              >
                <X className="h-5 w-5 text-text-muted" />
              </button>

              <div className="text-center">
                <div className="text-5xl bg-brand-secondary rounded-full w-20 h-20 flex items-center justify-center mx-auto border-2 border-brand-accent">
                  {selectedColleague.avatar}
                </div>
                <h2 id="modal-title" className="text-xl font-black text-text-primary mt-3">{selectedColleague.name}</h2>
                <p className="text-text-muted">{selectedColleague.role}</p>
                <span className="inline-block mt-2 badge">{selectedColleague.department}</span>
              </div>

              <div className="mt-5 pt-4 border-t border-brand-accent">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <div className="p-1.5 bg-brand-secondary rounded-lg">
                      <Mail className="h-4 w-4 text-text-muted" />
                    </div>
                    <span className="truncate">{selectedColleague.email || `${selectedColleague.name.toLowerCase().replace(/\s+/g, '.')}@company.com`}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <div className="p-1.5 bg-brand-secondary rounded-lg">
                      <MapPin className="h-4 w-4 text-text-muted" />
                    </div>
                    <span>{selectedColleague.location || 'Remote / HQ'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <div className="p-1.5 bg-brand-secondary rounded-lg">
                      <CalendarIcon className="h-4 w-4 text-text-muted" />
                    </div>
                    <span>Joined {selectedColleague.joinDate || 'Jan 2024'}</span>
                  </div>
                </div>
              </div>

              {(selectedColleague.badges && selectedColleague.badges.length > 0) && (
                <div className="mt-4 pt-4 border-t border-brand-accent">
                  <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Recognition Badges</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedColleague.badges.map(badge => (
                      <span key={badge} className="badge bg-amber-50 text-amber-700 border-amber-200">
                        <Award className="h-3.5 w-3.5" />
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 flex gap-3">
                <button className="flex-1 btn-primary py-2.5">
                  <Mail className="h-4 w-4" />
                  <span>Message</span>
                </button>
                <button className="flex-1 bg-brand-secondary hover:bg-brand-highlight text-text-primary py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 border border-brand-accent transition-colors focus:outline-none focus:ring-2 focus:ring-brand-highlight">
                  <Award className="h-4 w-4" />
                  <span>Appreciate</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Colleagues;