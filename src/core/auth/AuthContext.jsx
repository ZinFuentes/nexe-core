import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Creamos el contexto
const AuthContext = createContext(null);

// 2. Hook personalizado para usar el contexto en cualquier componente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

// 3. El Proveedor que envuelve la App
export const AuthProvider = ({ children }) => {
  // Estado del usuario (null = no logueado)
  const [user, setUser] = useState(null);
  // Estado de carga inicial (para verificar si ya había sesión guardada)
  const [loading, setLoading] = useState(true);

  // Al cargar la página, miramos si ya había sesión guardada en el navegador
  useEffect(() => {
    const initAuth = () => {
      try {
        const storedUser = localStorage.getItem('nexe_user');
        if (storedUser) {
          // Si hay datos guardados, los recuperamos
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error recuperando sesión:", error);
        localStorage.removeItem('nexe_user');
      } finally {
        // Terminamos la carga inicial
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Función LOGIN: Guarda usuario en Estado y en LocalStorage
  // Esta función es llamada desde LoginPage.jsx cuando Google y el Backend dan el OK
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('nexe_user', JSON.stringify(userData));
  };

  // Función LOGOUT: Borra todo y te echa fuera
  const logout = () => {
    setUser(null);
    localStorage.removeItem('nexe_user');
    // Opcional: recargar la página para limpiar caché
    // window.location.reload(); 
  };

  // Valores que exportamos a toda la app
  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;