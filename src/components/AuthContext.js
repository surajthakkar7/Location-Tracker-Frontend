import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // Add currentUser state

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn , currentUser, setCurrentUser}}>
      {children}
    </AuthContext.Provider>
  );
};
