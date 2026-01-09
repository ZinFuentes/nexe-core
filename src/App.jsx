import { AuthProvider, useAuth } from "./core/auth/AuthContext";
import BootstrapAuth from "./core/auth/BootstrapAuth";

import { HashRouter } from "react-router-dom";

import SidebarLayout from "./core/layout/SidebarLayout";
import Sidebar from "./core/layout/Sidebar";
import SidebarHeader from "./core/layout/SidebarHeader";
import SidebarNav from "./core/layout/SidebarNav";
import SidebarFooter from "./core/layout/SidebarFooter";

import AdminView from "./views/ManagementView";
import TeacherView from "./views/SchoolView";
import MeView from "./views/MeView";

function RoleRouter() {
  const { status, user, message } = useAuth();

  if (status === "LOADING") return <div>Carregant…</div>;
  if (status === "BLOCKED") return <div>{message || "Accés denegat"}</div>;

  const role = user?.role || "DOCENT";
  const View = role === "ADMIN" ? AdminView : role === "DOCENT" ? TeacherView : MeView;

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
      <View />
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
