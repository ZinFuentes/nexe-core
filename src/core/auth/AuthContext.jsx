import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [status, setStatus] = useState("LOADING"); 
  // LOADING | AUTHORIZED | BLOCKED

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const value = {
    status,
    setStatus,
    user,
    setUser,
    message,
    setMessage,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
