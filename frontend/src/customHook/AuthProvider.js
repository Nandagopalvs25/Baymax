// authContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

// Create the context
const AuthContext = createContext();

// Create a provider component
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null means we're still checking
  const [loading, setLoading] = useState(true); // To track whether the check is complete

  const logout = () => {
    // Perform logout actions
    setIsAuthenticated(false);
    console.log("User logged out.");
  };

  const login = () => {
    // Perform login actions
    setIsAuthenticated(true);
    console.log("User logged in.");
  };

  useEffect(() => {
    const userId = Cookies.get("user_id");

    if (userId) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false); // Auth check complete
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}
