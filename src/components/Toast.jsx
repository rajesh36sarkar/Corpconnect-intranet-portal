import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
// Removed unused AnimatePresence import
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 4000 }) => {
  const timerRef = useRef(null);

  // Handlers to pause/resume the auto-close timer on hover
  const startTimer = () => {
    timerRef.current = setTimeout(onClose, duration);
  };

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  useEffect(() => {
    startTimer();
    return () => clearTimer();
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
    <motion.div
      role="alert"
      onMouseEnter={clearTimer}
      onMouseLeave={startTimer}
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      // Moved fixed positioning here so exit animations aren't clipped
      className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${config.bg} min-w-[300px] max-w-[400px]`}
    >
      {config.icon}
      <p className={`text-sm font-medium flex-1 ${config.text}`}>{message}</p>
      <button 
        onClick={onClose} 
        aria-label="Close notification"
        // Changed bg-white/50 to black/5 for better contrast on light backgrounds
        className="p-1 rounded-lg hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        <X className="h-4 w-4 text-gray-500" />
      </button>
    </motion.div>
  );
};

export default Toast;