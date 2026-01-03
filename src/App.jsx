import SidebarLayout from "./core/layout/SidebarLayout";
import Sidebar from "./core/layout/Sidebar";

export default function App() {
  return (
    <SidebarLayout
      sidebar={
        <Sidebar
          header={<div className="flex h-full items-start py-6 font-medium">HEADER 20%</div>}
          center={<div className="flex h-full items-start py-6 font-medium">CENTRO 60%</div>}
          footer={<div className="flex h-full items-start py-6 font-medium">FOOTER 15%</div>}
        />
      }
    >
      <div className="p-12">
        <h1 className="text-2xl font-semibold">Main content</h1>
        <p className="mt-4 text-text-secondary">
          Aquí va el routing y las vistas de módulos.
        </p>
      </div>
    </SidebarLayout>
  );
}
