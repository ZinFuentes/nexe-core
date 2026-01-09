import { useEffect } from "react";
import { useAuth } from "./AuthContext";


function isGAS() {
  return (
    typeof window !== "undefined" &&
    !!window.google &&
    !!window.google.script &&
    !!window.google.script.run
  );
}

export default function BootstrapAuth({ children }) {
  const { setLoading, setAuthorized, setBlocked } = useAuth();

  useEffect(() => {
    // DEV local
    const bypass =
      import.meta.env.DEV &&
      (import.meta.env.VITE_AUTH_BYPASS === "true" ||
        import.meta.env.VITE_AUTH_BYPASS === undefined);

    if (!isGAS()) {
      if (bypass) {
        setAuthorized({ email: "dev@local", role: "ADMIN", displayName: "Local Dev" });
      } else {
        setBlocked("Entorn local sense GAS. Activa VITE_AUTH_BYPASS=true.");
      }
      return;
    }

    setLoading();

    window.google.script.run
      .withSuccessHandler((res) => {
        if (res?.ok) setAuthorized(res.user || {});
        else setBlocked(res?.message || "Accés denegat");
      })
      .withFailureHandler((err) => {
        setBlocked(err?.message || String(err));
      })
      .validateUserAccess();
  }, [setLoading, setAuthorized, setBlocked]);

  return children;
}
