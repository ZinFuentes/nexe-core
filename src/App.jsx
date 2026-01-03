import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SidebarLayout from "./core/layout/SidebarLayout";
import Sidebar from "./core/layout/Sidebar";
import SidebarHeader from "./core/layout/SidebarHeader";
import SidebarNav from "./core/layout/SidebarNav";
import SidebarFooter from "./core/layout/SidebarFooter";

function Stub({ title }) {
  return (
    <div className="p-12">
      <h1 className="text-2xl font-semibold text-text-primary">{title}</h1>
      <p className="mt-3 text-text-secondary max-w-content">
        Aquí anirà el routing i les vistes dels mòduls.
      </p>
    </div>
  );
}

export default function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <SidebarLayout
      sidebar={
        <Sidebar
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed((v) => !v)}
          header={
            <SidebarHeader
              greeting="Bona tarda, Cinto"
              centreName="Escola Jacint Verdaguer"
              isCollapsed={isCollapsed}
            />
          }
          center={<SidebarNav isCollapsed={isCollapsed} />}
          footer={
            <SidebarFooter
              userName="Cinto Fuentes"
              userRole="Coordinador"
              isCollapsed={isCollapsed}
            />
          }
        />
      }
    >
      <Routes>
        <Route path="/" element={<Navigate to="/school" replace />} />
        <Route path="/school" element={<Stub title="L'escola, avui" />} />
        <Route path="/me" element={<Stub title="El meu espai" />} />
        <Route path="/knowledge" element={<Stub title="Sabers" />} />
        <Route path="/people" element={<Stub title="Persones" />} />
        <Route path="/papers" element={<Stub title="Papers" />} />
        <Route path="/management" element={<Stub title="Gestió" />} />
        <Route path="*" element={<Navigate to="/school" replace />} />
      </Routes>
    </SidebarLayout>
  );
}
