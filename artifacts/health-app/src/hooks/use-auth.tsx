import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  age?: number | null;
  gender?: string | null;
  weight?: number | null;
  height?: number | null;
  goal?: string | null;
  activityLevel?: string | null;
};

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  login: (user: AuthUser) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: async () => {},
});

const BASE_URL = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
const apiPath = (path: string) => `${BASE_URL}${path}`;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    fetch(apiPath("/api/auth/me"), {
      credentials: "include",
      signal: controller.signal,
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (active && data) setUser(data); })
      .catch(error => {
        if (active && error?.name !== "AbortError") {
          setUser(null);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  const login = useCallback((userData: AuthUser) => {
    setUser(userData);
  }, []);

  const logout = useCallback(async () => {
    await fetch(apiPath("/api/auth/logout"), { method: "POST", credentials: "include" });
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
