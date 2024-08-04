import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Create a Context for the authentication state
const AuthContext = createContext();

// Provide the authentication state to the rest of the app
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const sessionTimeout = 60 * 60 * 1000; // 60 minutes === 1 hour

  useEffect(() => {
    let timer;

    if (isAuthenticated) {
      // Set a timer to log out the user after sessionTimeout
      timer = setTimeout(() => {
        toast.error('Session expired.');
        setIsAuthenticated(false);
        navigate('/login');
      }, sessionTimeout);
    }

    // Clear the timer if the user logs out or component unmounts
    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate]);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the authentication context
export function useAuth() {
  return useContext(AuthContext);
}
