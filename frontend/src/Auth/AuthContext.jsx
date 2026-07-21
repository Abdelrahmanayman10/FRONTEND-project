import React, { createContext, useContext, useState, useEffect } from "react";
import { API_BASE_URL } from "@/api/client";

const AuthCtx = createContext(null);
const API_URL = API_BASE_URL;

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    try {
      const stored = localStorage.getItem("auth");
      return stored ? JSON.parse(stored) : { user: null, token: null };
    } catch {
      return { user: null, token: null };
    }
  });

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  // Load user profile on mount if token exists
  useEffect(() => {
    const loadProfile = async () => {
      if (auth.token && !auth.user) {
        try {
          const res = await fetch(`${API_URL}/auth/profile`, {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          if (res.ok) {
            const data = await res.json();
            setAuth({
              token: auth.token,
              user: {
                id: data._id || data.id,
                name: data.name,
                email: data.email,
                role: data.role,
                phone: data.phone,
                address: data.address,
              },
            });
          } else {
            logout();
          }
        } catch (error) {
          console.error("Failed to load user profile:", error);
          logout();
        }
      }
    };
    loadProfile();
  }, [auth.token]);

  const login = async (emailOrData, password) => {
    // Check if passed object from React Query hook or direct call
    if (typeof emailOrData === "object" && emailOrData !== null) {
      const data = emailOrData;
      const userData = {
        token: data.token || auth.token,
        user: {
          id: data._id || data.id,
          name: data.name,
          email: data.email,
          role: data.role,
          phone: data.phone,
          address: data.address,
        },
      };
      setAuth(userData);
      return userData.user;
    }

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailOrData, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to login");
    }

    const userData = {
      token: data.token,
      user: {
        id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
        phone: data.phone,
        address: data.address,
      },
    };

    setAuth(userData);
    return userData.user;
  };

  const register = async (name, email, password) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to register");
    }

    const userData = {
      token: data.token,
      user: {
        id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
        phone: data.phone,
        address: data.address,
      },
    };

    setAuth(userData);
    return userData.user;
  };

  const updateProfile = async (profileData) => {
    if (!auth.token) throw new Error("Not authenticated");

    const response = await fetch(`${API_URL}/auth/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(profileData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update profile");
    }

    const updatedData = {
      token: data.token || auth.token,
      user: {
        id: data._id || data.id,
        name: data.name,
        email: data.email,
        role: data.role,
        phone: data.phone,
        address: data.address,
      },
    };

    setAuth(updatedData);
    return updatedData.user;
  };

  const logout = () => {
    setAuth({ user: null, token: null });
  };

  return (
    <AuthCtx.Provider
      value={{ ...auth, login, register, logout, updateProfile, API_URL }}
    >
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
export const useAuthContext = useAuth;
