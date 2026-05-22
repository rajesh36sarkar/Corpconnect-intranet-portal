import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const configs = {
    success: {
      bg: 'bg-emerald-50 border-emerald-200',
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
      text: 'text-emerald-800'
    },
    error: {
      bg: 'bg-rose-50 border-rose-200',
      icon: <AlertCircle className="h-5 w-5 text-rose-500" />,
      text: 'text-rose-800'
    },
    info: {
      bg: 'bg-blue-50 border-blue-200',
      icon: <Info className="h-5 w-5 text-blue-500" />,
      text: 'text-blue-800'
    }
  };

  const config = configs[type] || configs.success;

  return (
    <div className="fixed top-4 md:top-6 right-4 md:right-6 z-50">
      <motion.div
        initial={{ opacity: 0, x: 50, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 50, scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className={`flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl border shadow-lg ${config.bg} min-w-[280px] md:min-w-[300px] max-w-[90vw] md:max-w-[400px]`}
      >
        {config.icon}
        <p className={`text-xs md:text-sm font-medium flex-1 ${config.text}`}>{message}</p>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors">
          <X className="h-3.5 w-3.5 text-gray-500" />
        </button>
      </motion.div>
    </div>
  );
};

export default Toast;