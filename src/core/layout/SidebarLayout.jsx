export default function SidebarLayout({ sidebar, children }) {
  return (
    <div className="h-screen w-screen bg-background text-text-primary">
      <div className="flex h-full">
        {sidebar}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
