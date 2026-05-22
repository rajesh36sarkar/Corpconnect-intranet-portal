import React from 'react';
import { motion } from 'framer-motion';
// Added Inbox icon for the empty state
import { TrendingUp, Target, BarChart3, CheckCircle2, Building2, Inbox } from 'lucide-react'; 
import { departmentUpdates } from '../data/mockData';

const DepartmentUpdates = () => {
  const getDeptStyles = (dept) => {
    const name = dept?.toLowerCase() || '';
    if (name.includes('sales')) return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (name.includes('tech') || name.includes('eng')) return 'bg-blue-100 text-blue-700 border-blue-200';
    if (name.includes('hr')) return 'bg-rose-100 text-rose-700 border-rose-200';
    return 'bg-brand-secondary text-text-primary border-brand-accent';
  };

  // Safely extract entries to prevent app crashes if data is missing
  const updatesList = Object.entries(departmentUpdates || {});

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-brand-secondary rounded-lg border border-brand-accent">
            <TrendingUp className="h-4 w-4 text-text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-text-primary uppercase tracking-wide">
              Department Updates
            </h3>
            <p className="text-xs text-text-muted">Cross-team progress & milestones</p>
          </div>
        </div>
        <BarChart3 className="h-4 w-4 text-text-muted" />
      </div>

      {/* Main Content */}
      {updatesList.length === 0 ? (
        <div className="text-center py-8">
          <Inbox className="h-8 w-8 text-text-muted mx-auto mb-2" />
          <p className="text-text-muted">No department updates available</p>
        </div>
      ) : (
        <ul className="space-y-3.5">
          {updatesList.map(([dept, data], idx) => (
            <motion.li
              key={dept}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -2 }}
              className="p-4 bg-brand-secondary/30 rounded-xl border border-brand-accent hover:border-brand-highlight transition-all list-none"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-text-muted" />
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border ${getDeptStyles(dept)}`}>
                    {dept}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-text-muted">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  <span>Active</span>
                </div>
              </div>
              
              <p className="text-sm text-text-secondary leading-relaxed mb-3">{data.update}</p>
              
              {/* Changed bg-white/50 to bg-brand-secondary/50 for Dark Mode safety */}
              <div className="flex items-start gap-2 p-2 bg-brand-secondary/50 rounded-lg">
                <Target className="h-3.5 w-3.5 text-text-primary mt-0.5" />
                <div>
                  <span className="text-[10px] font-bold text-text-muted uppercase">Current Milestone</span>
                  <p className="text-xs font-medium text-text-primary mt-0.5">{data.milestone}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DepartmentUpdates;