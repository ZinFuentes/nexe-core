export default function SidebarLayout({ sidebar, children }) {
  return (
    <div className="h-screen w-full overflow-x-hidden bg-background text-text-primary">
      <div className="flex h-full w-full overflow-x-hidden">
        {sidebar}
        <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
