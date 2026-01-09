import { AuthProvider, useAuth } from "./core/auth/AuthContext";
import BootstrapAuth from "./core/auth/BootstrapAuth";

import AdminView from "./views/ManagementView";
import TeacherView from "./views/SchoolView";
import MeView from "./views/MeView";

function RoleRouter() {
  const { user } = useAuth();

  if (user.role === "ADMIN") return <AdminView />;
  if (user.role === "DOCENT") return <TeacherView />;
  return <MeView />;
}

export default function App() {
  return (
    <AuthProvider>
      <BootstrapAuth>
        <RoleRouter />
      </BootstrapAuth>
    </AuthProvider>
  );
}
