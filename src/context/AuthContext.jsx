import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const AuthContext = createContext();

// Demo user profiles with enhanced corporate metadata
const MOCK_USERS = [
  { 
    id: 'emp_001', 
    email: 'employee@demo.com', 
    password: 'emp123', 
    role: 'employee', 
    name: 'Rajesh Sharma', 
    department: 'Engineering', 
    avatar: '👨‍💻',
    joinDate: 'Jan 2023',
    location: 'Mumbai, India',
    phone: '+91 98765 43210',
    about: 'Full-stack developer passionate about building great products.'
  },
  { 
    id: 'admin_001', 
    email: 'admin@demo.com', 
    password: 'admin123', 
    role: 'admin', 
    name: 'Priya Mehta', 
    department: 'Human Resources', 
    avatar: '👩‍💼',
    joinDate: 'Mar 2022',
    location: 'Bangalore, India',
    phone: '+91 98765 12345',
    about: 'HR professional focused on employee engagement and culture.'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Extracted session checking logic so it can be reused by the storage listener
  const checkSession = useCallback(() => {
    const storedUser = localStorage.getItem('corpconnect_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('corpconnect_user');
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    // Initial load
    checkSession();
    
    // Simulate initial loading time for smooth UI transitions
    const timer = setTimeout(() => setLoading(false), 300);

    // Sync auth state across multiple browser tabs
    const handleStorageChange = (e) => {
      if (e.key === 'corpconnect_user') {
        checkSession();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [checkSession]);

  // Converted to async to mimic a real API call
  const login = async (email, password) => {
    // Simulate network delay (e.g., 600ms)
    await new Promise(resolve => setTimeout(resolve, 600));

    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      // Remove password before storing
      const { password: _, ...userPayload } = foundUser;
      
      setUser(userPayload);
      localStorage.setItem('corpconnect_user', JSON.stringify(userPayload));
      return { success: true, user: userPayload };
    }
    
    return { 
      success: false, 
      error: 'Invalid email or password. Please try again.' 
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('corpconnect_user');
  };

  // Added method to handle profile updates during an active session
  const updateProfile = (updates) => {
    if (!user) return false;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('corpconnect_user', JSON.stringify(updatedUser));
    return true;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout,
      updateProfile,
      loading, 
      isAdmin: user?.role === 'admin',
      isEmployee: user?.role === 'employee'
    }}>
      {/* Prevent rendering child routes until auth state is confirmed */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};