import { useEffect } from "react";
import { useAuth } from "./AuthContext";

/* global google */

export default function BootstrapAuth({ children }) {
  const { setStatus, setUser, setMessage, status } = useAuth();

  useEffect(() => {
    setStatus("LOADING");

    google.script.run
      .withSuccessHandler((res) => {
        if (!res || !res.authorized) {
          setMessage(res?.message || "Accés bloquejat.");
          setStatus("BLOCKED");
          return;
        }

        setUser(res);
        setStatus("AUTHORIZED");
      })
      .withFailureHandler(() => {
        setMessage("Error de comunicació amb el servidor.");
        setStatus("BLOCKED");
      })
      .validateUserAccess();
  }, [setStatus, setUser, setMessage]);

  if (status === "LOADING") {
    return <div className="p-6">Comprovant accés…</div>;
  }

  if (status === "BLOCKED") {
    return (
      <div className="p-6 text-red-600">
        <h2 className="text-xl font-bold">Accés bloquejat</h2>
        <p className="mt-2">{message}</p>
        <p className="mt-4 text-sm text-gray-600">
          Inicia sessió amb el teu compte XTEC del centre.
        </p>
      </div>
    );
  }

  return children;
}
