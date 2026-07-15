import React, { createContext, useContext, useState, useEffect } from "react";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    try { return JSON.parse(localStorage.getItem("auth")) || { user:null }; }
    catch { return { user:null }; }
  });

  useEffect(() => localStorage.setItem("auth", JSON.stringify(auth)), [auth]);

  const login = async (email, password) => {
  
    const role = email.toLowerCase().includes("admin") ? "admin" : "user";
    const user = { id: 1, name: role === "admin" ? "Admin" : "User", email, role };
    setAuth({ user });
    return user;
  };

  const logout = () => setAuth({ user:null });

  return (
    <AuthCtx.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
