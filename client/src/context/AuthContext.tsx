import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  authLogin,
  authLogout,
  authMe,
  authRegister,
  type ApiUser,
} from "../api/auth";

export type User = ApiUser;

type AuthResult = { ok: true } | { ok: false; message: string };

type AuthContextValue = {
  user: User | null;
  /** False until the first `/api/auth/me` request finishes. */
  ready: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (name: string, email: string, password: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const u = await authMe();
        if (!cancelled) setUser(u);
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    try {
      const u = await authLogin({ email, password });
      setUser(u);
      return { ok: true };
    } catch (e) {
      const message = e instanceof Error ? e.message : "Could not sign in.";
      return { ok: false, message };
    }
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string): Promise<AuthResult> => {
      try {
        const u = await authRegister({ name, email, password });
        setUser(u);
        return { ok: true };
      } catch (e) {
        const message = e instanceof Error ? e.message : "Could not register.";
        return { ok: false, message };
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      await authLogout();
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({ user, ready, login, register, logout }),
    [user, ready, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
