'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface SessionContextType {
  name: string;
  accessToken: string;
  setSession: (name: string, accessToken: string) => void; // eslint-disable-line no-unused-vars
  clearSession: () => void;
}

const SessionContext = createContext<SessionContextType | null>(null);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [name, setName] = useState('');
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    // Load session data from localStorage on initial render
    const savedName = localStorage.getItem('name') || '';
    const savedAccessToken = localStorage.getItem('accessToken') || '';
    setName(savedName);
    setAccessToken(savedAccessToken);
  }, []);

  const setSession = (name: string, accessToken: string) => {
    setName(name);
    setAccessToken(accessToken);

    // Save session data to localStorage
    localStorage.setItem('name', name);
    localStorage.setItem('accessToken', accessToken);
  };

  const clearSession = () => {
    setName('');
    setAccessToken('');

    // Remove session data from localStorage
    localStorage.removeItem('name');
    localStorage.removeItem('accessToken');
  };

  return (
    <SessionContext.Provider
      value={{ name, accessToken, setSession, clearSession }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
