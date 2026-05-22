import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Heart, Users, User, Shield, Sparkles } from 'lucide-react';

const MobileNav = () => {
  const { user } = useAuth();
  
  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Home' },
    { to: '/recognition', icon: Heart, label: 'Celebrate' },
    { to: '/colleagues', icon: Users, label: 'Team' },
  ];
  
  if (user?.role === 'admin') {
    navItems.push({ to: '/admin', icon: Shield, label: 'Admin' });
  }
  
  navItems.push({ to: '/knowledge', icon: User, label: 'Hub' });
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive ? 'text-primary-600' : 'text-gray-500'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;