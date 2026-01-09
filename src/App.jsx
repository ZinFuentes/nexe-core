import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./core/auth/AuthContext";
import BootstrapAuth from "./core/auth/BootstrapAuth";

import SidebarLayout from "./core/layout/SidebarLayout";
import Sidebar from "./core/layout/Sidebar";
import SidebarHeader from "./core/layout/SidebarHeader";
import SidebarNav from "./core/layout/SidebarNav";
import SidebarFooter from "./core/layout/SidebarFooter";

const PlaceholderView = ({ title, color }) => (
  <div className="p-12 animate-in fade-in duration-500">
    <h1 className="text-3xl font-bold mb-4" style={{ color }}>
      {title}
    </h1>
    <div className="p-6 border border-border rounded-lg bg-white shadow-sm">
      <p className="text-text-secondary">
        Módulo <strong>{title}</strong> activo.
      </p>
    </div>
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <BootstrapAuth>
        <BrowserRouter>
          <SidebarLayout
            sidebar={
              <Sidebar
                header={
                  <SidebarHeader
                    greeting="Bona tarda!"
                    centreName="Escola Jacint Verdaguer"
                  />
                }
                center={<SidebarNav />}
                footer={<SidebarFooter />}
              />
            }
          >
            <Routes>
              <Route path="/" element={<Navigate to="/school" replace />} />
              <Route
                path="/school"
                element={<PlaceholderView title="L'escola, avui" color="#4F46E5" />}
              />
              <Route
                path="/me"
                element={<PlaceholderView title="El meu espai" color="#7C3AED" />}
              />
              <Route
                path="/knowledge"
                element={<PlaceholderView title="Sabers" color="#0EA5E9" />}
              />
              <Route
                path="/people"
                element={<PlaceholderView title="Persones" color="#10B981" />}
              />
              <Route
                path="/papers"
                element={<PlaceholderView title="Papers" color="#F59E0B" />}
              />
              <Route
                path="/management"
                element={<PlaceholderView title="Gestió" color="#8B5CF6" />}
              />
            </Routes>
          </SidebarLayout>
        </BrowserRouter>
      </BootstrapAuth>
    </AuthProvider>
  );
}
