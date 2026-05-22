import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, FileText, Shield, Download, Search, FolderGit2, Eye, Library, ChevronRight } from 'lucide-react';
import { documents } from '../data/mockData';

const KnowledgeHub = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('handbook');

  // Hardened filter logic with optional chaining
  const filteredDocs = (documents || []).filter(doc => 
    (doc?.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (doc?.category || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { id: 'handbook', label: 'Handbooks', icon: BookOpen },
    { id: 'policies', label: 'Policies', icon: Shield },
    { id: 'documents', label: 'Documents', icon: FileText }
  ];

  const sections = [
    { number: '01', label: 'Company Vision', desc: 'Strategic alignment and core values' },
    { number: '02', label: 'Code of Conduct', desc: 'Behavioral expectations and ethics' },
    { number: '03', label: 'Remote Work Policy', desc: 'Hybrid work guidelines' },
    { number: '04', label: 'Growth Framework', desc: 'Career development paths' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 border-b border-brand-accent pb-5"
      >
        <div className="p-2.5 bg-brand-secondary rounded-xl border border-brand-accent">
          <Library className="h-5 w-5 text-text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-black text-text-primary tracking-tight">Knowledge Hub</h1>
          <p className="text-xs text-text-muted">Central repository for company resources and documentation</p>
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="relative max-w-md"
      >
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted h-4 w-4" aria-hidden="true" />
        <input
          type="text"
          aria-label="Search knowledge base"
          placeholder="Search documents, policies, or handbooks..."
          className="w-full bg-white border border-brand-accent rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-highlight/20 focus:border-brand-highlight transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </motion.div>

      {/* Accessible Tab List */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        role="tablist"
        aria-label="Knowledge categories"
        className="flex gap-1 border-b border-brand-accent"
      >
        {tabs.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 relative text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-brand-highlight rounded-t-lg ${
              activeTab === tab.id 
                ? 'text-text-primary' 
                : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            <tab.icon className="h-4 w-4" aria-hidden="true" />
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeKnowledgeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-highlight"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </motion.div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          
          {/* Handbooks Tab */}
          {activeTab === 'handbook' && (
            <motion.div key="handbook" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-5">
              <div className="card bg-gradient-to-r from-brand-secondary to-brand-bg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 bg-white rounded-xl flex items-center justify-center border border-brand-accent">
                      <BookOpen className="h-7 w-7 text-text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Primary Resource</span>
                      <h3 className="font-bold text-text-primary text-lg">Employee Handbook 2024</h3>
                      <p className="text-sm text-text-muted mt-1">Complete guide to company culture, policies, and procedures</p>
                    </div>
                  </div>
                  <button aria-label="Download Employee Handbook" className="btn-primary py-2.5 px-5">
                    <Download className="h-4 w-4" aria-hidden="true" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>

              <div className="card">
                <h4 className="text-sm font-bold text-text-primary mb-4 flex items-center gap-2">
                  <FolderGit2 className="h-4 w-4" />
                  <span>Core Sections</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sections.map(section => (
                    <motion.div
                      key={section.number}
                      whileHover={{ x: 4 }}
                      className="flex items-start gap-3 p-3 bg-brand-secondary/30 rounded-xl border border-brand-accent hover:border-brand-highlight transition-all group cursor-pointer focus-within:ring-2 focus-within:ring-brand-highlight"
                      tabIndex={0}
                    >
                      <span className="text-xs font-mono font-bold text-text-muted bg-white/50 px-2 py-1 rounded">{section.number}</span>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-text-primary">{section.label}</p>
                        <p className="text-xs text-text-muted">{section.desc}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-text-muted group-hover:text-text-primary transition-colors" aria-hidden="true" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Policies Tab */}
          {activeTab === 'policies' && (
            <motion.div key="policies" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-3">
              {filteredDocs.filter(d => d.category === 'Policy').map((doc, idx) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between p-4 card hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-brand-secondary rounded-xl flex items-center justify-center border border-brand-accent">
                      <Shield className="h-5 w-5 text-text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-bold text-text-primary">{doc.title}</p>
                      <p className="text-xs text-text-muted mt-0.5">Last updated: {doc.updated || 'Jan 2024'}</p>
                    </div>
                  </div>
                  <button aria-label={`Download ${doc.title}`} className="p-2 rounded-lg hover:bg-brand-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-brand-highlight">
                    <Download className="h-4 w-4 text-text-muted" aria-hidden="true" />
                  </button>
                </motion.div>
              ))}
              {filteredDocs.filter(d => d.category === 'Policy').length === 0 && (
                <div className="text-center py-12 text-text-muted">No policies found matching your search.</div>
              )}
            </motion.div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <motion.div key="documents" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDocs.map((doc, idx) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between p-4 card hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 bg-brand-secondary rounded-xl flex items-center justify-center border border-brand-accent shrink-0">
                      <FileText className="h-5 w-5 text-text-primary" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-text-primary truncate">{doc.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-bold uppercase text-text-muted">{doc.category}</span>
                      </div>
                    </div>
                  </div>
                  <button aria-label={`View ${doc.title}`} className="p-2 rounded-lg hover:bg-brand-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-brand-highlight">
                    <Eye className="h-4 w-4 text-text-muted" aria-hidden="true" />
                  </button>
                </motion.div>
              ))}
              {filteredDocs.length === 0 && (
                <div className="col-span-2 text-center py-12 text-text-muted">No documents found matching your search.</div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default KnowledgeHub;