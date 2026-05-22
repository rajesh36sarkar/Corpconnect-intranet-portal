import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Heart, 
  BookOpen, 
  Users, 
  Calendar, 
  MessageCircle, 
  Image as ImageIcon,
  Shield,
  LogOut,
  Sparkles
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  
  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/recognition', icon: Heart, label: 'Recognition' },
    { to: '/knowledge', icon: BookOpen, label: 'Knowledge Hub' },
    { to: '/colleagues', icon: Users, label: 'Colleagues' },
    { to: '/calendar', icon: Calendar, label: 'Calendar' },
    { to: '/forum', icon: MessageCircle, label: 'Forum' },
    { to: '/gallery', icon: ImageIcon, label: 'Gallery' },
  ];
  
  if (user?.role === 'admin') {
    navItems.push({ to: '/admin', icon: Shield, label: 'Admin' });
  }
  
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary-600" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
            CorpConnect
          </h1>
        </div>
        <p className="text-xs text-gray-500 mt-2">Welcome, {user?.name}</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary-50 text-primary-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <button onClick={logout} className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;