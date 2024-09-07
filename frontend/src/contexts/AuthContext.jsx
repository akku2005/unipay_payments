import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = (token) => {
    if (token) {
      localStorage.setItem("authToken", token);
      setIsAuthenticated(true);
    } else {
      console.error("No token received, cannot login.");
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
