'use client';

import { useState, useEffect } from 'react';
import { User } from '@/lib/types';
import { loginUser, signupUser, checkSession } from '@/lib/api/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    try {
      const { user } = await loginUser(email, password);
      setUser(user);
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      const { user } = await signupUser(email, password, name);
      setUser(user);
      return user;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { user } = await checkSession();
        setUser(user);
      } catch (error) {
        // Handle error silently as user might not be logged in
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  return { user, loading, login, signup, logout };
};