import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mail, Users, Building2, Sparkles, X, MapPin, Calendar as CalendarIcon, Award } from 'lucide-react';
import { colleagues } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const Colleagues = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedColleague, setSelectedColleague] = useState(null);
  const { user } = useAuth();

  const departments = ['all', ...new Set(colleagues.map(c => c.department))];
  const filteredColleagues = colleagues.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.role.toLowerCase().includes(searchTerm.toLowerCase()) || c.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'all' || c.department === selectedDept;
    if (c.department === 'Enterprise Sales' && user?.department !== 'Enterprise Sales' && user?.role !== 'admin') return false;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-5 md:space-y-6 pb-12">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-brand-accent pb-5">
        <div className="flex items-center gap-3"><div className="p-2.5 bg-brand-secondary rounded-xl border border-brand-accent"><Users className="h-5 w-5 text-text-primary" /></div>
        <div><h1 className="text-xl font-black text-text-primary tracking-tight">Team Directory</h1><p className="text-xs text-text-muted">Connect with colleagues across the organization</p></div></div>
        <div className="flex items-center gap-2"><div className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-secondary/50 rounded-full"><Users className="h-3.5 w-3.5 text-text-muted" /><span className="text-sm font-semibold text-text-primary">{filteredColleagues.length}</span><span className="text-xs text-text-muted">members</span></div></div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="space-y-3">
        <div className="relative"><Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted h-4 w-4" /><input type="text" placeholder="Search by name, role, or department..." className="w-full bg-white border border-brand-accent rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-highlight transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar-horizontal">{departments.map(dept => (<button key={dept} onClick={() => setSelectedDept(dept)} className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${selectedDept === dept ? 'bg-brand-highlight text-text-primary border border-brand-accent' : 'bg-white border border-brand-accent text-text-muted hover:bg-brand-secondary'}`}>{dept === 'all' ? 'All Departments' : dept}</button>))}</div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredColleagues.map((colleague, idx) => (<motion.div key={colleague.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: idx * 0.03 }} whileHover={{ y: -4 }} onClick={() => setSelectedColleague(colleague)} className="card cursor-pointer hover:shadow-lg transition-all">
          <div className="flex items-start gap-3"><div className="text-3xl md:text-4xl bg-brand-secondary rounded-xl p-2 border border-brand-accent">{colleague.avatar}</div>
          <div className="flex-1 min-w-0"><h3 className="font-bold text-text-primary">{colleague.name}</h3><p className="text-sm text-text-muted truncate">{colleague.role}</p><div className="flex items-center gap-1 mt-1"><Building2 className="h-3 w-3 text-text-muted" /><span className="text-xs text-text-muted">{colleague.department}</span></div></div></div>
          <div className="mt-3 flex flex-wrap gap-1">{colleague.badges.slice(0, 2).map(badge => (<span key={badge} className="badge text-[9px]">{badge}</span>))}{colleague.badges.length > 2 && <span className="badge text-[9px]">+{colleague.badges.length - 2}</span>}</div>
        </motion.div>))}
      </motion.div>

      {filteredColleagues.length === 0 && (<div className="text-center py-12 card"><Users className="h-12 w-12 text-text-muted mx-auto mb-3" /><p className="text-text-muted">No colleagues found matching your search.</p></div>)}

      <AnimatePresence>{selectedColleague && (<div className="fixed inset-0 z-50 flex items-center justify-center p-4"><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedColleague(null)} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-brand-accent">
          <button onClick={() => setSelectedColleague(null)} className="absolute top-4 right-4 p-1 rounded-lg hover:bg-brand-secondary transition-colors"><X className="h-5 w-5 text-text-muted" /></button>
          <div className="text-center"><div className="text-4xl md:text-5xl bg-brand-secondary rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto border-2 border-brand-accent">{selectedColleague.avatar}</div>
          <h2 className="text-xl font-black text-text-primary mt-3">{selectedColleague.name}</h2><p className="text-text-muted">{selectedColleague.role}</p><span className="inline-block mt-1 badge">{selectedColleague.department}</span></div>
          <div className="mt-4 pt-4 border-t border-brand-accent"><div className="space-y-2"><div className="flex items-center gap-2 text-sm text-text-secondary"><Mail className="h-4 w-4 text-text-muted" /><span>{selectedColleague.email || `${selectedColleague.name.toLowerCase().replace(' ', '.')}@company.com`}</span></div>
          <div className="flex items-center gap-2 text-sm text-text-secondary"><MapPin className="h-4 w-4 text-text-muted" /><span>{selectedColleague.location || 'Remote / HQ'}</span></div>
          <div className="flex items-center gap-2 text-sm text-text-secondary"><CalendarIcon className="h-4 w-4 text-text-muted" /><span>Joined {selectedColleague.joinDate || 'Jan 2024'}</span></div></div></div>
          <div className="mt-4 pt-4 border-t border-brand-accent"><h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Recognition Badges</h4><div className="flex flex-wrap gap-1.5">{selectedColleague.badges.map(badge => (<span key={badge} className="badge"><Award className="h-3 w-3" />{badge}</span>))}</div></div>
          <div className="mt-5 flex gap-3"><button className="flex-1 btn-primary py-2.5"><Mail className="h-4 w-4" /><span>Message</span></button><button className="flex-1 btn-secondary py-2.5"><Award className="h-4 w-4" /><span>Appreciate</span></button></div>
        </motion.div></div>)}</AnimatePresence>
    </div>
  );
};

export default Colleagues;