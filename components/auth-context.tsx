"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface User {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
}

type AuthModalTab = "login" | "signup";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (payload: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  showAuthModal: boolean;
  setShowAuthModal: (v: boolean) => void;
  authModalTab: AuthModalTab;
  setAuthModalTab: (t: AuthModalTab) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<AuthModalTab>("login");

  // Hydrate from localStorage on client
  useEffect(() => {
    if (typeof window === "undefined") return;
    const sUser = localStorage.getItem("bloom-user");
    const sToken = localStorage.getItem("bloom-token");
    if (sUser) setUser(JSON.parse(sUser));
    if (sToken) setToken(sToken);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: "Login failed" }));
      throw new Error(err.error || "Login failed");
    }

    const data = await res.json(); // expect { user, token }
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("bloom-user", JSON.stringify(data.user));
    localStorage.setItem("bloom-token", data.token);
    setShowAuthModal(false);
  };

  const signup = async (payload: { name: string; email: string; password: string }) => {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: "Signup failed" }));
      throw new Error(err.error || "Signup failed");
    }

    const data = await res.json(); // expect { user, token }
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("bloom-user", JSON.stringify(data.user));
    localStorage.setItem("bloom-token", data.token);
    setShowAuthModal(false);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("bloom-user");
    localStorage.removeItem("bloom-token");
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token,
    login,
    signup,
    logout,
    showAuthModal,
    setShowAuthModal,
    authModalTab,
    setAuthModalTab,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
