'use client';

import { useState, useEffect, useCallback } from 'react';
import { account, ID, models } from '@/lib/appwrite';

export interface User {
  $id: string;
  email: string;
  name: string;
  $createdAt: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const currentUser = await account.get();
      setUser(currentUser as User);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email: string, password: string) => {
    await account.createEmailPasswordSession({ email, password });
    const currentUser = await account.get();
    setUser(currentUser as User);
    return currentUser;
  };

  const register = async (email: string, password: string, name: string) => {
    await account.create({
      userId: ID.unique(),
      email,
      password,
      name,
    });
    return login(email, password);
  };

  const logout = async () => {
    await account.deleteSession({ sessionId: 'current' });
    setUser(null);
  };

  const updateName = async (name: string) => {
    await account.updateName({ name });
    setUser((prev) => (prev ? { ...prev, name } : null));
  };

  const updateEmail = async (email: string, password: string) => {
    await account.updateEmail({ email, password });
    setUser((prev) => (prev ? { ...prev, email } : null));
  };

  const updatePassword = async (newPassword: string, oldPassword: string) => {
    await account.updatePassword({ newPassword, oldPassword });
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    updateName,
    updateEmail,
    updatePassword,
    checkAuth,
  };
}
