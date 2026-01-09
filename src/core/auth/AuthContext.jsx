import { createContext, useContext, useMemo, useCallback, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [status, setStatus] = useState("LOADING"); // LOADING | AUTHORIZED | BLOCKED
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const setLoading = useCallback(() => {
    setStatus("LOADING");
    setUser(null);
    setMessage("");
  }, []);

  const setAuthorized = useCallback((u = {}) => {
    setUser({ role: "DOCENT", ...u });
    setStatus("AUTHORIZED");
    setMessage("");
  }, []);

  const setBlocked = useCallback((msg = "Accés denegat") => {
    setUser(null);
    setStatus("BLOCKED");
    setMessage(msg);
  }, []);

  const value = useMemo(
    () => ({
      status,
      user,
      message,
      setLoading,
      setAuthorized,
      setBlocked,

      // setters crus (si els vols mantenir)
      setStatus,
      setUser,
      setMessage,
    }),
    [status, user, message, setLoading, setAuthorized, setBlocked]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
