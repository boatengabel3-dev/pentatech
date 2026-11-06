import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '../types';
import { initialAdminUser } from './initialData';

interface AuthContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  login: (email: string, pass: string) => boolean;
  loginWithPasscode: (passcode: string) => boolean;
  logout: () => void;
  updateProfile: (updates: Partial<AdminUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('pentatech_admin_auth') === 'true';
  });

  const [user, setUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('pentatech_admin_user');
    return saved ? JSON.parse(saved) : initialAdminUser;
  });

  useEffect(() => {
    localStorage.setItem('pentatech_admin_auth', String(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('pentatech_admin_user', JSON.stringify(user));
    }
  }, [user]);

  const login = (email: string, pass: string): boolean => {
    // For presentation and frontend CMS testing: accept admin email or demo credentials
    if (email.trim() && pass.trim()) {
      setIsAuthenticated(true);
      setUser({
        ...initialAdminUser,
        email: email.trim(),
        lastLogin: 'Just now',
      });
      return true;
    }
    return false;
  };

  const loginWithPasscode = (passcode: string): boolean => {
    if (passcode.trim() === '12341234') {
      setIsAuthenticated(true);
      setUser({
        ...initialAdminUser,
        email: 'admin@pentatech.org',
        lastLogin: 'Just now',
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('pentatech_admin_auth');
  };

  const updateProfile = (updates: Partial<AdminUser>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, loginWithPasscode, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
