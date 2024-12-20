'use client';

import React, { createContext, useContext, useState } from 'react';

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

  const setSession = (name: string, accessToken: string) => {
    setName(name);
    setAccessToken(accessToken);
  };

  const clearSession = () => {
    setName('');
    setAccessToken('');
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
