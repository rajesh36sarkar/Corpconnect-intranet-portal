import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

const MOCK_USERS = [
  { email: 'employee@demo.com', password: 'emp123', role: 'employee', name: 'John Doe', department: 'Engineering', id: 'emp_001', avatar: '👨‍💻' },
  { email: 'admin@demo.com', password: 'admin123', role: 'admin', name: 'Sarah Admin', department: 'HR', id: 'admin_001', avatar: '👩‍💼' }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('corpconnect_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('corpconnect_user', JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    }
    return { success: false, error: 'Invalid credentials. Use employee@demo.com/emp123 or admin@demo.com/admin123' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('corpconnect_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);