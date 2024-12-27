'use client';

import { deleteCookie, getCookie, setCookie } from 'cookies-next';
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
    // Load session data from cookie on initial render
    const savedName = getCookie('name') || '';
    const savedAccessToken = getCookie('accessToken') || '';
    setName(savedName);
    setAccessToken(savedAccessToken);
  }, []);

  const setSession = async (name: string, accessToken: string) => {
    setName(name);
    setAccessToken(accessToken);

    // Save session data to cookie
    // localStorage.setItem('name', name);
    // localStorage.setItem('accessToken', accessToken);
    setCookie('name', name, {
      maxAge: 60 * 6 * 24,
    });
    setCookie('accessToken', accessToken, {
      maxAge: 60 * 6 * 24,
    });
  };

  const clearSession = () => {
    setName('');
    setAccessToken('');

    // Remove session data from cookie
    deleteCookie('name');
    deleteCookie('accessToken');
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
