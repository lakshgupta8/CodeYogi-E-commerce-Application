import { useState, useEffect, useCallback, useMemo, type FC, type ReactNode } from "react";
import { UserContext } from "./UserContext";
import { getAuthUser } from "../api";
import { type User } from "../types";

const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (token) {
      getAuthUser(token)
        .then((response) => {
          setUser(response.user || null);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
          setLoading(false);
        });
    } else {
      Promise.resolve().then(() => {
        setUser(null);
        setLoading(false);
      });
    }
  }, [token]);

  const login = useCallback((user: User | null, token: string | null) => {
    localStorage.setItem("token", token || "");
    setToken(token || "");
    setLoading(true);
    setUser(user);
    setLoading(false);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, token, isLoggedIn: !!token, loading, login, logout }),
    [user, token, loading, login, logout]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
