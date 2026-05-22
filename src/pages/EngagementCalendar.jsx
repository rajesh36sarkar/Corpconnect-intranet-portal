import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Sparkles, MapPin, Clock, Radio, Activity, Filter, Bell, Star } from 'lucide-react';
import { calendarEvents } from '../data/mockData';

const EngagementCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [events, setEvents] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('calendarEvents');
    setEvents(stored ? JSON.parse(stored) : calendarEvents);
  }, []);

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  const getEventsForDate = (day) => {
    if (!day) return [];
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    let filtered = events.filter(e => e.date === dateStr);
    if (filterType !== 'all') filtered = filtered.filter(e => e.type === filterType);
    return filtered;
  };

  const getEventStyle = (type) => {
    switch(type) {
      case 'company': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', light: 'bg-emerald-100' };
      case 'social': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', light: 'bg-amber-100' };
      case 'hr': return { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700', light: 'bg-rose-100' };
      case 'learning': return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', light: 'bg-blue-100' };
      default: return { bg: 'bg-brand-secondary', border: 'border-brand-accent', text: 'text-text-secondary', light: 'bg-brand-highlight' };
    }
  };

  const activeDayEvents = selectedDay ? getEventsForDate(selectedDay) : [];
  const isToday = (day) => day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();

  return (
    <div className="space-y-5 md:space-y-6 pb-12">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-brand-accent pb-5">
        <div className="flex items-center gap-3"><div className="p-2.5 bg-brand-secondary rounded-xl border border-brand-accent"><CalendarIcon className="h-5 w-5 text-text-primary" /></div>
        <div><h1 className="text-xl font-black text-text-primary tracking-tight">Company Calendar</h1><p className="text-xs text-text-muted">Stay updated on events, meetings, and important dates</p></div></div>
        <div className="flex items-center gap-2"><button onClick={() => setShowFilters(!showFilters)} className={`p-2 rounded-lg border transition-colors ${showFilters ? 'bg-brand-highlight border-brand-accent' : 'border-brand-accent hover:bg-brand-secondary'}`}><Filter className="h-4 w-4 text-text-muted" /></button>
        <button className="p-2 rounded-lg border border-brand-accent hover:bg-brand-secondary transition-colors"><Bell className="h-4 w-4 text-text-muted" /></button></div>
      </motion.div>

      <AnimatePresence>{showFilters && (<motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden"><div className="flex flex-wrap gap-2 p-4 bg-brand-secondary/30 rounded-xl border border-brand-accent">
        {['all', 'company', 'social', 'hr', 'learning'].map(type => (<button key={type} onClick={() => setFilterType(type)} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all capitalize ${filterType === type ? 'bg-brand-highlight text-text-primary border border-brand-accent' : 'bg-white border border-brand-accent text-text-muted hover:bg-brand-secondary'}`}>{type === 'all' ? 'All Events' : type}</button>))}
      </div></motion.div>)}</AnimatePresence>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between bg-white rounded-xl p-3 border border-brand-accent">
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))} className="p-2 rounded-lg hover:bg-brand-secondary transition-colors"><ChevronLeft className="h-5 w-5 text-text-muted" /></button>
        <div className="text-center"><h2 className="text-xl md:text-2xl font-black text-text-primary">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2><p className="text-xs text-text-muted mt-0.5">{daysInMonth} days • {activeDayEvents.length} events</p></div>
        <div className="flex gap-1"><button onClick={() => setCurrentDate(new Date())} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-secondary hover:bg-brand-accent transition-colors text-text-primary">Today</button>
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} className="p-2 rounded-lg hover:bg-brand-secondary transition-colors"><ChevronRight className="h-5 w-5 text-text-muted" /></button></div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
        <div className="lg:col-span-2 card p-4 md:p-5">
          <div className="grid grid-cols-7 gap-1 mb-3">{weekDays.map(day => (<div key={day} className="text-center text-[9px] md:text-[10px] font-black text-text-muted uppercase tracking-wider py-2">{day}</div>))}</div>
          <div className="grid grid-cols-7 gap-1 md:gap-1.5">
            {days.map((day, idx) => {
              const events = getEventsForDate(day);
              const isSelected = day === selectedDay;
              const today = isToday(day);
              return (<motion.div key={idx} whileHover={day ? { scale: 1.02, y: -2 } : {}} onClick={() => day && setSelectedDay(day)} className={`min-h-[70px] md:min-h-[100px] p-1 md:p-2 rounded-xl cursor-pointer transition-all duration-200 ${day ? 'hover:shadow-md hover:border-brand-highlight' : 'cursor-default'} ${isSelected ? 'bg-brand-highlight/30 border-2 border-brand-highlight shadow-md' : 'border border-brand-accent bg-white'} ${today && !isSelected ? 'border-2 border-brand-highlight bg-brand-highlight/10' : ''}`}>
                {day && (<><div className="flex justify-between items-start mb-1 md:mb-2"><span className={`text-xs md:text-sm font-bold h-5 w-5 md:h-7 md:w-7 rounded-full flex items-center justify-center transition-all ${isSelected ? 'bg-brand-highlight text-text-primary scale-110' : today ? 'bg-brand-highlight text-text-primary' : 'text-text-primary hover:bg-brand-secondary'}`}>{day}</span>{events.length > 0 && <span className="text-[8px] md:text-[9px] font-bold px-1 py-0.5 rounded-full bg-rose-100 text-rose-600">{events.length}</span>}</div>
                <div className="space-y-0.5 md:space-y-1">{events.slice(0, 2).map(event => { const style = getEventStyle(event.type); return (<div key={event.id} className={`text-[7px] md:text-[9px] font-medium truncate px-1 py-0.5 rounded ${style.bg} ${style.text} border ${style.border}`} title={event.title}>{event.title.length > 15 ? event.title.slice(0, 12) + '...' : event.title}</div>);})}{events.length > 2 && <div className="text-[7px] md:text-[9px] font-semibold text-text-muted text-center">+{events.length - 2} more</div>}</div></>)}
              </motion.div>);
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="card"><div className="flex items-center justify-between mb-4 pb-2 border-b border-brand-accent"><div className="flex items-center gap-2"><Radio className="h-4 w-4 text-text-primary animate-pulse" /><h3 className="font-bold text-text-primary text-sm">{selectedDay ? `${monthNames[currentDate.getMonth()]} ${selectedDay}, ${currentDate.getFullYear()}` : 'Select a Date'}</h3></div>{selectedDay && activeDayEvents.length > 0 && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-highlight text-text-primary">{activeDayEvents.length} events</span>}</div>
            <AnimatePresence mode="wait">{selectedDay ? (<motion.div key={selectedDay} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-1">
              {activeDayEvents.length > 0 ? activeDayEvents.map((event, idx) => { const style = getEventStyle(event.type); return (<motion.div key={event.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} className="p-3 rounded-xl bg-brand-secondary/30 border border-brand-accent hover:border-brand-highlight transition-all cursor-pointer">
                <div className="flex items-start justify-between gap-2 mb-2"><h4 className="font-bold text-text-primary text-sm">{event.title}</h4><span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${style.bg} ${style.text} border ${style.border} capitalize`}>{event.type}</span></div>
                <div className="space-y-1.5 text-xs text-text-muted"><div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" /><span>{event.time || '10:00 AM - 11:00 AM'}</span></div><div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /><span>{event.location || 'Conference Room / Virtual'}</span></div></div>
              </motion.div>);}) : (<div className="text-center py-8 text-text-muted text-sm">No events scheduled for this day.</div>)}
            </motion.div>) : (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-8 text-text-muted text-sm">Click on any date to view events</motion.div>)}</AnimatePresence>
          </div>

          <div className="card"><div className="flex items-center gap-2 mb-3"><Star className="h-4 w-4 text-amber-500" /><h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">Upcoming Highlights</h3></div>
            <div className="space-y-3">{events.slice(0, 5).map((event, idx) => { const style = getEventStyle(event.type); return (<motion.div key={event.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} className="flex items-start gap-3 p-2 rounded-lg hover:bg-brand-secondary/30 transition-all cursor-pointer group">
              <div className="min-w-[45px] text-center"><div className="text-xs font-black text-text-primary">{new Date(event.date).toLocaleDateString(undefined, { month: 'short' })}</div><div className="text-lg font-black text-text-primary leading-tight">{new Date(event.date).getDate()}</div></div>
              <div className="flex-1 min-w-0"><p className="font-medium text-sm text-text-primary truncate group-hover:text-brand-highlight transition-colors">{event.title}</p><div className="flex items-center gap-2 mt-0.5"><Clock className="h-3 w-3 text-text-muted" /><span className="text-xs text-text-muted">{event.time || 'TBD'}</span></div></div>
              <div className={`w-2 h-2 rounded-full ${style.light}`} /></motion.div>);})}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementCalendar;