import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Auth Imports
import { AuthProvider, useAuth } from './core/auth/AuthContext';
import LoginPage from './core/auth/LoginPage';

// Layout Imports
import SidebarLayout from "./core/layout/SidebarLayout";
import Sidebar from "./core/layout/Sidebar";
import SidebarHeader from "./core/layout/SidebarHeader";
import SidebarNav from "./core/layout/SidebarNav";
import SidebarFooter from "./core/layout/SidebarFooter";

// Componentes Placeholder
const PlaceholderView = ({ title, color }) => (
  <div className="p-12 animate-in fade-in duration-500">
    <h1 className="text-3xl font-bold mb-4" style={{ color }}>{title}</h1>
    <div className="p-6 border border-border rounded-lg bg-white shadow-sm">
      <p className="text-text-secondary">Módulo <strong>{title}</strong> activo.</p>
    </div>
  </div>
);

/**
 * COMPONENTE GUARDIÁN
 */
function AppRoutes() {
  // 1. AQUI FALTABA "logout"
  const { user, loading, logout } = useAuth(); 

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-gray-500 animate-pulse">Carregant NEXE Core...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <SidebarLayout
      sidebar={
        <Sidebar
          header={<SidebarHeader greeting={`Hola, ${user.name}!`} centreName="Escola Jacint Verdaguer" />}
          center={<SidebarNav />}
          footer={
            <SidebarFooter 
              userName={`${user.name} ${user.surname}`} 
              userRole={user.role} 
              userPicture={user.picture}
              // 2. AQUI FALTABA PASAR LA FUNCIÓN
              onLogout={logout} 
            />
          }
        />
      }
    >
      <Routes>
        <Route path="/" element={<Navigate to="/school" replace />} />
        <Route path="/school" element={<PlaceholderView title="L'escola, avui" color="#4F46E5" />} />
        <Route path="/me" element={<PlaceholderView title="El meu espai" color="#7C3AED" />} />
        <Route path="/knowledge" element={<PlaceholderView title="Sabers" color="#0EA5E9" />} />
        <Route path="/people" element={<PlaceholderView title="Persones" color="#10B981" />} />
        <Route path="/papers" element={<PlaceholderView title="Papers" color="#F59E0B" />} />
        <Route path="/management" element={<PlaceholderView title="Gestió" color="#8B5CF6" />} />
      </Routes>
    </SidebarLayout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}