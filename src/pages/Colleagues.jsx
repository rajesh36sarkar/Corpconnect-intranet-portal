import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Mail,
  Users,
  Building2,
  X,
  MapPin,
  Calendar as CalendarIcon,
  Award,
  Sparkles
} from 'lucide-react';

import { colleagues } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const Colleagues = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedColleague, setSelectedColleague] = useState(null);
  const { user } = useAuth();

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

  const departments = [
    'all',
    ...new Set(
      safeColleagues.map((c) => c.department).filter(Boolean)
    )
  ];

  const filteredColleagues = safeColleagues.filter((c) => {
    const term = searchTerm.toLowerCase();

    const matchesSearch =
      (c.name || '').toLowerCase().includes(term) ||
      (c.role || '').toLowerCase().includes(term) ||
      (c.department || '').toLowerCase().includes(term);

    const matchesDept =
      selectedDept === 'all' ||
      c.department === selectedDept;

    if (
      c.department === 'Enterprise Sales' &&
      user?.department !== 'Enterprise Sales' &&
      user?.role !== 'admin'
    ) {
      return false;
    }

    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-5 md:space-y-6 pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-brand-accent pb-5"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2.5 bg-brand-secondary rounded-xl border border-brand-accent shrink-0">
            <Users className="h-5 w-5 text-text-primary" />
          </div>

          <div className="min-w-0">
            <h1 className="text-xl font-black text-text-primary tracking-tight truncate">
              Team Directory
            </h1>

            <p className="text-xs text-text-muted truncate">
              Connect with colleagues across the organization
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-secondary/50 rounded-full">
            <Users className="h-3.5 w-3.5 text-text-muted" />

            <span className="text-sm font-semibold text-text-primary">
              {filteredColleagues.length}
            </span>

            <span className="text-xs text-text-muted">
              members
            </span>
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
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted h-4 w-4" />

          <input
            type="text"
            placeholder="Search by name, role, or department..."
            className="w-full bg-white border border-brand-accent rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-highlight focus:ring-2 focus:ring-brand-highlight/20 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Department Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar-horizontal no-scrollbar">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                selectedDept === dept
                  ? 'bg-brand-highlight text-text-primary border border-brand-accent'
                  : 'bg-white border border-brand-accent text-text-muted hover:bg-brand-secondary'
              }`}
            >
              {dept === 'all'
                ? 'All Departments'
                : dept}
            </button>
          ))}
        </div>
      </motion.div>

      
      {/* Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
  <AnimatePresence>
    {filteredColleagues.map((colleague, idx) => (
      <motion.button
        key={colleague.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay: idx * 0.03 }}
        whileHover={{ y: -2 }}
        onClick={() => setSelectedColleague(colleague)}
        className="unstyled-button w-full"
      >
        <div className="card text-left overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
          
          {/* Top Section */}
          <div className="flex items-start gap-3 w-full">
            
            {/* Avatar */}
            <div className="w-14 h-14 shrink-0 rounded-xl bg-brand-secondary border border-brand-accent flex items-center justify-center text-2xl">
              {colleague.avatar}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 overflow-hidden">
              <h3 className="font-bold text-sm md:text-base text-text-primary truncate">
                {colleague.name}
              </h3>

              <p className="text-xs md:text-sm text-text-muted truncate mt-0.5">
                {colleague.role}
              </p>

              {/* Department */}
              <div className="flex items-center gap-1 mt-2 min-w-0">
                <Building2 className="h-3 w-3 text-text-muted shrink-0" />

                <span className="text-[11px] text-text-muted truncate">
                  {colleague.department}
                </span>
              </div>
            </div>
          </div>

          {/* Badges */}
          {(colleague.badges || []).length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-brand-accent">
              {(colleague.badges || [])
                .slice(0, 2)
                .map((badge) => (
                  <span
                    key={badge}
                    className="px-2 py-1 rounded-md text-[10px] font-medium bg-brand-secondary border border-brand-accent text-text-primary truncate max-w-[120px]"
                  >
                    {badge}
                  </span>
                ))}

              {(colleague.badges || []).length > 2 && (
                <span className="px-2 py-1 rounded-md text-[10px] font-medium bg-brand-highlight/20 text-text-primary">
                  +{colleague.badges.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </motion.button>
    ))}
  </AnimatePresence>
</div>

      {/* Empty */}
      {filteredColleagues.length === 0 && (
        <div className="text-center py-12 card">
          <Users className="h-12 w-12 text-text-muted mx-auto mb-3" />

          <p className="text-text-muted text-sm">
            No colleagues found matching your
            search.
          </p>

          <p className="text-xs text-text-muted mt-1">
            Try adjusting your filters or search
            term.
          </p>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedColleague && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() =>
                setSelectedColleague(null)
              }
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20
              }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 300
              }}
              className="relative bg-white rounded-2xl p-5 sm:p-6 max-w-md w-full mx-3 sm:mx-0 shadow-2xl border border-brand-accent max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() =>
                  setSelectedColleague(null)
                }
                className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-brand-secondary transition-colors"
              >
                <X className="h-5 w-5 text-text-muted" />
              </button>

              <div className="text-center">
                <div className="text-5xl bg-brand-secondary rounded-full w-20 h-20 flex items-center justify-center mx-auto border-2 border-brand-accent">
                  {selectedColleague.avatar}
                </div>

                <h2 className="text-xl font-black text-text-primary mt-3 break-words">
                  {selectedColleague.name}
                </h2>

                <p className="text-text-muted text-sm break-words">
                  {selectedColleague.role}
                </p>

                <span className="inline-block mt-2 badge">
                  {selectedColleague.department}
                </span>
              </div>

              <div className="mt-5 pt-4 border-t border-brand-accent">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-sm text-text-secondary">
                    <div className="p-1.5 bg-brand-secondary rounded-lg shrink-0">
                      <Mail className="h-4 w-4 text-text-muted" />
                    </div>

                    <span className="break-words text-xs sm:text-sm">
                      {selectedColleague.email ||
                        `${selectedColleague.name
                          .toLowerCase()
                          .replace(
                            /\s+/g,
                            '.'
                          )}@company.com`}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <div className="p-1.5 bg-brand-secondary rounded-lg shrink-0">
                      <MapPin className="h-4 w-4 text-text-muted" />
                    </div>

                    <span>
                      {selectedColleague.location ||
                        'Remote / HQ'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <div className="p-1.5 bg-brand-secondary rounded-lg shrink-0">
                      <CalendarIcon className="h-4 w-4 text-text-muted" />
                    </div>

                    <span>
                      Joined{' '}
                      {selectedColleague.joinDate ||
                        'Jan 2024'}
                    </span>
                  </div>
                </div>
              </div>

              {selectedColleague.badges &&
                selectedColleague.badges
                  .length > 0 && (
                  <div className="mt-4 pt-4 border-t border-brand-accent">
                    <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">
                      Recognition Badges
                    </h4>

                    <div className="flex flex-wrap gap-2">
                      {selectedColleague.badges.map(
                        (badge) => (
                          <span
                            key={badge}
                            className="badge bg-amber-50 text-amber-700 border-amber-200"
                          >
                            <Award className="h-3.5 w-3.5 shrink-0" />

                            <span className="break-words">
                              {badge}
                            </span>
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button className="btn-primary py-2.5">
                  <Mail className="h-4 w-4" />
                  <span>Message</span>
                </button>

                <button className="bg-brand-secondary hover:bg-brand-highlight text-text-primary py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 border border-brand-accent transition-colors">
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