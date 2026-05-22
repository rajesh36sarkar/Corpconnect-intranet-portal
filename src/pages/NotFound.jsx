import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, Compass, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
        <div className="relative mb-8"><div className="text-7xl md:text-8xl font-black text-brand-highlight">404</div><div className="absolute -top-4 -right-4 animate-bounce"><Compass className="h-8 w-8 text-brand-accent" /></div></div>
        <h1 className="text-xl md:text-2xl font-black text-text-primary mb-2">Page Not Found</h1><p className="text-text-muted mb-8">Oops! The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center"><button onClick={() => navigate(-1)} className="btn-secondary py-2.5 px-5 flex items-center gap-2"><ArrowLeft className="h-4 w-4" /><span>Go Back</span></button>
        <button onClick={() => navigate('/dashboard')} className="btn-primary py-2.5 px-5 flex items-center gap-2"><Home className="h-4 w-4" /><span>Dashboard</span></button></div>
        <div className="mt-8 pt-6 border-t border-brand-accent"><div className="flex items-center justify-center gap-2 text-xs text-text-muted"><Search className="h-3.5 w-3.5" /><span>Check the URL or use the navigation menu</span></div></div>
      </motion.div>
    </div>
  );
};

export default NotFound;