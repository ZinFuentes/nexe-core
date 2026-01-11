import { AuthProvider, useAuth } from "./core/auth/AuthContext";
import BootstrapAuth from "./core/auth/BootstrapAuth";

import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import SidebarLayout from "./core/layout/SidebarLayout";
import Sidebar from "./core/layout/Sidebar";
import SidebarHeader from "./core/layout/SidebarHeader";
import SidebarNav from "./core/layout/SidebarNav";
import SidebarFooter from "./core/layout/SidebarFooter";

import ManagementView from "./views/ManagementView";
import SchoolView from "./views/SchoolView";
import MeView from "./views/MeView";
import PeopleView from "./views/PeopleView";
import PapersView from "./views/PapersView";
import KnowledgeView from "./views/KnowledgeView";

function RoleRouter() {
  const { status, user, message } = useAuth();

  if (status === "LOADING") return <div>Carregant…</div>;
  if (status === "BLOCKED") return <div>{message || "Accés denegat"}</div>;

  const role = user?.role || "DOCENT";

  return (
    <SidebarLayout
      sidebar={
        <Sidebar
          header={<SidebarHeader />}
          center={<SidebarNav />}
          footer={<SidebarFooter />}
        />
      }
    >
      <Routes>
        <Route path="/" element={<Navigate to="/school" replace />} />

        <Route path="/school" element={<SchoolView />} />
        <Route path="/me" element={<MeView />} />
        <Route path="/knowledge" element={<KnowledgeView />} />
        <Route path="/people" element={<PeopleView />} />
        <Route path="/papers" element={<PapersView />} />

        {/* Protegido por rol */}
        <Route
          path="/management"
          element={role === "ADMIN" ? <ManagementView /> : <Navigate to="/school" replace />}
        />

        <Route path="*" element={<Navigate to="/school" replace />} />
      </Routes>
    </SidebarLayout>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <BootstrapAuth>
          <RoleRouter />
        </BootstrapAuth>
      </AuthProvider>
    </HashRouter>
  );
}
