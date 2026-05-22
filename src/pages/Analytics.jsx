import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Removed unused 'Calendar' import
import { 
  TrendingUp, Users, Heart, MessageCircle, 
  Award, Activity, BarChart3, PieChart, Download,
  ArrowUp, ArrowDown, Clock, Eye, UserPlus, Share2
} from 'lucide-react';
// Removed unused 'useAuth' since user isn't referenced in this view

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [analytics] = useState({
    users: { total: 156, active: 89, new: 12 },
    engagement: { recognitions: 342, posts: 89, comments: 156, likes: 423 },
    events: { total: 24, upcoming: 8, completed: 16 },
    satisfaction: { rating: 4.6, responses: 78 }
  });

  // Chart data would come from API in production
  const weeklyData = [45, 52, 48, 61, 55, 67, 72];
  const departmentData = [
    { name: 'Engineering', value: 45, color: '#C4DFDF' },
    { name: 'Sales', value: 28, color: '#D2E9E9' },
    { name: 'HR', value: 15, color: '#E3F4F4' },
    { name: 'Marketing', value: 12, color: '#F8F6F4' }
  ];

  const stats = [
    { label: 'Active Users', value: analytics.users.active, change: '+12%', icon: Users, trend: 'up' },
    { label: 'Recognitions', value: analytics.engagement.recognitions, change: '+23%', icon: Heart, trend: 'up' },
    { label: 'Forum Posts', value: analytics.engagement.posts, change: '+8%', icon: MessageCircle, trend: 'up' },
    { label: 'Engagement Rate', value: '78%', change: '+5%', icon: Activity, trend: 'up' }
  ];

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
            <TrendingUp className="h-5 w-5 text-text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-black text-text-primary tracking-tight">Analytics Dashboard</h1>
            <p className="text-xs text-text-muted">Track engagement metrics and platform performance</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <div className="flex bg-brand-secondary/30 p-1 rounded-xl" role="group" aria-label="Time range filter">
            {['day', 'week', 'month', 'year'].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                aria-pressed={timeRange === range}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize focus:outline-none focus:ring-2 focus:ring-brand-highlight ${
                  timeRange === range 
                    ? 'bg-white shadow-sm text-text-primary border border-brand-accent'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <button 
            aria-label="Download analytics report"
            className="p-2 rounded-lg border border-brand-accent hover:bg-brand-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-brand-highlight"
          >
            <Download className="h-4 w-4 text-text-muted" />
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-brand-secondary rounded-lg">
                <stat.icon className="h-5 w-5 text-text-primary" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-semibold ${
                stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {stat.trend === 'up' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                {stat.change}
              </div>
            </div>
            <div className="text-2xl font-black text-text-primary">{stat.value}</div>
            <div className="text-xs text-text-muted mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-text-primary" />
              <h3 className="font-bold text-text-primary">Weekly Activity</h3>
            </div>
            <span className="text-xs text-text-muted">Last 7 days</span>
          </div>
          <div className="flex items-end gap-2 h-48" aria-hidden="true">
            {weeklyData.map((value, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${(value / 80) * 100}%` }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  className="w-full bg-brand-highlight rounded-lg transition-all hover:bg-brand-accent"
                  style={{ height: `${(value / 80) * 100}%` }}
                />
                <span className="text-[10px] text-text-muted">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][idx]}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Department Distribution */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="h-4 w-4 text-text-primary" />
            <h3 className="font-bold text-text-primary">Department Distribution</h3>
          </div>
          <div className="space-y-3">
            {departmentData.map((dept, idx) => (
              <div key={dept.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-primary">{dept.name}</span>
                  <span className="text-text-muted">{dept.value}%</span>
                </div>
                <div className="h-2 bg-brand-secondary rounded-full overflow-hidden" aria-hidden="true">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${dept.value}%` }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: dept.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Engagement Metrics */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Top Contributors */}
        <div className="card md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Award className="h-4 w-4 text-amber-500" />
            <h3 className="font-bold text-text-primary">Top Contributors</h3>
          </div>
          <ul className="space-y-3">
            {[
              { name: 'Rajesh Sharma', contributions: 45, avatar: '👨‍💻' },
              { name: 'Priya Mehta', contributions: 38, avatar: '👩‍💼' },
              { name: 'Amit Kumar', contributions: 32, avatar: '👨‍🔧' }
            ].map((user, idx) => (
              <li key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-brand-secondary/30 transition-colors">
                <div className="text-xl" aria-hidden="true">{user.avatar}</div>
                <div className="flex-1">
                  <p className="font-medium text-text-primary text-sm">{user.name}</p>
                  <p className="text-xs text-text-muted">{user.contributions} contributions</p>
                </div>
                <div className="text-lg font-bold text-text-muted" aria-label={`Rank ${idx + 1}`}>#{idx + 1}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* Engagement Trends */}
        <div className="card md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-4 w-4 text-text-primary" />
            <h3 className="font-bold text-text-primary">Engagement Trends</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-brand-secondary/30 rounded-xl">
              <Heart className="h-5 w-5 text-rose-500 mx-auto mb-1" />
              <div className="text-xl font-black text-text-primary">{analytics.engagement.likes}</div>
              <div className="text-[10px] text-text-muted">Total Likes</div>
            </div>
            <div className="text-center p-3 bg-brand-secondary/30 rounded-xl">
              <MessageCircle className="h-5 w-5 text-blue-500 mx-auto mb-1" />
              <div className="text-xl font-black text-text-primary">{analytics.engagement.comments}</div>
              <div className="text-[10px] text-text-muted">Comments</div>
            </div>
            <div className="text-center p-3 bg-brand-secondary/30 rounded-xl">
              <Share2 className="h-5 w-5 text-emerald-500 mx-auto mb-1" />
              <div className="text-xl font-black text-text-primary">234</div>
              <div className="text-[10px] text-text-muted">Shares</div>
            </div>
            <div className="text-center p-3 bg-brand-secondary/30 rounded-xl">
              <Eye className="h-5 w-5 text-purple-500 mx-auto mb-1" />
              <div className="text-xl font-black text-text-primary">2.4k</div>
              <div className="text-[10px] text-text-muted">Views</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity Feed */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-text-primary" />
            <h3 className="font-bold text-text-primary">Recent Activity</h3>
          </div>
          <button className="text-xs font-medium text-brand-highlight hover:text-brand-accent transition-colors focus:outline-none focus:underline">
            View All &rarr;
          </button>
        </div>
        <ul className="space-y-3">
          {[
            { action: 'New user joined', user: 'Sarah Johnson', time: '2 min ago', icon: UserPlus },
            { action: 'Posted in Forum', user: 'Mike Chen', time: '15 min ago', icon: MessageCircle },
            { action: 'Received appreciation', user: 'Ananya Desai', time: '1 hour ago', icon: Heart },
            { action: 'New department update', user: 'HR Team', time: '3 hours ago', icon: TrendingUp }
          ].map((activity, idx) => (
            <li key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-brand-secondary/30 transition-colors">
              <div className="p-1.5 bg-brand-secondary rounded-lg">
                <activity.icon className="h-4 w-4 text-text-muted" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-text-primary">{activity.action}</p>
                <p className="text-xs text-text-muted">by {activity.user}</p>
              </div>
              <div className="text-xs text-text-muted">{activity.time}</div>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default Analytics;