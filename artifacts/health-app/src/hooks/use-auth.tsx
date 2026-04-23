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
const USER_CACHE_KEY = "bodylogic-user";

function readCachedUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(USER_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" && typeof parsed.id === "number" ? parsed as AuthUser : null;
  } catch {
    return null;
  }
}

function writeCachedUser(user: AuthUser | null) {
  try {
    if (user) localStorage.setItem(USER_CACHE_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_CACHE_KEY);
  } catch {}
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const cached = typeof window !== "undefined" ? readCachedUser() : null;
  const [user, setUser] = useState<AuthUser | null>(cached);
  const [loading, setLoading] = useState(!cached);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    fetch(apiPath("/api/auth/me"), {
      credentials: "include",
      signal: controller.signal,
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (!active) return;
        if (data) {
          setUser(data);
          writeCachedUser(data);
        } else {
          setUser(null);
          writeCachedUser(null);
        }
      })
      .catch(error => {
        if (active && error?.name !== "AbortError") {
          // keep cached user on network error so the app stays usable offline
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
    writeCachedUser(userData);
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch(apiPath("/api/auth/logout"), { method: "POST", credentials: "include" });
    } catch {}
    setUser(null);
    writeCachedUser(null);
  }, []);

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
