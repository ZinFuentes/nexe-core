import SidebarLayout from "./core/layout/SidebarLayout";
import Sidebar from "./core/layout/Sidebar";
import SidebarHeader from "./core/layout/SidebarHeader";
import SidebarNav from "./core/layout/SidebarNav";
import SidebarFooter from "./core/layout/SidebarFooter";

export default function App() {
  return (
    <SidebarLayout
      sidebar={
        <Sidebar
          header={<SidebarHeader greeting="Bona tarda, Cinto!" centreName="Escola Jacint Verdaguer" />}
          center={<SidebarNav />}
          footer={<SidebarFooter userName="Cinto Fuentes" userRole="Coordinador" />}
        />
      }
    >
      <div className="p-12">
        <h1 className="text-2xl font-semibold text-text-primary">Main content</h1>
        <p className="mt-4 text-text-secondary">
          Aquí anirà el routing i les vistes dels mòduls.
        </p>
      </div>
    </SidebarLayout>
  );
}
