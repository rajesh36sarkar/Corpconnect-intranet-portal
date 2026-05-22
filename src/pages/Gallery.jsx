import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Removed unused 'Heart' import
import { X, Upload, Image as ImageIcon, Camera, Calendar, Download, ZoomIn } from 'lucide-react';
import { galleryImages } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const { user } = useAuth();

  // Safe localStorage parsing on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('gallery');
      setImages(stored ? JSON.parse(stored) : galleryImages);
    } catch (e) {
      console.error('Failed to parse gallery from storage:', e);
      setImages(galleryImages);
    }
  }, []);

  // Lock body scroll when either modal is open
  useEffect(() => {
    if (showUpload || selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showUpload, selectedImage]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = {
          id: Date.now().toString(),
          url: reader.result,
          title: file.name.split('.')[0] || 'Event Photo',
          date: new Date().toISOString().split('T')[0],
          likes: 0
        };
        const updated = [newImage, ...images];
        setImages(updated);
        
        // Base64 strings are huge; wrap in try/catch to handle QuotaExceededErrors
        try {
          localStorage.setItem('gallery', JSON.stringify(updated));
        } catch (error) {
          console.error('Failed to save image to localStorage (likely quota exceeded):', error);
          // In a real app, you'd trigger a toast notification here
        }
        
        setShowUpload(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper to safely format dates
  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Recent' : date.toLocaleDateString();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
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
          <div className="p-2.5 bg-brand-secondary rounded-xl border border-brand-accent">
            <Camera className="h-5 w-5 text-text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-black text-text-primary tracking-tight">Company Gallery</h1>
            <p className="text-xs text-text-muted">Memories, events, and team moments</p>
          </div>
        </div>

        {user?.role === 'admin' && (
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowUpload(true)} 
            className="btn-primary py-2.5 px-5 focus:outline-none focus:ring-2 focus:ring-brand-highlight focus:ring-offset-2"
          >
            <Upload className="h-4 w-4" />
            <span>Upload Photo</span>
          </motion.button>
        )}
      </motion.div>

      {/* Stats Bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-4 text-sm"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-secondary/50 rounded-full">
          <ImageIcon className="h-3.5 w-3.5 text-text-muted" />
          <span className="font-semibold text-text-primary">{images.length}</span>
          <span className="text-text-muted">photos</span>
        </div>
      </motion.div>

      {/* Gallery Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {images.map((img, idx) => (
          <motion.button
            key={img.id}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="group cursor-pointer w-full text-left focus:outline-none focus:ring-2 focus:ring-brand-highlight rounded-xl"
            onClick={() => setSelectedImage(img)}
            aria-label={`View full size image of ${img.title}`}
          >
            <div className="relative overflow-hidden rounded-xl bg-brand-secondary border border-brand-accent">
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100" aria-hidden="true">
                <ZoomIn className="h-8 w-8 text-white drop-shadow-lg" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white font-semibold text-sm truncate">{img.title}</p>
                <div className="flex items-center gap-2 text-white/80 text-xs mt-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(img.date)}</span>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {images.length === 0 && (
        <div className="text-center py-16 card">
          <Camera className="h-12 w-12 text-text-muted mx-auto mb-3" />
          <p className="text-text-muted">No photos yet. Be the first to upload!</p>
        </div>
      )}

      {/* Upload Modal */}
      <AnimatePresence>
        {showUpload && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUpload(false)}
              aria-hidden="true"
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div 
              role="dialog"
              aria-modal="true"
              aria-labelledby="upload-modal-title"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-brand-accent"
            >
              <button 
                onClick={() => setShowUpload(false)}
                aria-label="Close upload modal"
                className="absolute top-4 right-4 p-1 rounded-lg hover:bg-brand-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-brand-highlight"
              >
                <X className="h-5 w-5 text-text-muted" />
              </button>
              
              <div className="text-center mb-4">
                <Camera className="h-10 w-10 text-text-primary mx-auto mb-2" aria-hidden="true" />
                <h3 id="upload-modal-title" className="text-lg font-bold text-text-primary">Upload Photo</h3>
                <p className="text-sm text-text-muted">Share team moments and memories</p>
              </div>
              
              <label 
                className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-brand-accent rounded-xl cursor-pointer hover:border-brand-highlight hover:bg-brand-secondary/30 transition-colors focus-within:ring-2 focus-within:ring-brand-highlight focus-within:ring-offset-2"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.currentTarget.querySelector('input').click();
                  }
                }}
              >
                <Upload className="h-8 w-8 text-text-muted mb-2" aria-hidden="true" />
                <span className="text-sm text-text-primary font-medium">Click to upload</span>
                <span className="text-xs text-text-muted mt-1">PNG, JPG up to 10MB</span>
                <input type="file" accept="image/*" onChange={handleUpload} className="hidden" tabIndex={-1} />
              </label>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              aria-hidden="true"
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              role="dialog"
              aria-modal="true"
              aria-label={`Viewing full size image: ${selectedImage.title}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedImage(null)}
                aria-label="Close image viewer"
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 focus:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white rounded-full text-white transition-colors z-10"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="w-full bg-black flex items-center justify-center min-h-[50vh] max-h-[75vh]">
                <img 
                  src={selectedImage.url} 
                  alt={selectedImage.title} 
                  className="w-full h-full object-contain" 
                />
              </div>
              
              <div className="p-4 bg-white border-t border-brand-accent shrink-0">
                <h3 className="font-bold text-text-primary">{selectedImage.title}</h3>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-2 gap-3">
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(selectedImage.date)}</span>
                  </div>
                  {/* Optional: You could wire this up to create a real download link */}
                  <a 
                    href={selectedImage.url} 
                    download={selectedImage.title}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-brand-secondary hover:bg-brand-accent transition-colors text-text-primary font-medium focus:outline-none focus:ring-2 focus:ring-brand-highlight"
                  >
                    <Download className="h-4 w-4" />
                    <span className="text-sm">Download</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;