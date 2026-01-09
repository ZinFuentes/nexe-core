import SidebarLayout from "./SidebarLayout";
import Sidebar from "./Sidebar";
import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";
import SidebarFooter from "./SidebarFooter";


export default function AppShell({ children }) {
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
      {children}
    </SidebarLayout>
  );
}
