import React, { createContext, useContext, useState, useCallback } from 'react';











const RoleContext = createContext(undefined);

export function RoleProvider({ children }) {
  const [currentRole, setCurrentRole] = useState('ai');

  const setRole = useCallback((role) => {
    setCurrentRole(role);
  }, []);

  const toggleRole = useCallback(() => {
    setCurrentRole((prev) => prev === 'ai' ? 'zoho' : 'ai');
  }, []);

  const value = {
    currentRole,
    setRole,
    toggleRole,
    isAI: currentRole === 'ai',
    isZoho: currentRole === 'zoho'
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>);

}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}