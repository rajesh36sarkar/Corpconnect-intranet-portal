import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Users, 
  Coffee, TrendingUp, Building2, Clock, MapPin, Tag 
} from 'lucide-react';
import { calendarEvents } from '../data/mockData';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const EngagementCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('calendarEvents');
      setEvents(stored ? JSON.parse(stored) : calendarEvents);
    } catch (e) { setEvents(calendarEvents); }
  }, []);

  const days = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return Array.from({ length: firstDay }, () => null).concat(
      Array.from({ length: daysInMonth }, (_, i) => i + 1)
    );
  }, [currentDate]);

  const getEventsForDate = (day) => {
    if (!day) return [];
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 pb-20">
      {/* Mobile-friendly Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-text-primary">Calendar</h1>
        <button className="bg-brand-highlight p-3 rounded-full shadow-lg">
          <Plus className="h-6 w-6 text-text-primary" />
        </button>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-brand-accent">
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))} className="p-2 hover:bg-brand-secondary rounded-xl"><ChevronLeft /></button>
        <h2 className="text-lg font-black">{MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} className="p-2 hover:bg-brand-secondary rounded-xl"><ChevronRight /></button>
      </div>

      {/* Responsive Grid: Stacks on mobile, side-by-side on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Calendar Grid */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-brand-accent">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {WEEK_DAYS.map(d => <div key={d} className="text-center text-[10px] font-bold text-text-muted uppercase">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, idx) => (
              <button
                key={idx}
                onClick={() => day && setSelectedDay(day)}
                className={`h-12 w-full flex flex-col items-center justify-center rounded-xl text-sm font-bold transition-all
                  ${day === selectedDay ? 'bg-brand-highlight text-white' : 'hover:bg-brand-secondary'}
                  ${!day ? 'opacity-0' : ''}`}
              >
                {day}
                {day && getEventsForDate(day).length > 0 && (
                  <div className="w-1.5 h-1.5 bg-rose-400 rounded-full mt-1" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Day Events - Now a dedicated mobile card */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg">
            Events for {selectedDay} {MONTH_NAMES[currentDate.getMonth()]}
          </h3>
          <AnimatePresence mode="wait">
            <motion.div key={selectedDay} className="space-y-3">
              {getEventsForDate(selectedDay).length > 0 ? (
                getEventsForDate(selectedDay).map(e => (
                  <div key={e.id} className="p-4 bg-white rounded-2xl shadow-sm border border-brand-accent flex gap-4">
                    <div className="bg-brand-secondary p-3 rounded-xl self-start"><Clock className="h-5 w-5" /></div>
                    <div>
                      <p className="font-bold">{e.title}</p>
                      <p className="text-xs text-text-muted mt-1">{e.time} • {e.location}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-text-muted bg-white rounded-2xl border border-dashed">
                  No events today
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default EngagementCalendar;