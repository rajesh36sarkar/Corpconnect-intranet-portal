import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Calendar, Briefcase, Network, UserPlus } from 'lucide-react';
import { newJoinees } from '../data/mockData';

const NewJoineeCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % newJoinees.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % newJoinees.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + newJoinees.length) % newJoinees.length);
  };

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 25 } },
    exit: (dir) => ({ x: dir < 0 ? 100 : -100, opacity: 0 })
  };

  const joinee = newJoinees[currentIndex];

  if (!joinee) return null;

  return (
    <div className="card relative overflow-hidden">
      <div className="absolute -right-12 -top-12 w-32 h-32 bg-brand-highlight/20 rounded-full blur-2xl" />

      <div className="flex items-center justify-between mb-4 md:mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-brand-secondary rounded-lg border border-brand-accent">
            <UserPlus className="h-4 w-4 text-text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-text-primary uppercase tracking-wide">New Team Members</h3>
            <p className="text-xs text-text-muted">Welcome our newest colleagues</p>
          </div>
        </div>

        <div className="flex gap-1">
          <button onClick={handlePrev} className="p-1.5 rounded-lg border border-brand-accent hover:bg-brand-secondary transition-colors">
            <ChevronLeft className="h-4 w-4 text-text-muted" />
          </button>
          <button onClick={handleNext} className="p-1.5 rounded-lg border border-brand-accent hover:bg-brand-secondary transition-colors">
            <ChevronRight className="h-4 w-4 text-text-muted" />
          </button>
        </div>
      </div>

      <div className="relative h-[200px] flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute w-full text-center"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-brand-highlight rounded-full blur-md opacity-30" />
              <div className="relative text-5xl md:text-6xl bg-white rounded-full w-20 h-20 md:w-24 md:h-24 flex items-center justify-center border-2 border-brand-accent shadow-lg mx-auto">
                {joinee.avatar}
              </div>
            </div>
            <h4 className="font-bold text-lg text-text-primary mt-4">{joinee.name}</h4>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
              <span className="flex items-center gap-1 px-3 py-1 bg-brand-secondary rounded-full text-xs text-text-primary">
                <Briefcase className="h-3 w-3" />
                {joinee.role}
              </span>
              <span className="flex items-center gap-1 px-3 py-1 bg-brand-secondary rounded-full text-xs text-text-primary">
                <Network className="h-3 w-3" />
                {joinee.department}
              </span>
            </div>
            <div className="flex items-center justify-center gap-1 mt-3 text-xs text-text-muted">
              <Calendar className="h-3 w-3" />
              <span>Joined {new Date(joinee.startDate).toLocaleDateString()}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-1.5 mt-4">
        {newJoinees.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-5 bg-brand-highlight' : 'w-1.5 bg-brand-accent'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default NewJoineeCarousel;