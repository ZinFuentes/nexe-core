import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

export default function BootstrapAuth() {
  const { login, logout } = useAuth();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!window.google?.script?.run) {
      setError("No estàs dins una WebApp de Google Apps Script.");
      return;
    }

    window.google.script.run
      .withSuccessHandler((res) => {
        if (res?.authorized) login(res);
        else {
          logout();
          setError(res?.message || "Accés no autoritzat.");
        }
      })
      .withFailureHandler((err) => {
        logout();
        setError(err?.message || String(err));
      })
      .validateUserAccess();
  }, [login, logout]);

  return (
    <div style={{ padding: 32 }}>
      {!error ? "Verificant accés..." : `Error: ${error}`}
    </div>
  );
}
